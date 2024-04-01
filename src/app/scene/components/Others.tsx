import Link from "next/link";

export default function Others() {
    return (<>
        <Link
            href={"/"}
            style ={{
                position : 'fixed',
                fontSize : '1rem',
                zIndex : 10,
                top : 'calc(100% - 3rem)',
                left : '2rem',
                fontFamily : "Poppins",
                fontWeight : 700
            }}
        >{'< Go back'}</Link>
    </>);
}