import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
    const data: { name: string, password: string } = await req.json();

    const users: { id: string, password: string }[] = await prisma.User.findMany();
    if (users.findIndex(user => user.id == data.name) == -1) {
        await prisma.User.create({
            data: {
                password: data.password,
                id: data.name
            }
        })
    }

    return NextResponse.json({ message: "uploaded data success" });
}