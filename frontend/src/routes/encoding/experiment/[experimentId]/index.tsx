import { useParams } from "@solidjs/router";
import Sample from "./sample";

export default function EncodingExperiment() {
  const params = useParams();

  return <Sample {...params} />;
}
