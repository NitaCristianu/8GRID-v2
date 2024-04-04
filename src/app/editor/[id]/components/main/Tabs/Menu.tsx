"use client"
import { ACCENT, ANCHORS, AUTHOR, BACKGROUND, MODE, SECONDARY, SHOW_GRID, WORLD_ID, WORLD_NAME } from "@/app/editor/[id]/data/globals";
import Link from 'next/link';
import { useAtom } from "jotai";
import { motion } from 'framer-motion';
import style from "./styles.module.css";
import { WorldParams } from '../../../data/props';
import { ePoints_Calc_data, ePoints_data, eSegments_data, GRAPHS, labels_data } from "../../../data/elements";

export default function Menu() {
    const [current_mode, set_mode] = useAtom(MODE);
    const [accent, set_accent] = useAtom(ACCENT);
    const [world_name] = useAtom(WORLD_NAME);
    const [world_id] = useAtom(WORLD_ID);
    const [author] = useAtom(AUTHOR);
    const [points] = useAtom(ePoints_data);
    const [segments] = useAtom(eSegments_data);
    const [points_calc] = useAtom(ePoints_Calc_data);
    const [labels] = useAtom(labels_data);
    const [graphs] = useAtom(GRAPHS);
    const [anchors] = useAtom(ANCHORS);

    async function OnSave() {
        try{
            const data: WorldParams = {
                name : world_name,
                id : world_id,
                author : author,
                points : points,
                segments : segments,
                anchors : anchors,
                points_calc : points_calc,
                labels : labels,
                graphs :  graphs.map(g=>({
                    x : g.x,
                    y : g.y,
                    id : g.id,
                    functions : JSON.stringify(g.functions),
                    range_x : g.range_x,
                    range_y : g.range_y,
                    resolution : g.resolution
                }))
            }
            const response = await fetch('/api/management', {
                method :"POST",
                body : JSON.stringify(data),
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if (response.ok){
                // handle succses
            }else{
                // error
                console.log("E");
            }
        }catch(error){
            // network error
            console.log(error)
        }

    }

    return (<motion.div
        className={style.Menu}
        style={{
            left: current_mode == "menu" ? "calc(76% - 1rem)" : "100%",
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <h1
            className={style.Title1}
            style={{ color: accent }}
        >MENU</h1>
        <br />
        <br />
        <button onClick={OnSave} >Save</button>
        <br />
        <Link style={{
            textAlign: 'center',

        }} href={"/"} >Quit</Link>
    </motion.div >)
}