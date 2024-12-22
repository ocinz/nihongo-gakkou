
import { getEnrichmentById } from "../../actions";
import "react-quill/dist/quill.snow.css";
import Preview from "./preview";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const enrichment = await getEnrichmentById(id);

    return (
        <Preview enrichment={enrichment} />
    );
}
