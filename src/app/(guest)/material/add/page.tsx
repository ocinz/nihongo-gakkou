import { notFound } from "next/navigation"

import Editor from "../components/editor"
import { auth } from "@/auth"


export default async function Page() {
    const session = await auth()

    return session ? <>
        <div className=" mx-8">
            <Editor userId={session.user?.id ?? ""} />
        </div>

    </> : notFound()
}