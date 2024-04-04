import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-scroll";

function Button({ menu }) {
    return <motion.div
        key = {menu}
        style={{
            border: 'none',
            outline: 'none',
            color: "rgb(139, 139, 139)",
        }}
        whileTap={{
            color: "rgb(255, 255, 255)",
            scale: 0.95
        }}
        whileHover={{
            color: "rgb(255, 255, 255)",
            scale: 1.05
        }}
    >

        <Link
            style={{
                fontWeight: 800,
                textAlign: "center",
                color: "white",
                zIndex : 50
            }}
            offset={-100}
            to={menu}
            smooth={true}
            duration={500}
        >{menu.toUpperCase()}</Link>
    </motion.div>

}

export default function Taskbar({ menus }) {

    return (
        <div
            style = {{
                position : "fixed",
                width : '100%',
                height : '3rem',
                zIndex : 960,
            }}
            >
            <motion.div
                className="taskbar"
                style={{
                    display: "flex",
                    width: "100%",
                    height : '100%',
                    justifyContent: "center",
                    alignItems : "center",
                    background: "rgba(13, 13, 13, 0.68)",
                    backdropFilter : 'blur(6px)',
                    WebkitBackdropFilter : 'blur(6px)',
                    zIndex : 920,
                    gap: 35,
                    top: 0,
                    userSelect : 'none',
                    borderBottom: 'white',
                }}

            >

                {menus.map(menu => <Button menu={menu} />)}
            </motion.div >
            <div
                style={{
                    width: '100%',
                    height: '2px',
                    background: 'white',
                    zIndex: 910,
                }}></div>
        </div>
    );
}