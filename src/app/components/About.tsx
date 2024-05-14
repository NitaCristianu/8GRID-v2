"use client"
import { motion } from "framer-motion";
import useResize from "../editor/[id]/hooks/useResize";
import tri_img from "../components/assets/triangle.png";
import Image from "next/image";

export default function About() {
    const size = useResize();
    return <motion.div
        id={"about"}
        style={{
            width: size.x,
            height: size.y,
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
                marginTop: '2%',
                marginLeft: '1%',
                fontFamily :"Poppins"
            }}
        >{`The 8grid platform provides students with the opportunity to improve their maths skills`}</h1>
        <h1
         style={{
            fontSize: 17,
            color: "#a3c2c2",
            width: '40%',
            marginTop: '2%',
            marginLeft: '1%',
            fontFamily :"Poppins"
        }}
    >{"Teachers can quickly create interactive lessons, reaching a global audience"}</h1>
        <br />
        <br />
        <h1
        style={{
            fontFamily : "Poppins" ,
            width : '20%',
            marginLeft : '1%'
        }}
        >
            8Grid is the perfect tool
            to organize and share
            your interactive math sketches.
        </h1>
        <h1
        style={{
            fontFamily : "Poppins" ,
            width : '20%',
            marginLeft : '1%',
            color : "rgb(65, 114, 249)"
        }}
        >
            Simply create an account from
            sketches section and start
            experimenting 

        </h1>
        <Image
            src = {tri_img}
            alt = "triangle"
            style={{
                marginLeft : "40%",
                scale : 1
            }}
        />
    </motion.div >
}