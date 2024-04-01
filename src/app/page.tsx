import Link from 'next/link';

export default function Home() {
  return (<>
    <h1>8GRID</h1>
    <br/>
    <div
      style = {{
        display : 'flex',
        padding : '1rem',
        gap : '1rem',
        
      }}
    >
      <Link href={"/editor/6c831419-8ade-4dd8-a893-3d3aa71205dc"} >EDIT</Link>
      <Link href={"/scene/6c831419-8ade-4dd8-a893-3d3aa71205dc"} >VIEW</Link>
    </div>
  </>)

}