"use client"
import { motion, useForceUpdate } from "framer-motion";
import styles from "./styles.module.css";
import useResize from "../editor/[id]/hooks/useResize";
import { ChangeEvent, useEffect, useState } from 'react';
import Link from "next/link";
import { v4 } from "uuid";

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
            border: "1px solid rgba(200, 200, 200, 0.4)",
            backdropFilter: "blur(4px)",
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
                    color: "rgb(49, 239, 87)",
                    fontWeight: 600,

                }}
                href={`/editor/${props.id}`}
            >EDIT</Link>
            <Link
                style={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    color: "rgb(117, 169, 254)"
                }}
                href={`/scene/${props.id}`}
            >VIEW</Link>

        </div>
        <button
            style={{
                fontFamily: "Poppins",
                fontWeight: 300,
                color: "rgb(181, 19, 19)",
            }}
            onClick={() => {
                // Detele world\
                fetch('/api/delete-world', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ id: props.id })
                })

            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                <path d="M10 11V17" stroke="#a0a4a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 11V17" stroke="#a0a4a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 7H20" stroke="#a0a4a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#a0a4a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#a0a4a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </motion.div>
}


export default function Worlds() {
    const size = useResize();
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [doesUserExists, setUserExistence] = useState(false);
    const [loggedIn, setLogIn] = useState(false);
    const [data, setData] = useState([]);
    const [accs, setAccs] = useState([]);

    useEffect(() => {
    }, [data])

    useEffect(() => {
        fetch('/api/get-accs', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((d) => {
                setAccs(d);
            })
            .catch((error) => console.log('error', error));
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
        id={"sketches"}
        style={{
            width: size.x,
            height: size.y,
        }}
    >

        <motion.h1
            style={{
                color: "rgb(42, 141, 240)",
                fontSize: '3rem',
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: 1000,
                overflowX: 'clip',
                marginLeft: 25,
                userSelect: 'none',
                marginTop: 150,
                textShadow: 'rgb(42, 141, 240) 0px 0px 50px',
                opacity: 0.9,
                zIndex: 30
            }}
        >{loggedIn ? "SKETCHES" : "ACCOUNTS"}</motion.h1>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            height: '65%',
            justifyContent: 'center',
            gap: '5%',
        }}>

            {loggedIn ?
                <motion.div
                    className={styles.ChenarPrincipal}
                    style={{
                        borderRadius: ".8rem",
                        border: '2px solid rgba(185, 185, 185, 0.5)',
                        width: '50%',
                        marginLeft: '5%',
                        overflowY: "scroll",
                        height: '110%',
                        display: 'flex',
                        gap: '2rem',
                        backdropFilter: "blur(5px)",
                        zIndex: 150,
                        justifyContent: "center",
                        padding: '2.5rem',
                        flexWrap: 'wrap',
                    }}

                >
                    <motion.button
                        style={{
                            color: 'white',
                            border: '2px solid rgba(185, 185, 185, 0.5)',
                            background: 'linear-gradient(45deg, rgba(124, 195, 233, 0.2) 0%, rgba(25, 243, 116, 0.3) 100%)',
                            width: 250,
                            height: 250,
                            fontFamily: "Poppins",
                            backdropFilter: "blur(2px)",
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
                    {...(data.filter(world => world.userId == formData.name)).map(world => <Card user={formData.name} {...world} key={v4()} />)}
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
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                                width: 150
                            }}
                        >
                            <motion.button
                                style={{
                                    zIndex: 1050,
                                    background: "linear-gradient(20deg, rgba(242, 52, 52, .1), rgba(250, 1, 1, 0.2))",
                                    paddingInline: "2rem",
                                    borderRadius: '0.8rem',
                                    border: "1px solid rgba(255, 0, 0, 0.3)",
                                    padding: '.5rem',
                                    backdropFilter: "blur(3px)",
                                    fontFamily: "Poppins",
                                    fontWeight: 500,
                                    color: "rgb(229, 82, 82)"
                                }}
                                whileTap={{
                                    scale: 1.1
                                }}
                                whileHover={{
                                    scale: 0.9
                                }}
                                onTap={() => {
                                    setLogIn(false);
                                }}
                            >log out</motion.button>
                            <motion.button
                                style={{
                                    zIndex: 1050,
                                    background: "linear-gradient(20deg, rgba(52, 106, 242, 0.1), rgba(1, 121, 250, 0.2))",
                                    backdropFilter: "blur(3px)",
                                    paddingInline: "2rem",
                                    borderRadius: '0.8rem',
                                    border: "1px solid rgba(13, 0, 255, 0.3)",
                                    padding: '.5rem',
                                    fontFamily: "Poppins",
                                    fontWeight: 500,
                                    color: "rgb(82, 182, 229)"
                                }}
                                whileTap={{
                                    scale: 1.1
                                }}
                                whileHover={{
                                    scale: 0.9
                                }}
                                onClick={() => {
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
                            >refresh</motion.button>
                        </div>
                    </div>
                    :
                    // LOG OUT
                    <div
                        style={{
                            zIndex: 50,
                            height : size.y * 0.8,
                            display: "flex",
                            alignItems : "center",
                            gap: 500,
                            marginLeft: -size.x / 4.8,
                            width: size.x * 0.8,
                        }}>
                        <form
                            style={{
                                zIndex: 50,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '50%',
                                gap: '1rem'
                            }}
                            onSubmit={() => {
                                if (
                                    formData.name != "" &&
                                    formData.password != ""
                                ) {
                                    var found = false;
                                    accs.forEach(acc => {
                                        if (acc.id == formData.name && formData.password == acc.password) {
                                            setLogIn(true);
                                            found = true;
                                        }
                                    })
                                    if (!found) window.alert("the username or password is wrong");
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
                                        background: "rgba(22, 22, 22, 0.0)",
                                        padding: 10,
                                        borderRadius: '0.8rem',
                                        zIndex: 60,
                                        backdropFilter: "blur(5px)",
                                        width: '50%',
                                        border: "1px solid rgb(201, 201, 201)"
                                    }}
                                    type="password"
                                    title="password"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setFormData(prev => ({
                                            password: event.target.value || "",
                                            name: prev.name
                                        }));
                                    }}
                                />
                            </div>

                            <motion.button
                                whileTap={{
                                    scale : 1.1
                                }}
                                whileHover={{
                                    scale : 0.95
                                }}
                                type="submit"
                                style={{
                                    background: "linear-gradient(60deg, rgba(32, 130, 242, 0.2), rgba(64, 2, 150, 0.5))",
                                    backdropFilter: "blur(5px)",
                                    padding: 10,
                                    borderRadius: '0.8rem',
                                    border: "1px solid rgb(201, 201, 201)",
                                    zIndex: 60,
                                    textAlign: 'center',

                                }}
                                title="loginbutton"

                            >Log in
                            </motion.button>
                        </form>
                        <form
                            style={{
                                zIndex: 50,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '50%',
                                gap: '1rem'
                            }}
                            onSubmit={() => {
                                if (
                                    formData.name != "" &&
                                    formData.password != ""
                                ) {
                                    var found = false;
                                    accs.forEach(acc => {
                                        if (acc.id == formData.name) {
                                            found = true;
                                        }
                                    })
                                    if (found)
                                        window.alert("Account already exists")
                                    else {
                                        fetch('/api/signin', {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            method: 'POST',
                                            body: JSON.stringify({
                                                name: formData.name,
                                                password: formData.password
                                            })
                                        })
                                        setLogIn(true);
                                    }
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
                                        background: "rgba(22, 22, 22, 0.0)",
                                        padding: 10,
                                        borderRadius: '0.8rem',
                                        zIndex: 60,
                                        backdropFilter: "blur(5px)",
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

                            <motion.button
                                whileTap={{
                                    scale : 1.1
                                }}
                                whileHover={{
                                    scale : 0.95
                                }}
                                type="submit"
                                style={{
                                    background: "linear-gradient(50deg, rgba(32, 130, 242, 0.2), rgba(32, 150, 101, 0.5))",
                                    backdropFilter: "blur(5px)",
                                    padding: 10,
                                    borderRadius: '0.8rem',
                                    border: "1px solid rgb(201, 201, 201)",
                                    zIndex: 60,
                                    textAlign: 'center',

                                }}
                                title="loginbutton"

                            >Sign up
                            </motion.button>
                        </form>
                    </div>}
            </motion.div>
        </div>
    </motion.div >
}