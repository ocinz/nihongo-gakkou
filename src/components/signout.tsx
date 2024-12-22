
import { signOut } from "@/auth";

export default function SignOut() {
    return <>
        <form
            className="w-full"
            action={async () => {
                "use server";
                await signOut({ redirect: true, redirectTo: "/" });
            }}
        >
            <button type="submit"
            >Log Out</button>
        </form>
    </>
}