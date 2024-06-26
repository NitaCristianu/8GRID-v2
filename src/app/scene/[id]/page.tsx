import Euclidian from "./components/main/Geometry/Euclidian";
import Grid from "./components/main/Grid/Grid";
import Text from "./components/main/Text/Text";
import Graphs from "./components/main/Geometry/Graphs";
import Others from "./components/Others";
import prisma from "../../../../lib/prisma";
import ActionsTab from "./components/main/Geometry/AnchorsTab";
export default async function Home(Properties: { params: { id: string } }) {

  var points = [];
  var points_calcs = [];
  var segments = [];
  var labels = [];

  points = await prisma.Point.findMany({ where: { worldId: Properties.params.id } });
  points_calcs = await prisma.PointCalc.findMany({ where: { worldId: Properties.params.id } });
  segments = await prisma.Segment.findMany({ where: { worldId: Properties.params.id } });
  labels = await prisma.Label.findMany({ where: { worldId: Properties.params.id } });
  const anchors = await prisma.Anchor.findMany({ where: { worldId: Properties.params.id } });
  const graphs = await prisma.Graph.findMany({ where: { worldId: Properties.params.id } });
  const world = await prisma.World.findUnique({
    where: { id: Properties.params.id }
  })
  console.log(world.title);
  return (<>
    <Others anchors={anchors} name={world.title} author={world.userId} id={world.id} graphs={graphs} points={points} points_calc={points_calcs} segments={segments} labels={labels} />
    <Grid />
    <ActionsTab />
    <Euclidian />
    <Text />
    <Graphs />
  </>)
}