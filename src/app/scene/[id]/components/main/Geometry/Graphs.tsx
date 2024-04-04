"use client"
import dynamic from 'next/dynamic';
import { GRAPHS } from "@/app/scene/[id]/data/elements";
import { ACCENT, GRID_POSITION, HOVERING_GRAPHS, HOVERING_LABELS, MODE, SECONDARY, SELECTED_GRAPH, VARIABLES, vec2D } from "@/app/scene/[id]/data/globals";
import { IsPointInRect, parseRGB, ReplaceLetter, rgb, RGB2string, toGlobal, toLocal, transparent } from "@/app/scene/[id]/data/management";
import { Graph } from "@/app/scene/[id]/data/props";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from 'framer-motion';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface GraphProps {
    data: Graph,
}

const GraphComponent = React.memo((props: GraphProps) => {
    const [acc] = useAtom(ACCENT);
    const [hovering_graphs, setHoveringGraphs] = useAtom(HOVERING_GRAPHS);
    const [sec] = useAtom(SECONDARY);
    const [variables] = useAtom(VARIABLES);
    const range = Math.abs(props.data.range_x);
    const div = useRef<HTMLDivElement>(null);
    const [offset] = useAtom(GRID_POSITION);
    var step = range / props.data.resolution;
    const data: { x: number[], y: number[], name: string, marker: { color: string | rgb | undefined, width: number }, mode: string }[] = useMemo(() => {
        const d: { x: number[], y: number[], name: string, marker: { color: string | rgb | undefined, width: number }, mode: string }[] = [];
        props.data.functions.forEach(func => {
            var formula = func.expression;
            const x_data: number[] = [];

            for (let x = -range; x <= range; x += step) {
                x_data.push(x);
            }
            variables.forEach(v => {
                formula = ReplaceLetter(formula, v.name, v.value);
            })
            const y_data: number[] = x_data.map(d => {
                var formula2 = formula.replace(/\(/g, " ( ").replace(/\)/g, " ) ");
                formula2 = ReplaceLetter(formula2, 'x', d);
                try {
                    return eval(formula2)
                } catch (error) {
                    return 0;
                }
            });
            d.push({ x: x_data, y: y_data, name: func.expression, mode: "lines", marker: { color: func.color, width: 9 } });
        })
        return d
    }, [props.data.functions, range, step, variables])

    var lenght_x = range;
    var lenght_y = props.data.range_y;

    const width = 800;
    const height = 500;
    return (<motion.div
        ref={div}
        style={{
            position: "fixed",
            left: props.data.x + offset.x,
            top: props.data.y + offset.y,
            width: width - 30,
            height: height - 100,
            borderRadius: "0.8rem",
            margin: -100,
            background: transparent(sec, 0.3),
            border: `1px solid rgba(255,255,255,0.5)`,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
        }}
        onHoverEnd={() => {
            setHoveringGraphs(prev => {
                const clone = [...prev];
                clone.splice(clone.findIndex(g => g == props.data.id));
                return clone;
            });
        }}
        onHoverStart={() => {
            if (!hovering_graphs.includes(props.data.id)) {
                setHoveringGraphs(prev => [...prev, props.data.id]);
            }
        }}
    >
        <Plot
            style={{
                margin: -50,
            }}
            data={data}
            config={{ displaylogo: false, modeBarButtonsToRemove: ['toImage'] }}
            layout={{
                width: width,
                height: height,
                showlegend : true,

                xaxis: {
                    zeroline: true,
                    showline: true,
                    showgrid: false,
                    color: acc,
                    gridwidth: 3,
                    range: [-lenght_x, lenght_x],
                    fixedrange: true,
                    tickfont: { family: 'Poppins', color: 'white' },
                },
                yaxis: {
                    color: acc,
                    zeroline: true,
                    showline: true,
                    showgrid: false,
                    fixedrange: true,
                    range: [-lenght_y, lenght_y],
                    tickfont: { family: 'Poppins', color: 'white' },
                },
                legend: {
                    traceorder: 'normal',
                    font: { family: 'Poppins', size: 12, color: 'white' },
                },
                plot_bgcolor: 'rgba(0,0,0,0)',
                paper_bgcolor: 'rgba(0,0,0,0)',
                annotations: [
                ],
            }}
        />

    </motion.div>)
});

GraphComponent.displayName = "graph-component";

const GraphsComponent = React.memo(() => {

    const [Graphs, setGraphs] = useAtom(GRAPHS);
    return (<div style={{ zIndex: 2, position: "fixed", left: 0, top: 0 }}>
        {Graphs.map(data => <GraphComponent
            key={data.id}
            data={data}
        />)}
    </div>)
});

GraphsComponent.displayName = "graphs-component";

export default GraphsComponent;