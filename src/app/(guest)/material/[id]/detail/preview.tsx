"use client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
type Level = "N1" | "N2" | "N3" | "N4" | "N5"
export type Material = {
    content: string;
    userId: string;
    title: string;
    id: number;
    level: Level;
} | null
export default function Preview({ material }: { material: Material }) {
    console.log(material);

    return <div className="mx-8 ">
        <div className="flex flex-row justify-between rounded ">
            <h1 className="text-4xl mb-6 bg-slate-800 w-full text-left p-6 rounded-s-lg">{material?.title}</h1>
            <h1 className="text-4xl mb-6 bg-slate-800 w-full text-right p-6 rounded-e-lg">{material?.level}</h1>
        </div>

        <ReactQuill
            theme="bubble"
            value={material?.content}
            className=""
            readOnly={true}
        />
    </div>
} 