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

interface props {
  params: { id: string },
}

export default async function Home(Properties: props) {

  const points = await prisma.Point.findMany();
  const points_calcs = await prisma.PointCalc.findMany();
  const segments = await prisma.Segment.findMany();
  const labels = await prisma.Label.findMany();
  const worlds = await prisma.World.findMany();
  const graphs = [];

  return (<>
    <Others author={worlds[0].userId} name = {worlds[0].title} id = {Properties.params.id} graphs={graphs} points={points} points_calc={points_calcs} segments={segments} labels={labels} />
    <Grid />
    <Euclidian />
    <Text />
    <Graphs />
    <Taskbar />
    <EuclidianGallery />
    <GraphGallery />
    <Menu />
    <Actions />
  </>)
}