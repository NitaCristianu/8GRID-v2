import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { ePoint, ePoints_Calc, eSegment, Label, WorldParams } from "@/app/editor/[id]/data/props";

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
    async function UpdatePointCalc(p: ePoints_Calc) {
        const record = await prisma.PointCalc.findUnique({
            where: {
                id: p.id
            }
        });
        if (record) {
            await prisma.PointCalc.update({
                where: { id: p.id },
                data: {
                    formula: p.formula,
                    color: p.color,
                    tag: p.tag
                }
            })
        } else {
            await prisma.PointCalc.create({
                data: {
                    tag: p.tag,
                    formula: p.formula,
                    color: p.color,
                    id: p.id,
                    worldId: data.id
                }
            })
        }
    }
    async function UpdateLabel(l: Label) {
        const record = await prisma.Label.findUnique({
            where: {
                id: l.id
            }
        });
        if (record) {
            await prisma.Label.update({
                where: { id: l.id },
                data: {
                    left: l.left,
                    top: l.top,
                    content: l.content
                }
            })
        } else {
            await prisma.Label.create({
                data: {
                    id: l.id,
                    worldId: data.id,
                    left: l.left,
                    top: l.top,
                    content: l.content
                }
            })
        }
    }
    async function updateGraphs(g: {
        range_x: number,
        range_y: number,
        x: number,
        y: number,
        id: string,
        worldId: string,
        functions: string,
        resolution: number,
    }) {
        const record = await prisma.Graph.findUnique({
            where: {
                id: g.id
            }
        });
        if (record) {
            await prisma.Graph.update({
                where: { id: g.id },
                data: {
                    x: g.x,
                    y: g.y,
                    range_x: g.range_x,
                    range_y: g.range_y,
                    resolution: g.resolution,
                    functions: g.functions
                }
            })
        } else {
            await prisma.Graph.create({
                data: {
                    id: g.id,
                    worldId: data.id,
                    x: g.x,
                    y: g.y,
                    range_x: g.range_x,
                    range_y: g.range_y,
                    resolution: g.resolution,
                    functions: g.functions,
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

    await prisma.PointCalc.deleteMany({
        where: {
            worldId: data.id,
            NOT: { id: { in: data.points_calc.map(p => p.id), }, }
        }
    })
    data.points_calc.forEach(UpdatePointCalc)
    await prisma.Label.deleteMany({
        where: {
            worldId: data.id,
            NOT: { id: { in: data.labels.map(l => l.id), }, }
        }
    })
    data.labels.forEach(UpdateLabel)
    await prisma.Graph.deleteMany({
        where: {
            worldId: data.id,
            NOT: { id: { in: data.graphs.map(g => g.id), }, }
        }
    })
    data.graphs.forEach(updateGraphs)
    return NextResponse.json({
        message: "Uploaded data succes"
    });
}