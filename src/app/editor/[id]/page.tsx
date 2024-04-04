import Euclidian from "./components/main/Geometry/Euclidian";
import Grid from "./components/main/Grid/Grid";
import Taskbar from "./components/main/Taskbar/Taskbar";
import EuclidianGallery from "./components/main/Tabs/EuclidianGallery";
import Actions from "./components/main/Tabs/Actions";
import Text from "./components/main/Text/Text";
import Menu from "./components/main/Tabs/Menu";
import GraphGallery from "./components/main/Tabs/GraphGallery";
import Graphs from "./components/main/Geometry/Graphs";
import prisma from "../../../../lib/prisma";
import Others from "./components/Others";
import AchorsTab from "./components/main/Tabs/AnchorsTab";
import Anchors from "./components/main/Geometry/Anchors";

interface props {
  params: { id: string },
}

export default async function Home(Properties: props) {

  const points = await prisma.Point.findMany({ where: { worldId: Properties.params.id } });
  const points_calcs = await prisma.PointCalc.findMany({ where: { worldId: Properties.params.id } });
  const segments = await prisma.Segment.findMany({ where: { worldId: Properties.params.id } });
  const labels = await prisma.Label.findMany({ where: { worldId: Properties.params.id } });
  var graphs = await prisma.Graph.findMany({ where: { worldId: Properties.params.id } });
  const anchors = await prisma.Anchor.findMany({where : {worldId : Properties.params.id}})
  const world = await prisma.World.findUnique({ where: { id: Properties.params.id } });
  graphs = graphs.map(w => ({
    x: w.x,
    y: w.y,
    range_x: w.range_x,
    range_y: w.range_y,
    resolution: w.resolution,
    id: w.id,
    functions: JSON.parse(w.functions)
  }));

  return (<>
    <Others author={world.userId} name={world.title} id={Properties.params.id} anchors = {anchors} graphs={graphs} points={points} points_calc={points_calcs} segments={segments} labels={labels} />
    <Grid />
    <Euclidian />
    <Anchors /> 
    <Text />
    <Graphs />
    <Taskbar />
    <EuclidianGallery />
    <GraphGallery />
    <Menu />
    <AchorsTab />
    <Actions />
  </>)
}