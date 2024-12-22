
import { auth } from "@/auth"
import Editor from "./editor"
import { notFound } from "next/navigation"
import { getMaterialById } from "../../actions"


export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth()
    const materialId = parseInt((await params).id)
    const material = await getMaterialById(materialId)
    return session ? <div className=" mx-8">
        <Editor material={material} />
    </div> : notFound()
}