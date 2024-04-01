import Euclidian from "./components/main/Geometry/Euclidian";
import Grid from "./components/main/Grid/Grid";
import Text from "./components/main/Text/Text";
import Graphs from "./components/main/Geometry/Graphs";
import Others from "./components/Others";
import prisma from "../../../../lib/prisma";

export default async function Home(Properties: { params: { id: string } }) {
  const points = await prisma.point.findMany();
  const points_calcs = await prisma.pointCalc.findMany({ where: { worldId: Properties.params.id } });
  const segments = await prisma.segment.findMany({ where: { worldId: Properties.params.id } });
  // const labels = await prisma.label.findMany({ where: { worldId: Properties.params.id } });
  return (<>
    <Grid />
    <Euclidian />
    <Text />
    <Graphs />
    <Others points={points} points_calc={points_calcs} segments={segments} labels={[]} />
  </>)
}