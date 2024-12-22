import { Button } from "@/components/ui/button";
import { getMenuDatas } from "./actions";
import Link from "next/link";

export default async function Page() {
    const menus = await getMenuDatas();

    return (
        <>
            <h2>Menu Page</h2>
            <Link href={"/menu/create"}><Button>Tambah Menu Baru</Button></Link>
            <div>
                {menus.map((menu) => (
                    <div key={menu.id}>
                        <p>Menu: {menu.name}, Path: {menu.path}</p>
                    </div>
                ))}
            </div>

        </>
    );
}