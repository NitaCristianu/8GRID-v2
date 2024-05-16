
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request) {
    const users: { id: string, password: string }[] = await prisma.User.findMany();
    const data = JSON.stringify(users);
    return new Response(data);
}