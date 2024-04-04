import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import useResize from '../editor/[id]/hooks/useResize';


function WorldCard(world) {
    return <p>{world.name}</p>
}

export default function Workspace() {

    const size = useResize();

    const data = [
        {
            name: "world 1",
            id: "s2134-fasd",
            public: false,
            admin: "matei"
        },
        {
            name: "world 2",
            id: "a0104-of0d",
            public: true,
            admin: "oprea"
        },
        {
            name: "world 3",
            id: "2345a-fbh-tw",
            public: false,
            admin: "NITZA"
        },
    ]
    const data2 = [
        {
            name: "world 4",
            id: "s2134-fasd",
            public: false,
            admin: "matei"
        },
        {
            name: "world 5",
            id: "a0104-of0d",
            public: true,
            admin: "oprea"
        },
        {
            name: "world 6",
            id: "2345a-fbh-tw",
            public: false,
            admin: "NITZA"
        },


    ]

    return <motion.div
        id={"workspace"}
        style={{
            width: size.x,
            height: size.y,
            background: "black",
        }}
    >
        <br />
        <motion.h1
            style={{
                color: "#DFDFD1",
                margin: '1rem',
                fontSize: '3rem',
                fontFamily: "Poppins",
                fontWeight: 1000
            }}
        >WORKSPACE</motion.h1>
        <motion.h1
            style={{
                color: "#DFDFD1",
                margin: '1rem',
                fontSize: '3rem',
                fontFamily: "Poppins",
                fontWeight: 1000,
                marginLeft: 25,
                marginTop: -92,
                userSelect: 'none',
                opacity: 0.3,
                size: "10px"
            }}
        >WORKSPACE</motion.h1>
        <br />
        <br />
        [3:14 PM]
        <div style={{ display: 'flex', width: '100%' }}>
            <motion.div //chenar principal

                style={{
                    background: "black",
                    borderRadius: ".8rem",
                    border: 'darkgrey',
                    width: '70%',
                    marginTop: -65,
                    overflowY: "scroll",
                    height: 400,
                    gap: '2rem',
                    padding: '0.5rem',

                }}>
                <h3
                    style={{
                        color: '#a3c2c2',
                        fontWeight: 800,
                    }}
                >functions</h3>
                <div style={{ display: "flex", gap: '1rem' }} >
                    {...data.map(world =>
                        <div // chenare mici
                            style={{
                                fontSize: 24,
                                width: '20%',
                                height: '30%',
                                aspectRatio: 1,
                                background: "#121212",
                                borderRadius: ".6rem",
                                border: "2px solid black",
                                userSelect: 'none',
                                textAlign: 'center',
                                fontWeight: 800,
                                color: 'darkgrey',
                                //aici nu pot modifica in interior adica sa schimb pozitia textului

                            }}
                        >{world.name}</div>
                    )}
                    [3:14 PM]
                </div>
                <h3
                    style={{
                        color: '#a3c2c2',
                        fontWeight: 800,
                    }}>geometry</h3>
                <div style={{ display: "flex", gap: '1rem' }} >
                    {...data2.map(world =>
                        <div // chenare mici 2
                            style={{
                                fontSize: 24,
                                width: '20%',
                                height: '30%',
                                aspectRatio: 1,
                                background: "#121212",
                                borderRadius: ".6rem",
                                userSelect: 'none',
                                color: 'darkgrey',
                                fontWeight: 800,
                                textAlign: 'center',
                            }}
                        >{world.name}</div>
                    )}
                </div>
            </motion.div>
            [3:15 PM]
            <div style={{
                width: '30%',
                padding: '2%',
                justifyContent: "center",
                display: "flex",
                flexDirection: "column"
            }} >
                <motion.textarea
                    style={{
                        color: 'darkgrey',
                        outline: 'none',
                        border: 'white',
                        background: '#161612',
                        height: '10%',
                        width: '100%',
                        resize: 'none',
                        borderRadius: "7px",

                    }}
                    placeholder='enter by id'
                />
                <br />
                <motion.div
                    style={{
                        background: '#161612',
                        borderRadius: "9px",
                        padding: '7px',
                    }}>
                    <p style={{
                        color: '#a3c2c2',
                        fontWeight: 800,
                    }}>SEARCH BY </p>
                    <div
                        style={{
                            flexDirection: 'column',
                        }}>
                        [3:15 PM]
                        <motion.textarea
                            style={{
                                flexDirection: 'column',
                                resize: 'none',
                                borderRadius: '8px',
                                background: '#121212',
                            }}
                            placeholder='alphabet'></motion.textarea>

                        <motion.textarea style={{
                            flexDirection: 'column',
                            resize: 'none',
                            borderRadius: '8px',
                            background: '#121212',
                        }}
                            placeholder='date'></motion.textarea>
                        <motion.textarea style={{
                            flexDirection: 'column',
                            resize: 'none',
                            borderRadius: '8px',
                            background: '#121212',
                        }}
                            placeholder='public'></motion.textarea>
                    </div>
                </motion.div>
            </div>

        </div>

    </motion.div>

}