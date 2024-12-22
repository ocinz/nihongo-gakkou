
import { getMaterialById } from "../../actions";
import "react-quill/dist/quill.snow.css";
import Preview from "./preview";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const material = await getMaterialById(id);

    return (
        <Preview material={material} />
    );
}
