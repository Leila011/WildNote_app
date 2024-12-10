import { useParams } from "@solidjs/router";
import EncodingSample from "../../..";

export default function Sample() {
  const params = useParams();

  return <EncodingSample {...params} />;
}
