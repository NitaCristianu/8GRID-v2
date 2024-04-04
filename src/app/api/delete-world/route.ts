
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
    const data: { id : string } = await req.json();
    await prisma.World.deleteMany({
        where : {
            id : data.id
        }
    })

    return NextResponse.json({ message: "uploaded data success" });
}