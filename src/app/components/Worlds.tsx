"use client"
import { motion, useForceUpdate } from "framer-motion";
import styles from "./styles.module.css";
import useResize from "../editor/[id]/hooks/useResize";
import { ChangeEvent, useEffect, useState } from 'react';
import Link from "next/link";

export interface world {
    title: string,
    id: string,
    userId: string,
}

export interface CardProps extends world {
    user: string,
}

function Card(props: CardProps) {
    return <motion.div
        key={props.id}
        style={{
            width: 250,
            height: 250,
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
                    fontFamily: "Popins",
                    color: "rgb(117, 169, 254)"
                }}
                href={`/editor/${props.id}`}
            >EDIT</Link>
            <Link
                style={{
                    fontFamily: "Popins",
                    color: "rgb(242, 42, 42)"
                }}
                href={`/scene/${props.id}`}
            >SCENE</Link>

        </div>
        <button
            style={{
                fontFamily: "Poppins",
                fontWeight: 300,
                color: "rgb(69, 17, 17)",
            }}
            onClick={() => {
                // Detele world\
                fetch('/api/delete-world', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ id : props.id })
                })
            }}
        >Delete</button>
    </motion.div>
}


export default function Worlds() {
    const size = useResize();
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [doesUserExists, setUserExistence] = useState(false);
    const [loggedIn, setLogIn] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
    }, [data])

    useEffect(() => {
        if (!loggedIn) return;
        fetch('/api/user', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        localStorage.setItem
    }, [loggedIn]);

    useEffect(() => {
        fetch('/api/create-world', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((d) => {
                setData(d);
            })
            .catch((error) => console.log('error', error));
    }, [])

    return <motion.div
        id={"my worlds"}
        style={{
            width: size.x,
            height: size.y,
        }}
    >
        <motion.h1
            style={{
                color: "#DFDFD1",
                margin: '1rem',
                fontSize: '3rem',
                fontFamily: "Poppins",
                fontWeight: 1000,
                zIndex: 10
            }}
        >{loggedIn ? "MY WORLDS" : "ACCOUNTS"}</motion.h1>

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
        >{loggedIn ? "MY WORLDS" : "ACCOUNTS"}</motion.h1>
        <div style={{
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'row',
            height: '65%',
            justifyContent: 'center',
            gap: '5%',
        }}>

            {loggedIn ?
                <motion.div

                    style={{
                        borderRadius: ".8rem",
                        width: '50%',
                        marginLeft: '5%',
                        overflowY: "scroll",
                        height: '100%',
                        display: 'flex',
                        gap: '2rem',
                        zIndex: 150,
                        padding: '0.5rem',
                        flexWrap: 'wrap',
                    }}

                >
                    <motion.button
                        style={{
                            color: 'white',
                            border: '2px solid rgb(185, 185, 185)',
                            background: 'linear-gradient(45deg, #ccccb3a1 0%, #ccccb3ef 100%)',
                            width: 250,
                            height: 250,
                            fontFamily: "Poppins",
                            fontSize: 100,
                            fontWeight: 1000,
                            borderRadius: '0.8rem',
                            zIndex: 60
                        }}
                        whileTap={{
                            color: "white",
                            scale: 0.98
                        }}
                        whileHover={{
                            color: "white",
                            scale: 1.01
                        }}
                        onTap={() => {
                            fetch('/api/create-world', {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                method: 'POST',
                                body: JSON.stringify(formData),
                            })
                                .then((response) => response.json())
                                .then((data) => setUserExistence(data.exists))
                                .catch((error) => console.log('error', error));
                            fetch('/api/create-world', {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                method: 'GET',
                            })
                                .then((response) => response.json())
                                .then((d) => {
                                    setData(d);
                                })
                                .catch((error) => console.log('error', error));

                        }}
                    >+</motion.button>
                    {...(data.filter(world => world.userId == formData.name)).map(world => <Card user={formData.name} {...world} />)}
                </motion.div> : null}
            <motion.div
                style={{
                    zIndex: 50,
                    width: '40%',
                    height: '65%',
                }}
            >
                {loggedIn ?
                    // LOG IN
                    <div
                        style={{
                            zIndex: 50,
                        }}
                    >
                        <h1
                            style={{
                                userSelect: 'none',
                                fontFamily: "Poppins",
                                fontWeight: 600,

                            }}
                        >Welcome {formData.name}</h1>
                        <br />
                        <motion.button
                            style={{
                                zIndex: 1050,
                                background: "rgba(242, 52, 52, .5)",
                                borderRadius: '0.8rem',
                                padding: '.5rem',
                                fontFamily: "Poppins",
                                color: "rgb(229, 82, 82)"
                            }}
                            onTap={() => {
                                setLogIn(false);
                            }}
                        >log out</motion.button>
                    </div> :
                    // LOG OUT
                    <div
                        style={{
                            zIndex: 50
                        }}>
                        <form
                            style={{
                                zIndex: 50,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '75%',
                                gap: '1rem'
                            }}
                            onSubmit={() => {
                                if (
                                    formData.name != "" &&
                                    formData.password != ""
                                ) {
                                    setLogIn(true);
                                }
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <p>Username</p>
                                <input
                                    style={{
                                        resize: 'none',
                                        background: "rgba(22, 22, 22, 0.5)",
                                        padding: 10,
                                        borderRadius: '0.8rem',
                                        zIndex: 60,
                                        width: '50%',
                                        border: "1px solid rgb(201, 201, 201)"
                                    }}
                                    type="text"
                                    title="user"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setFormData(prev => ({
                                            password: prev.password,
                                            name: event.target.value || ""
                                        }))
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <p>Password</p>
                                <input
                                    style={{
                                        resize: 'none',
                                        background: "rgba(22, 22, 22, 0.5)",
                                        padding: 10,
                                        borderRadius: '0.8rem',
                                        zIndex: 60,
                                        width: '50%',
                                        border: "1px solid rgb(201, 201, 201)"
                                    }}
                                    type="password"
                                    title="password"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setFormData(prev => ({
                                            password: event.target.value || "",
                                            name: prev.name
                                        }))
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    background: "rgba(28, 166, 204, 0.5)",
                                    padding: 10,
                                    borderRadius: '0.8rem',
                                    border: "1px solid rgb(201, 201, 201)",
                                    zIndex: 60,
                                    textAlign: 'center',

                                }}
                                title="loginbutton"

                            >Log in / Sign in</button>
                        </form>
                    </div>}
            </motion.div>
        </div>
    </motion.div >
}