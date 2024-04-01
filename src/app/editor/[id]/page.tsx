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
import { useAtom } from "jotai";
import { ePoints_Calc_data, ePoints_data } from "./data/elements";

interface props {
  params : {id : string},
}

export default async function Home(Properties : props) {
  const points = await prisma.point.findMany({where : {worldId : Properties.params.id}});
  const points_calc = await prisma.point.findMany({where : {worldId : Properties.params.id}});
  const segments = await prisma.segment.findMany({where : {worldId : Properties.params.id}});

  return (<>
    <Grid />
    <Euclidian />
    <Text/>
    <Graphs />
    <Taskbar />
    <EuclidianGallery />
    <GraphGallery />
    <Menu />
    <Actions />
  </>)
}