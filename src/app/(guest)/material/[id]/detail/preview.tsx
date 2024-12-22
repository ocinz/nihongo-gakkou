"use client"
import { Material } from "@prisma/client";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"

export default function Preview({ material }: { material: Material | null }) {
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