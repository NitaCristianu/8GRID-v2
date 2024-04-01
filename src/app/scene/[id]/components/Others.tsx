"use client"
import Link from "next/link";
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
    const [_, set_points] = useAtom(ePoints_data);
    const [__, set_points_calc] = useAtom(ePoints_Calc_data);
    const [___, set_segments] = useAtom(eSegments_data);
    const [____, set_labels] = useAtom(labels_data);

    set_points(props.points);
    set_points_calc(props.points_calc);
    set_segments(props.segments);
    set_labels(props.labels);

    return (<>
        <Link
            href={"/"}
            style={{
                position: 'fixed',
                fontSize: '1rem',
                zIndex: 10,
                top: 'calc(100% - 3rem)',
                left: '2rem',
                fontFamily: "Poppins",
                fontWeight: 700
            }}
        >{'< Go back'}</Link>
    </>);
}