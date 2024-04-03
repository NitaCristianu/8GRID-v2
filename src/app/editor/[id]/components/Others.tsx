"use client"
<<<<<<< HEAD
import { ePoint, ePoints_Calc, eSegment, Label, WorldParams } from "../data/props";
import { useAtom } from "jotai";
import { ePoints_Calc_data, ePoints_data, eSegments_data, labels_data } from "../data/elements";
import { memo, useEffect } from 'react';
import { AUTHOR, WORLD_ID, WORLD_NAME } from "../data/globals";

export default memo((props: WorldParams) => {
=======
import { ePoint, ePoints_Calc, eSegment, Label } from "../data/props";
import { useAtom } from "jotai";
import { ePoints_Calc_data, ePoints_data, eSegments_data, labels_data } from "../data/elements";

export interface WorldParams {
    points: ePoint[],
    points_calc: ePoints_Calc[],
    segments: eSegment[],
    labels : Label[]
}

export default function Others(props: WorldParams) {
>>>>>>> 883896071189006c88e6e519149ee9316aa5bb29
    const [_, set_points] = useAtom(ePoints_data);
    const [__, set_points_calc] = useAtom(ePoints_Calc_data);
    const [___, set_segments] = useAtom(eSegments_data);
    const [____, set_labels] = useAtom(labels_data);
<<<<<<< HEAD
    const [_____, set_name] = useAtom(WORLD_NAME);
    const [______, set_id] = useAtom(WORLD_ID);
    const [_______, set_author] = useAtom(AUTHOR);

    useEffect(() => {
        set_name(props.name);
        set_id(props.id);
        set_author(props.author);
        set_points(props.points);
        set_points_calc(props.points_calc);
        set_segments(props.segments);
        set_labels(props.labels);
    }, []);

    return (<div></div>);
});
=======

    set_points(props.points);
    set_points_calc(props.points_calc);
    set_segments(props.segments);
    set_labels(props.labels);

    return (<></>);
}
>>>>>>> 883896071189006c88e6e519149ee9316aa5bb29
