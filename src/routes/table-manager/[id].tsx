import { useParams } from "@solidjs/router";

export default function TableManagerId() {
    const params = useParams();
    return (
        <div>TableManager: {params.id}</div>
    );
  }