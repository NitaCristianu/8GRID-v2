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


  var points = [];
  var points_calcs = [];
  var segments = [];
  var labels = [];

  points = await prisma.Point.findMany();
  points_calcs = await prisma.PointCalc.findMany();
  segments = await prisma.Segment.findMany();
  labels = await prisma.Label.findMany();

  return (<>
    <Others points={points} points_calc={points_calcs} segments={segments} labels={labels} />
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