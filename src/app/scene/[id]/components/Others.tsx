"use client"
import Link from "next/link";
import { ePoint, ePoints_Calc, eSegment, Label } from "../data/props";
import { useAtom } from "jotai";
import { ePoints_Calc_data, ePoints_data, eSegments_data, GRAPHS, labels_data } from "../data/elements";
import { WorldParams } from "@/app/editor/[id]/data/props";
import { useEffect } from "react";
import { ANCHORS } from "../data/globals";

export default function Others(props: WorldParams) {
    const [_, set_points] = useAtom(ePoints_data);
    const [__, set_points_calc] = useAtom(ePoints_Calc_data);
    const [___, set_segments] = useAtom(eSegments_data);
    const [____, set_labels] = useAtom(labels_data);
    const [_____, set_graphs] = useAtom(GRAPHS);
    const [______, set_anchor] = useAtom(ANCHORS);

    const graps_parsed = props.graphs.map(g => ({
        x: g.x,
        y: g.y,
        range_x: g.range_x,
        range_y: g.range_y,
        resolution: g.resolution,
        id: g.id,
        functions: JSON.parse(g.functions)
    }));

    useEffect(() => {
        set_graphs(graps_parsed);
        set_anchor(props.anchors);
        set_points(props.points);
        set_points_calc(props.points_calc);
        set_segments(props.segments);
        set_labels(props.labels);
    }, [])

    return (<>
        <h1
            style={{
                position: 'fixed',
                width: '100%',
                background: "rgba(0,0,0,0)",
                textAlign: 'center',
                fontSize: 25,
                top : 0,
                left : 0,
                zIndex : 10,
                fontWeight : 1000,
                fontFamily : "Poppins",

            }}
        >
            {props.name.toUpperCase()}
        </h1>
        <Link
            href={"/"}
            style={{
                position: 'fixed',
                fontSize: '1rem',
                zIndex: 15,
                top: 'calc(100% - 3rem)',
                left: '2rem',
                fontFamily: "Poppins",
                fontWeight: 700,

            }}
        >{'< Go back'}</Link>
    </>);
}