"use client"
import { motion } from "framer-motion";
import useResize from "../editor/[id]/hooks/useResize";

export default function About() {
    const size = useResize();
    return <motion.div
        id={"about"}
        style={{
            width: size.x,
            height: size.y,
            background: "black",
        }}
    >
        <br />
        <br />
        <br />
        <br />
        <br />
        <motion.h1
            style={{
                color: "#DFDFD1",
                margin: '1rem',
                fontSize: '3rem',
                fontFamily: "Poppins",
                fontWeight: 1000,
                zIndex: 10
            }}
        >{"ABOUT"}</motion.h1>

        <motion.h1
            style={{
                color: "#DFDFD1",
                margin: '1rem',
                fontSize: '3rem',
                fontFamily: "Poppins",
                fontWeight: 1000,
                overflowX: 'clip',
                marginLeft: 25,
                marginTop: -92,
                userSelect: 'none',
                opacity: 0.3,
                zIndex: 30
            }}
        >{"ABOUT"}</motion.h1>
        <h1
            style={{
                fontSize: 17,
                color: "#a3c2c2",
                width: '40%',
                marginTop: '9%',
                marginLeft: '55%'
            }}
        >"Here, intricate concepts unfold effortlessly,
            empowering young minds to navigate the complexities
            of mathematics with grace and proficiency."<br />~oprea si nita</h1>
        
    </motion.div >
}