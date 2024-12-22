
import { auth } from "@/auth"
import Editor from "./editor"
import { notFound } from "next/navigation"
import { getEnrichmentById } from "../../actions"


export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth()
    const enrichmentId = parseInt((await params).id)
    const enrichment = await getEnrichmentById(enrichmentId)
    return session ? <div  >
        <Editor enrichment={enrichment} />
    </div> : notFound()
}