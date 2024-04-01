"use client"
import { ACCENT, BACKGROUND, MODE, SECONDARY, SHOW_GRID } from "@/app/editor/[id]/data/globals";
import Link from 'next/link';
import { useAtom } from "jotai";
import { motion } from 'framer-motion';
import style from "./styles.module.css";

export default function Menu() {
    const [current_mode, set_mode] = useAtom(MODE);
    const [accent, set_accent] = useAtom(ACCENT);
    const [secondary, set_secondary] = useAtom(SECONDARY);
    const [bgr, set_bgr] = useAtom(BACKGROUND);
    const [grid, set_grid] = useAtom(SHOW_GRID);

    return (<motion.div
        className={style.Menu}
        style={{
            left: current_mode == "menu" ? "calc(76% - 1rem)" : "100%",
            display:'flex',
            flexDirection : 'column',
        }}
    >
        <h1
            className={style.Title1}
            style={{ color: accent }}
        >MENU</h1>
        <br />
        <br />
        <motion.button>Save</motion.button>
        <br />
        <Link style={{
            textAlign : 'center',
            
        }} href={"/"} >Quit</Link>
    </motion.div >)
}