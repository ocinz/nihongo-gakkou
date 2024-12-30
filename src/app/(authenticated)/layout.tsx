import BreadCrumb from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <main>
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadCrumb />
            </div>
        </header>
        <div className=" mx-4">
            {children}
        </div>
    </main>
}