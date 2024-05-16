"use client"
import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { gapSize } from 'three/examples/jsm/nodes/Nodes.js';
import useResize from '../editor/[id]/hooks/useResize';
import Graph from "./assets/graph.gif";
import ChangeProperty from "./assets/Properties.gif";
import GalleryTutorial from "./assets/Gallery.gif";
import Latex from "./assets/latex.gif";
import FormatText from "./assets/formatText.gif";
import Slider from "./assets/sliders.gif"
import Image, { StaticImageData } from 'next/image';

export interface tutorial {
    title: string,
    info: string,
    gif: StaticImageData
}

function Card(props: tutorial) {
    return <div
        style={{
            fontSize: 24,
            width: '20%',
            height: '100%',
            padding: '1rem',
            aspectRatio: 1,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderRadius: ".6rem",
            userSelect: 'none',
            textAlign: 'center',
            border: '2px solid rgb(107, 107, 107)',
            fontFamily: "Poppins",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',

        }}
    >
        <h1 style={{
            fontWeight: 800
        }} >{props.title}</h1>
        <Image
            style={{
                borderRadius: '0.8rem',
                border: "1px solid rgb(210, 210, 210)",
                width: 300
            }}
            src={props.gif}
            alt={props.title}
            width={300}
            height={300}
        />
        <p
            style={{
                fontWeight: 300,
                fontSize: '1rem',
                padding: '1rem'
            }}
        >{props.info}</p>
    </div>
}

export default function Worlds() {
    const info: tutorial[] = [
        {
            title: "Add new elements",
            info: `
            Enter build mode and select any
            element, click anywhere to
            place it`,
            gif: GalleryTutorial
        },
        {
            title: "Change properties",
            info: `
            Enter select mode and click on
            any element in order to
            customzie it`,
            gif: ChangeProperty
        },
        {
            title: "Formating text",
            info: `
            Double click on a text element
            to edit it and use the
            proper markdowns`,
            gif: FormatText
        },
        {
            title: "Defining variables",
            info: `
            Use the <s> markdown in a text
            element to insert a new slider
            and adjust its from, to, at and var
            properties`,
            gif: Slider
        },
        {
            title: "Using Latex",
            info: `
            Use the <f> markdown in a text
            element to insert latex`,
            gif: Latex
        },
        {
            title: "Render functions",
            info: `
            Select a graph and start
            rendering new functions`,
            gif: Graph
        },
    ];
    const size = useResize();

    return <motion.div
        id={"tutorials"}
        style={{
            width: size.x,
            height: size.y,
            background: "#070707",
        }}
    >
        {/* <div
            style={{
                width: size.x / 2,
                aspectRatio: 1,
                scale: 6,
                background: "radial-gradient(circle, rgba(73, 70, 249, 0.44) 0%, rgba(0,0,0,0) 50%)",
                position: 'absolute',
                zIndex: 0,
                left: '100%',
                right: 0,
            }}
        /> */}
        <motion.h1
            style={{
                color: "rgb(42, 141, 240)",
                textShadow: 'rgb(42, 141, 240) 0px 0px 50px',
                margin: '1rem',
                fontSize: '3rem',
                fontFamily: "Poppins",
                fontWeight: 1000,
                textAlign:"center",
                overflowX: 'clip',
                marginLeft: 25,
                marginTop: -92,
                userSelect: 'none',
                opacity: 0.9,
                size: "10px",
                zIndex: 10
            }}
        >TUTORIALS</motion.h1>
        <motion.div

            style={{
                borderRadius: ".8rem",
                border: "white",
                outline: "2px white",
                width: '100%',
                marginLeft: '5%',
                marginTop: 40,
                height: '65%',
                display: 'flex',
                gap: '2rem',
                zIndex: 10,
                alignContent: "center"
            }}

        >
            <motion.div
                drag
                dragConstraints={{
                    left: 0,
                    right: 800,
                    bottom: 0,
                    top: 0
                }}
                style={{
                    width: "90%",
                    display: 'flex',
                    marginLeft : -800,
                    gap: '1rem',
                    background: "rgba(0,0,0,0)",
                    zIndex: 10
                }}
            >
                {...info.map(tutorial_info => <Card key={tutorial_info.title} {...tutorial_info} />)}

            </motion.div>
        </motion.div>
    </motion.div>
}