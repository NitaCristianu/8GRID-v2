import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Get user worlds
// export async function GET_USER_WORLDS(req: Request) {
//     const data: { user: string, password: string } = await req.json();
//     const user = prisma.User.findUnique({
//         where: {
//             name: data.user
//         }
//     })
//     const worlds = prisma.World.findMany({
//         where: {
//             userId: data.user
//         }
//     })
//     console.log(worlds);
//     return NextResponse.json({

//         message: "Uploaded data succes",
//     });
// }

export async function POST(req: Request) {
    const data: { name: string, password: string } = await req.json();

    const users: { id: string, password: string }[] = await prisma.User.findMany();
    if (users.findIndex(user => user.id == data.name) == -1) {
        // doesn't exist
        await prisma.User.create({
            data: {
                password : data.password,
                id : data.name
            }
        })
    }

    return NextResponse.json({ message: "uploaded data success" });
}

// export async function PASSWORD_CORRECT(req: Request) {
//     const data: { user: string, password: string } = await req.json();

//     const user = prisma.User.findUnique({
//         where: {
//             name: data.user
//         }
//     })
//     if (user.password != data.password) {
//         return NextResponse.json({ correct: false });
//     }
//     return NextResponse.json({ correct: true });
// }

// export async function SIGN_IN(req: Request,) {
//     const data: { user: string, password: string } = await req.json();

//     await prisma.User.create({
//         data: {
//             name: data.user,
//             password: data.password
//         }
//     })

//     return NextResponse.json({ exists: true });
// }