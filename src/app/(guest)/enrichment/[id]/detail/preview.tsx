"use client"
import { Enrichment } from "@prisma/client";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"

export default function Preview({ enrichment }: { enrichment: Enrichment | null }) {
    console.log(enrichment);

    return <div className="mx-8 ">
        <div className="flex flex-row justify-between rounded ">
            <h1 className="text-4xl mb-6 bg-slate-800 w-full text-left p-6 rounded-s-lg">{enrichment?.title}</h1>

        </div>

        <ReactQuill
            theme="bubble"
            value={enrichment?.content}
            className=""
            readOnly={true}
        />
    </div>
} 