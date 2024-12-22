import { auth } from "@/auth"
import { EnrichmentDataTable } from "@/app/(guest)/enrichment/components/enrichment-data-tabel"
import PostCards from "./components/enrichment-card"
import { getEnrichments } from "./actions"

export default async function Page() {
    const session = await auth()
    const enrichments = await getEnrichments({ page: 2, pageSize: 10 })
    return !session ? <><PostCards /></> : <>
        <EnrichmentDataTable enrichments={enrichments} /></>
}