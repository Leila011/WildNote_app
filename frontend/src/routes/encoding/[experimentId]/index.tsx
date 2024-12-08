import { useParams } from "@solidjs/router";
import EncodingSample from "../../encoding";

export default function EncodingExperiment() {
  const params = useParams();

  return <EncodingSample {...params} />;
}
