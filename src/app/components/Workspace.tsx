import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from './styles.module.css';
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
            border: '1px solid rgba(194, 194, 194, 0.5)',
            background: "linear-gradient(120deg, rgba(98, 120, 248, 0.05), rgba(20, 20, 20, 0.2)",
            backdropFilter: "blur(4px)",
            height: 205,
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
            <div style={{
                display: 'flex',
                gap: 5
            }}>
                <Link
                    style={{
                        fontFamily: "Poppins",
                        fontWeight: 800,
                        color: "rgba(100, 145, 250)"
                    }}
                    href={`/scene/${props.id}`}
                >VIEW</Link>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 4 }} width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="rgb(100, 144, 249)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="rgb(100, 144, 249)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

        </div>

    </motion.div>
}

function FilterButton(props: { type: string, formData: FormDataObject, setFormData: React.Dispatch<React.SetStateAction<FormDataObject>> }) {
    return <div
        style={{
            display: 'flex',
            flexDirection: "column",
            marginBottom: 20
        }}
    >
        <ReactTextareaAutosize
            style={{
                borderRadius: "1rem",
                outline: "1 solid rgba(200, 200, 200, 0.5)",
                background: "rgba(17, 17, 18, 0.4)",
                border: '1px solid rgba(47, 120, 239, 0.2)',
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter : "blur(5px)",
                resize: 'none',
                textAlign : 'center',
                height: 30,
                padding: '1.3rem'
            }}
            placeholder={`Search by ${props.type}`}
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

    return <div
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
                color: "rgb(42, 141, 240)",
                margin: '1rem',
                fontSize: '3rem',
                fontFamily: "Poppins",
                fontWeight: 1000,
                userSelect: 'none',
                opacity: 0.9,
                textShadow: 'rgb(42, 141, 240) 0px 0px 50px',
                size: "10px",
                justifySelf: 'center',
                width: '100%',
                textAlign: 'center',
                marginTop: 40,
            }}
        >EXPLORER</motion.h1>
        {/* <div
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
        /> */}
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
                className={style.ChenarPrincipal}
                style={{
                    border: '1px solid rgba(194, 194, 194, 0.5)',
                    background: "rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(4px)",
                    height: size.y * 0.75,
                    width: '80%',
                    borderRadius: '1.1rem',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    overflowY: "scroll",
                    flexWrap: 'wrap',
                    padding: "2rem",
                    gap: '2rem',
                }}
            >
                {worlds.map(world => (
                    <Card
                        key={world.id}
                        {...world}
                    />
                ))}
            </div>

            <div
                style={{
                    height: '100%',
                    zIndex: 50,
                    width: '30%',
                    borderRadius: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '6%',
                    border: '1px solid rgba(194, 194, 194, 0.3)',
                    gap: '1.5rem',
                    marginLeft: '5%',
                    padding: '3.5%',
                    alignItems: 'center',
                    backdropFilter: "blur(5px)"
                }}
            >

                <motion.button
                    style={{
                        borderRadius: '1rem',
                        zIndex: 50,
                        background : "linear-gradient(120deg, rgba(54, 112, 247, 0.4), rgba(20, 20, 145, 0.3))",
                        border: '1px solid rgba(194,194,194, 0.3)',
                        backdropFilter: "blur(5px)",
                        width: '90%',
                        height: '50px'

                    }}
                    whileHover={{
                        scale: 1.02
                    }}
                    whileTap={{
                        scale: 0.96
                    }}
                    onTap={Search}
                >Search</motion.button>
                <div style={{ zIndex: 50 }}>
                    <div style={{ zIndex: 50 }}>
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

    </div>

}