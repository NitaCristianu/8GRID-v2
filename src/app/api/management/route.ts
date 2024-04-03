import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { ePoint, eSegment, WorldParams } from "@/app/editor/[id]/data/props";

// Upload Wolrd to data base
export async function POST(req: Request) {
    const data: WorldParams = await req.json();
    async function UpdatePoint(p: ePoint) {
        const record = await prisma.Point.findUnique({
            where: {
                id: p.id
            }
        });
        if (record) {
            await prisma.Point.update({
                where: { id: p.id },
                data: {
                    x: p.x,
                    y: p.y,
                    tag: p.tag,
                    color: p.color,
                }
            })
        } else {
            await prisma.Point.create({
                data: {
                    x: p.x,
                    y: p.y,
                    id: p.id,
                    tag: p.tag,
                    color: p.color,
                    worldId: data.id
                }
            })
        }
    }
    async function UpdateSegment(s: eSegment) {
        console.log(s);
        const record = await prisma.Segment.findUnique({
            where: {
                id: s.id
            }
        });
        if (record) {
            await prisma.Segment.update({
                where: { id: s.id },
                data: {
                    from: s.from,
                    to: s.to,
                    color: s.color,
                    renderMode: s.renderMode
                }
            })
        } else {
            console.log("A")
            await prisma.Segment.create({
                data: {
                    from: s.from,
                    to: s.to,
                    color: s.color,
                    renderMode: s.renderMode,
                    id: s.id,
                    worldId: data.id
                }
            })
        }
    }
    await prisma.Point.deleteMany({
        where: {
            worldId: data.id,
            NOT: { id: { in: data.points.map(p => p.id), }, }
        }
    })
    data.points.forEach(UpdatePoint)

    await prisma.Segment.deleteMany({
        where: {
            worldId: data.id,
            NOT: { id: { in: data.segments.map(s => s.id), }, }
        }
    })
    data.segments.forEach(UpdateSegment)
    return NextResponse.json({
        message: "Uploaded data succes"
    });
}