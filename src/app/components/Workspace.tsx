import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { frameData, motion, useForceUpdate } from "framer-motion";
import useResize from '../editor/[id]/hooks/useResize';
import ReactTextareaAutosize from 'react-textarea-autosize';
import Link from 'next/link';

export interface world {
    title: string,
    id: string,
    userId: string,
}

function Card(props: world) {
    return <motion.div
        key={props.id}
        style={{
            width: 205,
            height: 205,
            background: "linear-gradient(45deg, rgba(15, 15, 15, .1) 0%, rgba(30,30,30,.8) 100%)",
            border: "2px solid rgb(200, 200, 200)",
            borderRadius: "0.8rem",
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '1rem'
        }}
        whileTap={{
            scale: 1.05
        }}
        whileHover={{
            scale: .95
        }}
    >
        <h1
            style={{
                fontFamily: "Poppins",
                fontWeight: 800
            }}
        >{props.title}</h1>
        <div
            style={{
                display: 'flex',
                gap: '1rem'
            }}
        >
            <Link
                style={{
                    fontFamily: "Poppins",
                    color: "rgb(242, 42, 42)"
                }}
                href={`/scene/${props.id}`}
            >VIEW</Link>

        </div>
        
    </motion.div>
}

function FilterButton(props: { type: string, formData: FormDataObject, setFormData: React.Dispatch<React.SetStateAction<FormDataObject>> }) {
    return <div
        style={{
            display: 'flex',
            flexDirection: "column"
        }}
    >
        <p
            style={{
                fontFamily: "Poppins"
            }}
        >Search by {props.type}</p>
        <ReactTextareaAutosize
            style={{
                background: 'rgba(20,20,20,.7)',
                borderRadius: "0.8rem",
                outline: "1 solid rgb(200, 200, 200)",
                resize: 'none',
                padding: '1rem'
            }}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                props.setFormData(prev => {
                    const clone = { ...prev };
                    clone[props.type] = event.target.value || "";
                    return clone;
                })
            }}
            value={props.formData[props.type]}
        />

    </div>
}

export interface FormDataObject {
    username: string,
    id: string
}

export default function Workspace() {
    const size = useResize();
    const [worlds, setWorlds] = useState([]);
    const [formData, setFormData] = useState<FormDataObject>({
        username: "",
        id: ""
    });

    useEffect(() => {
        fetch('/api/create-world', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((d) => {
                setWorlds(d);
            })
            .catch((error) => console.log('error', error));
    }, [])

    async function Search() {
        fetch('/api/create-world', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((d) => {
                setWorlds(d.filter(world => {
                    if (formData.username != "" && formData.username != world.userId) {
                        return false;
                    }
                    if (formData.id != "" && formData.id != world.id) {
                        return false;
                    }
                    return true;
                }))
            })
            .catch((error) => console.log('error', error));
            

    }

    return <motion.div
        id={"explorer"}
        style={{
            width: '100%',
            height: '100%',
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
        >EXPLORER</motion.h1>
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
        >EXPLORER</motion.h1>
        <br />
        <br />
        <div
            style={{
                width: size.x / 2,
                aspectRatio: 1,
                scale: 6,
                background: "radial-gradient(circle, rgba(73,70, 249, 0.44) 0%, rgba(0,0,0,0) 50%)",
                position: 'absolute',
                zIndex: 0,
                left: '0%',
                top: '-20%',
                right: 0,
                marginTop: '10%'
            }}
        />
        <div
            style={{
                width: '80%',
                marginLeft: '10%',
                height: '80%',
                zIndex: 50,
                display: "flex",
                gap: '5%'
            }}
        >
            <div
                style={{
                    border: '1px solid rgb(194, 194, 194)',
                    background: "rgb(20, 20, 20, 0.4)",
                    height: '90%',
                    width: '80%',
                    borderRadius: '0.8rem',
                    zIndex: 50,
                    display : 'flex',
                    flexDirection : 'row',
                    overflowY : "scroll",
                    flexWrap : 'wrap',
                    padding : "2rem",
                    gap : '2rem'
                }}
            >
                {worlds.map(world => (
                    <Card
                        key = {world.id}
                        {...world}
                    />
                ))}
            </div>

            <div
                style={{
                    background: "rgba(20, 20, 20, .5)",
                    height: '100%',
                    zIndex: 50,
                    width: '30%',
                    borderRadius: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '6%',
                    border: '1px solid rgb(194, 194, 194)',
                    gap: '1.5rem',
                    marginLeft : '5%',
                    padding : '1.5%',
                    alignItems : 'center',
                }}
            >

                <motion.button
                    style={{
                        borderRadius: '0.2rem', zIndex: 50,
                        background: "rgb(80, 142, 250)",
                        width: '90%',

                    }}
                    whileHover={{
                        scale: 1.02
                    }}
                    whileTap={{
                        scale: 0.96
                    }}
                    onTap={Search}
                >Search</motion.button>
                <div>
                    <div>
                        <FilterButton
                            type="username"
                            setFormData={setFormData}
                            formData={formData}
                        />
                        <FilterButton
                            type="id"
                            setFormData={setFormData}
                            formData={formData}
                        />

                    </div>
                </div>
            </div>
        </div>

    </motion.div>

}