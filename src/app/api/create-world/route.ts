
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { NextApiResponse } from "next";

export async function POST(req: Request) {
    const data: { name: string, password: string } = await req.json();
    const user = (await prisma.User.findMany({
        where: {
            id: data.name
        }
    }))[0];
    await prisma.World.create({
        data : {
            title : "template",
            userId : user.id,
        }
    })


    return NextResponse.json({ message: "uploaded data success" });
}

export async function GET(req: NextRequest) {
    const worlds = await prisma.World.findMany();
    return new Response(JSON.stringify(worlds));
}