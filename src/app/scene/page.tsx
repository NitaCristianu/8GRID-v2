import Euclidian from "./components/main/Geometry/Euclidian";
import Grid from "./components/main/Grid/Grid";
import Text from "./components/main/Text/Text";
import Graphs from "./components/main/Geometry/Graphs";
import Others from "./components/Others";

export default function Home() {
  return (<>
    <Grid />
    <Euclidian />
    <Text/>
    <Graphs />
    <Others />
  </>)
}