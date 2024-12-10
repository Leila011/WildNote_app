import { useParams } from "@solidjs/router";
import EncodingExperiment from "../..";

export default function Experiment() {
  const params = useParams();

  return <EncodingExperiment {...params} />;
}