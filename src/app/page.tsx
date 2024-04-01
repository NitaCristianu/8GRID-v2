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
      <Link href={"/editor"} >EDIT</Link>
      <Link href={"/scene"} >VIEW</Link>
    </div>
  </>)

}