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

  points = await prisma.point.findMany();
  
  return (<>
    <Grid />
    <Euclidian />
    <Text />
    <Graphs />
    <Others points={points} points_calc={points_calcs} segments={segments} labels={labels} />
  </>)
}