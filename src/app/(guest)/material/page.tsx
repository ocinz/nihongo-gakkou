import { auth } from "@/auth"
import { MaterialDataTable } from "@/app/(guest)/material/components/material-data-tabel"
import PostCards from "./components/material-card"
import { getMaterials } from "./actions"

export default async function Page() {
    const session = await auth()
    const materials = await getMaterials()
    return !session ? <><PostCards /></> :
        <div className=" mx-8">
            <MaterialDataTable materials={materials} />
        </div>
}