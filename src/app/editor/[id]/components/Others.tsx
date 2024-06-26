"use client"
import { ePoint, ePoints_Calc, eSegment, Label, WorldParams, anchor } from '../data/props';
import { useAtom } from "jotai";
import { ePoints_Calc_data, ePoints_data, eSegments_data, GRAPHS, labels_data } from "../data/elements";
import { memo, useEffect } from 'react';
import { ANCHORS, AUTHOR, WORLD_ID, WORLD_NAME } from "../data/globals";

const Others = memo((props : any) => {
    const [_, set_points] = useAtom(ePoints_data);
    const [__, set_points_calc] = useAtom(ePoints_Calc_data);
    const [___, set_segments] = useAtom(eSegments_data);
    const [____, set_labels] = useAtom(labels_data);
    const [_____, set_name] = useAtom(WORLD_NAME);
    const [______, set_id] = useAtom(WORLD_ID);
    const [_______, set_author] = useAtom(AUTHOR);
    const [________, set_graph] = useAtom(GRAPHS);
    const [_________, set_anchors] = useAtom(ANCHORS);


    useEffect(() => {
        set_name(props.name);
        set_id(props.id);
        set_author(props.author);
        set_graph(props.graphs);
        set_points(props.points);
        set_points_calc(props.points_calc);
        set_segments(props.segments);
        set_labels(props.labels);
        set_anchors(props.anchors);
    }, []);

    return (<div></div>);
});
Others.displayName = 'editor-others'
export default Others;