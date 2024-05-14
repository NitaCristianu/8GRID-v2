"use client"
import NextLink from 'next/link';

import Taskbar from "./components/Taskbar";
import About from "./components/About";
import Worlds from "./components/Worlds";
import Tutorials from "./components/Tutorials";
import Explorer from "./components/Workspace";
import Background from './components/Background';
// import Workspace from "./components/Workspace";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

export default function Home() {
  const menus = ["explorer", "sketches", "tutorials", "about"];
  
  return (
    <div style={{overflowX :'hidden'}}>
      <Background/>
      <Taskbar menus={menus}></Taskbar>
      {menus.map((menu) => {
        if (menu == "about")
          return (<About key = {menu}/>)
          else if (menu == "sketches")
          return <Worlds key = {menu}/>
          else if(menu == "tutorials")
           return <Tutorials key = {menu}/>
          else if(menu == "explorer")
           return <Explorer key = {menu}/>
      })}


    </div>
  )
}

// export default function Home() {
//   return (<>
//     <h1>8GRID</h1>
//     <br/>
//     <div
//       style = {{
//         display : 'flex',
//         padding : '1rem',
//         gap : '1rem',
        
//       }}
//     >
//       <Link href={"/editor/6c831419-8ade-4dd8-a893-3d3aa71205dc"} >EDIT</Link>
//       <Link href={"/scene/6c831419-8ade-4dd8-a893-3d3aa71205dc"} >VIEW</Link>
//     </div>
//   </>)

// }