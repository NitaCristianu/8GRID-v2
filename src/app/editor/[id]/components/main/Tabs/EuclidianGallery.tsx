"use client"
import { motion } from "framer-motion";
import style from "./styles.module.css";
import { useAtom } from "jotai";
import { ACCENT, ANCHORS, GRID_POSITION, MODE, POINT_RADIUS, SELECTED, VARIABLES, blocks, mode } from "@/app/editor/[id]/data/globals";
import { useEffect, useRef, useState } from "react";
import useResize from "@/app/editor/[id]/hooks/useResize";
import { AddPoint, Distance_Squared, DoesSegmentExist, GetAnyHoveringPoint, GetHoveringPoint, ObtainPosition, getCoords, getUniqueTag, toGlobal, toLocal, transparent } from "@/app/editor/[id]/data/management";
import { ePoints_Calc_data, ePoints_data, eSegments_data, GRAPHS, labels_data } from "@/app/editor/[id]/data/elements";
import { v4 } from "uuid";
import { segment_render_mode, tips } from "@/app/editor/[id]/data/props";
import { BACKGROUND } from '../../../data/globals';

export default function EuclidianGallery() {
    const [placing, setPlacing] = useState(null);
    const [current_mode, set_mode] = useAtom<mode>(MODE);

    const essentials: blocks[] = ["ePoint", "eSegment", "label", "graph", "anchor"];
    const construct: blocks[] = ["eCenter", "ePerpendicular"];

    const [accent, __] = useAtom(ACCENT);
    const [bgr, ___] = useAtom(BACKGROUND);

    const canvas_ref = useRef<HTMLCanvasElement>(null);
    const gallery_ref = useRef<HTMLDivElement>(null);
    const size = useResize();
    const [mpos, set_mpos] = useState({ 'x': 0, 'y': 0 });
    const [offset, _] = useAtom(GRID_POSITION);

    const [points_data, set_points_data] = useAtom(ePoints_data);
    const [points_calc_data, set_points_calc_data] = useAtom(ePoints_Calc_data);
    const [segments_data, set_segmments_data] = useAtom(eSegments_data);
    const [labels, set_labels] = useAtom(labels_data);
    const [graph, set_graph] = useAtom(GRAPHS);
    const [inuse, set_inuse] = useState<string[]>([]);
    const [anchors, set_anchors] = useAtom(ANCHORS);
    const [variables, set_variables] = useAtom(VARIABLES);

    useEffect(() => {
        const canvas = canvas_ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = size.x;
        canvas.height = size.y;

        ctx.fillStyle = accent;
        ctx.strokeStyle = accent;
        ctx.shadowBlur = 10;
        ctx.shadowColor = accent;
        ctx.lineWidth = 5;

        const offseted_mpos = toGlobal(mpos, offset);
        const { isHovering, Hovering_id, isCalculated } = GetAnyHoveringPoint(offseted_mpos, points_data, points_calc_data, variables);

        if (current_mode != "euclidian") return;
        ctx.beginPath();


        if (placing == "label") {
            ctx.fillStyle = transparent(accent, 0.4);
            ctx.rect(mpos.x, mpos.y, 30 * 16, 4 * 16);
            ctx.fill();
            ctx.closePath();
        }

        var coords;
        if ((placing == "eCenter" || placing == "ePerpendicular" || placing == "eSegment") && inuse.length > 0) {
            var index = points_data.findIndex(p => p.id == inuse.at(inuse.length - 1));
            if (index == -1) {
                index = points_calc_data.findIndex(p => p.id == inuse.at(inuse.length - 1));
                if (index > -1)
                    coords = ObtainPosition(points_calc_data[index].formula, points_data, points_calc_data, variables);
            } else {
                coords = getCoords(points_data[index]);
            }
            ctx.beginPath();
            coords = toLocal(coords, offset);
            ctx.moveTo(coords.x, coords.y);
            var lineto = { x: 0, y: 0 };
            if (isHovering) {
                let index = (points_data.findIndex(p => p.id == Hovering_id))
                var x, y;
                if (isCalculated) {
                    index = points_calc_data.findIndex(p => p.id == Hovering_id);
                    const pos = ObtainPosition(points_calc_data[index].formula, points_data, points_calc_data, variables);
                    x = pos.x;
                    y = pos.y;
                } else {
                    const pos = getCoords(points_data[index]);
                    x = pos.x;
                    y = pos.y;
                }
                const transformed = toLocal({ x: x, y: y }, offset);
                lineto = transformed;
            } else
                lineto = mpos;


            ctx.lineTo(lineto.x, lineto.y);

        }
        ctx.stroke();
        ctx.closePath();
        if (placing == "eCenter" && coords && isHovering) {
            ctx.beginPath();
            ctx.strokeStyle = "rgb(38, 76, 246)";
            ctx.arc((coords.x + lineto.x) / 2, (coords.y + lineto.y) / 2, POINT_RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = "rgb(254, 254, 255)";
            ctx.arc((coords.x + lineto.x) / 2, (coords.y + lineto.y) / 2, POINT_RADIUS * .75, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        if (!isHovering && (placing == "ePoint" || placing == "eSegment")) {
            ctx.beginPath();
            ctx.arc(mpos.x, mpos.y, POINT_RADIUS * 0.75, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(mpos.x, mpos.y, POINT_RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
    }, [inuse, size, mpos, placing, offset, points_data, accent, current_mode, points_calc_data, variables])

    useEffect(() => {
        const mouseDown = (event: MouseEvent) => {
            if (current_mode != "euclidian") return;
            const rect = gallery_ref.current != null ? gallery_ref.current.getBoundingClientRect() : null;
            if (rect && rect.left < event.clientX &&
                rect.right > event.clientX &&
                rect.top < event.clientY &&
                rect.bottom > event.clientY) return;
            const offseted_mpos = toGlobal(mpos, offset);
            const { isHovering, Hovering_id, isCalculated } = GetAnyHoveringPoint(offseted_mpos, points_data, points_calc_data, variables);
            if (
                (current_mode == "euclidian" && event.clientX > size.x * 0.69) ||
                (event.clientX < 16 * 8)
            ) return;
            if (placing == "ePoint" && event.button == 0) {
                if (!isHovering) {
                    set_points_data(prev => [...prev, {
                        x: offseted_mpos.x,
                        y: offseted_mpos.y,
                        id: v4(),
                        color: accent,
                        tag: getUniqueTag(points_data, points_calc_data)
                    }]);
                }
            } else if (placing == "eSegment") {
                if (inuse.length > 0 && event.button == 0) {
                    if (isHovering) {
                        const type: segment_render_mode = "only-segment";
                        const segment = {
                            from: inuse.at(inuse.length - 1) || "",
                            to: Hovering_id,
                            id: v4(),
                            color: "white",
                            renderMode: type
                        }
                        if (!DoesSegmentExist(segment, segments_data)) {
                            set_segmments_data(prev => [...prev, segment])
                            set_inuse(prev => [...prev, Hovering_id]);
                        }

                    } else if (event.button == 0) {
                        const new_point_id = v4();
                        // no need to verify wheter the semgent exists because a new unique point is created
                        set_points_data(prev => [...prev, {
                            x: offseted_mpos.x,
                            y: offseted_mpos.y,
                            id: new_point_id,
                            color: "white",
                            tag: getUniqueTag(points_data, points_calc_data)
                        }])
                        set_segmments_data(prev => [...prev, {
                            from: inuse.at(inuse.length - 1) || "",
                            to: new_point_id,
                            id: v4(),
                            color: "white",
                            renderMode: "only-segment"
                        }])
                        set_inuse(prev => [...prev, new_point_id]);
                    }
                }
            } else if (placing == "eCenter" && event.button == 0) {
                if (inuse.length > 0 && event.button == 0 && Hovering_id) {
                    const id = v4();
                    var formula: string;
                    const p_from_index = points_data.findIndex(p => p.id == Hovering_id);
                    const c_from_index = points_calc_data.findIndex(p => p.id == Hovering_id);
                    const p_to_index = points_data.findIndex(p => p.id == inuse.at(inuse.length - 1));
                    const c_to_index = points_calc_data.findIndex(p => p.id == inuse.at(inuse.length - 1));
                    var fromTag, toTag;
                    fromTag = p_from_index > -1 ? points_data[p_from_index].tag : points_calc_data[c_from_index].tag;
                    toTag = p_to_index > -1 ? points_data[p_to_index].tag : points_calc_data[c_to_index].tag;
                    formula = `(${fromTag} + ${toTag})/2`;
                    if (Hovering_id != inuse.at(inuse.length - 1)) {
                        set_points_calc_data(prev => [...prev, {
                            formula: formula,
                            id: id,
                            tag: getUniqueTag(points_data, points_calc_data),
                            color: "white"
                        }])
                        set_inuse(prev => [...prev, id]);
                    }
                }
            } else if (placing == "ePerpendicular" && event.button == 0) {
                if (inuse.length > 0 && event.button == 0 && Hovering_id) {
                    const id = v4();
                    var formula: string;
                    const p_from_index = points_data.findIndex(p => p.id == Hovering_id);
                    const c_from_index = points_calc_data.findIndex(p => p.id == Hovering_id);
                    const p_to_index = points_data.findIndex(p => p.id == inuse.at(inuse.length - 1));
                    const c_to_index = points_calc_data.findIndex(p => p.id == inuse.at(inuse.length - 1));
                    var fromTag, toTag;
                    fromTag = p_from_index > -1 ? points_data[p_from_index].tag : points_calc_data[c_from_index].tag;
                    toTag = p_to_index > -1 ? points_data[p_to_index].tag : points_calc_data[c_to_index].tag;
                    const angle = Math.PI / 2;
                    formula = `
                    x: ${fromTag}.x + (${toTag}.x + (${fromTag}.x*-1)) * Math.cos(${angle}) - (${toTag}.y + (${fromTag}.y) * -1) * Math.sin(${angle})
                    y: ${fromTag}.y + (${toTag}.x + (${fromTag}.x*-1)) * Math.sin(${angle}) + (${toTag}.y + (${fromTag}.y) * -1) * Math.cos(${angle})`
                        ;
                    if (Hovering_id != inuse.at(inuse.length - 1)) {
                        set_points_calc_data(prev => [...prev, {
                            formula: formula,
                            id: id,
                            tag: getUniqueTag(points_data, points_calc_data),
                            visible: false,
                            color: "white"
                        }])
                        set_inuse(prev => [...prev, id]);
                        set_segmments_data(prev => [...prev, {
                            from: Hovering_id,
                            to: id,
                            id: v4(),
                            color: "white",
                            renderMode: "only-line",

                        }])
                    }
                }
            } else if (placing == "label" && event.button == 0) {
                var closest = 999999999;
                labels.forEach(label => {
                    const pos = toLocal({ x: label.left, y: label.top }, offset);
                    closest = Math.min(closest, Distance_Squared({ x: event.clientX, y: event.clientY }, { x: label.left, y: label.top }));
                })
                console.log(closest)
                if (closest > 100000) {
                    set_labels(prev => [...prev, {
                        left: offseted_mpos.x,
                        top: offseted_mpos.y,
                        content: "Double click to edit",
                        id: v4()
                    }])
                }
            } else if (placing == "graph" && event.button == 0) {
                set_graph(prev => [...prev, {
                    x: offseted_mpos.x,
                    y: offseted_mpos.y,
                    range_x: 1,
                    range_y: 1,
                    resolution: 30,
                    id: v4(),
                    functions: []
                }])
            } else if (placing == "anchor" && event.button == 0) {
                set_anchors(prev => [...prev, {
                    tag: "anchor",
                    order: 1,
                    id : v4(),
                    x : offseted_mpos.x,
                    y : offseted_mpos.y
                }])
            }
            if (isHovering && inuse.findIndex(id => id == Hovering_id) == -1 && event.button == 0) set_inuse(prev => [...prev, Hovering_id]);
            if (event.button == 2) set_inuse([]);

        }
        const mousemove = (event: MouseEvent) => {
            set_mpos({ 'x': event.clientX, 'y': event.clientY });
        }
        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mousemove", mousemove);
        return () => {
            window.removeEventListener("mousedown", mouseDown);
            window.removeEventListener("mousemove", mousemove);
        }
    }, [labels, set_graph, set_labels, points_data, inuse, mpos, size, accent, current_mode, offset, placing, points_calc_data, segments_data, set_points_calc_data, set_points_data, set_segmments_data, variables]);
    return (
        <>
            <canvas
                ref={canvas_ref}
                style={{
                    width: '100%',
                    height: '100%',
                    position: "fixed"
                }}
            />
            <motion.p style={{
                position: 'fixed',
                width: '100%',
                fontFamily: "Poppins",
                textAlign: 'center',
                top: "100%",
                zIndex: 10
            }}
                animate={{
                    top: current_mode == "euclidian" ? "95%" : "100%",
                }}
            >{placing != null ? tips[placing] : "Select any element from the gallery"}
            </motion.p>
            <motion.div
                className={style.EuclidianGallery}
                ref={gallery_ref}
                style={{
                    left: current_mode == "euclidian" ? "calc(70% - 1rem)" : "100%",
                    border: `2px solid ${accent}`,
                    overflowY: "scroll",

                }}

            >
                <h1 className={style.Title1} style={{ color: accent }} >ESSENTIALS</h1>
                <br />
                <br />
                <motion.div
                    style={{
                        width: "100%",
                        flexDirection: 'row',
                        display: 'flex',
                        alignContent: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "2rem",
                    }}
                >

                    {...essentials.map(type =>
                        <motion.div
                            className={style.Card}
                            key={type}
                            style={{
                                boxShadow: placing == type ? `0 0 10px 2px ${accent}` : "",
                            }}
                            whileHover={{
                                scale: 1.1
                            }}
                            whileTap={{
                                scale: 0.9
                            }}
                            onTap={() => {
                                setPlacing(type);
                            }}
                        >
                            <div style={{ scale: 0.5 }}>
                                {type == "ePoint" ?
                                    <div>
                                        <h1 style={{
                                            position: "fixed",
                                            color: bgr,
                                            fontSize: `calc(3.2rem)`,
                                            lineHeight: '147%',
                                            fontFamily: "Poppins",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            width: "100%",
                                            height: "100%",
                                            userSelect: "none"
                                        }} >A</h1>
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 -2 3 3">
                                            <path d="M 0 -2 A 1 1 0 0 0 0 1 A 1 1 0 0 0 0 -2 M 0 -2" />
                                        </svg>
                                    </div> : null}
                                {type == "eSegment" ? <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="Flat">
                                    <path d="M214.62793,86.62695a32.0716,32.0716,0,0,1-38.88245,4.94141L91.56836,175.74561a32.00172,32.00172,0,1,1-50.19629-6.37256l.00049-.001a32.05731,32.05731,0,0,1,38.88208-4.94043l84.177-84.17725a32.00172,32.00172,0,1,1,50.19629,6.37256Z" />
                                </svg> : null}
                                {type == "label" ? <svg style={{ top: 60, position: "fixed" }} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="-24 -15 48 30">
                                    <path d="M -24 -12 L -24 12 A 3 3 90 0 0 -21 15 L 21 15 A 3 3 90 0 0 24 12 L 24 -12 A 3 3 90 0 0 21 -15 L -21 -15 A 3 3 90 0 0 -24 -12 L 11 -12 Q 12 -12 12 -11 L 12 -9 Q 12 -8 11 -8 L -20 -8 Q -21 -8 -21 -9 L -21 -11 Q -21 -12 -20 -12 Z L -20 -12 M -21 -5 Q -21 -6 -20 -6 L 6 -6 Q 7 -6 7 -5 Q 7 -4 6 -4 L -20 -4 Q -21 -4 -21 -5 M -20 -3 L 6 -3 Q 7 -3 7 -2 Q 7 -1 6 -1 L -20 -1 Q -21 -1 -21 -2 Q -21 -3 -20 -3 M -21 1 Q -21 0 -20 0 L -4 0 Q -3 0 -3 1 L -3 11 Q -3 12 -4 12 L -20 12 Q -21 12 -21 11 L -21 1" />
                                </svg> : null}

                            </div>
                        </motion.div>)}

                </motion.div>
                <h1 className={style.Title1} style={{ color: accent }} >CONSTRUCT</h1>
                <br />
                <br />
                <motion.div
                    style={{
                        width: "100%",
                        flexDirection: 'row',
                        display: 'flex',
                        alignContent: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "2rem"
                    }}
                >

                    {...construct.map(type =>
                        <motion.div
                            className={style.Card}
                            key={type}
                            style={{
                                boxShadow: placing == type ? `0 0 10px 2px ${accent}` : "",
                            }}
                            whileHover={{
                                scale: 1.1
                            }}
                            whileTap={{
                                scale: 0.9
                            }}
                            onTap={() => {
                                setPlacing(type);
                            }}
                        >
                            <div style={{ scale: 0.5 }}>
                                {type == "eCenter" ? <svg fill="white" style={{ scale: 1.2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                    <g id="turf-midpoint">
                                        <circle cx="49.331" cy="50.493" r="6.845" />
                                        <path scale={1.9} d="M85.331,23.338c-4.877,0-8.845-3.968-8.845-8.845c0-4.877,3.968-8.845,8.845-8.845s8.845,3.968,8.845,8.845   C94.176,19.37,90.208,23.338,85.331,23.338z M85.331,9.648c-2.672,0-4.845,2.173-4.845,4.845c0,2.671,2.173,4.845,4.845,4.845   s4.845-2.173,4.845-4.845C90.176,11.821,88.003,9.648,85.331,9.648z" />
                                        <path d="M14.331,94.338c-4.877,0-8.845-3.968-8.845-8.845s3.968-8.845,8.845-8.845c4.877,0,8.845,3.968,8.845,8.845   S19.208,94.338,14.331,94.338z M14.331,80.648c-2.672,0-4.845,2.173-4.845,4.845s2.173,4.845,4.845,4.845   c2.671,0,4.845-2.173,4.845-4.845S17.002,80.648,14.331,80.648z" />
                                    </g>
                                    <g id="Layer_1">
                                    </g>
                                </svg> : null}
                                {type == "ePerpendicular" ? <svg fill="white" style={{ scale: 1.2 }} xmlns="http://www.w3.org/2000/svg" viewBox="1.05451 1.77808 45.02 32.87">
                                    <path d="M 9.9079 21.5135 A 1 1 75 0 0 1.1453 19.7204 A 1 1 75 0 0 9.9079 21.5135 M 9 20 L 8 23 L 30 27 M 8 23 L 29 30 L 30 27 M 9.9079 21.5135 A 1 1 75 0 0 1.1453 19.7204 A 1 1 75 0 0 9.9079 21.5135 M 37.1619 26.6342 A 1 1 75 0 0 29.5039 32.8272 A 1 1 75 0 0 37.1619 26.6342 M 36 27 L 42 10 L 39 9 L 33 26 M 37.074 6.9875 A 1 1 75 0 0 46.0261 5.624 A 1 1 75 0 0 37.074 6.9875" fill="" />
                                </svg> : null}

                            </div>
                        </motion.div>)}
                </motion.div>

            </motion.div>
        </>)
}