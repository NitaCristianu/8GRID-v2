import Euclidian from "./components/main/Geometry/Euclidian";
import Grid from "./components/main/Grid/Grid";
import Text from "./components/main/Text/Text";
import Graphs from "./components/main/Geometry/Graphs";
import Others from "./components/Others";
import prisma from "../../../../lib/prisma";

export default async function Home(Properties: { params: { id: string } }) {

  var points = [];
  var points_calcs = [];
  var segments = [];
  var labels = [];

  points = await prisma.Point.findMany({where : {worldId : Properties.params.id}});
  points_calcs = await prisma.PointCalc.findMany({where : {worldId : Properties.params.id}});
  segments = await prisma.Segment.findMany({where : {worldId : Properties.params.id}});
  labels = await prisma.Label.findMany({where : {worldId : Properties.params.id}});
  const world = await prisma.World.findUnique({
    where : {worldId : Properties.params.id}
  })
  return (<>
    <Others name={world?.name} author={world?.userId} id = {world?.id} graphs={[]} points={points} points_calc={points_calcs} segments={segments} labels={labels} />
    <Grid />
    <Euclidian />
    <Text />
    <Graphs />
  </>)
}