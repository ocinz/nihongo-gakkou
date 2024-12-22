"use client"
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { string } from "zod";

export default function BreadCrumb() {
    const pathname = usePathname().split("/")

    return <>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={"/" + pathname[1]}>
                        {pathname[1]}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathname[2] ? <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{pathname[2]}</BreadcrumbPage>
                    </BreadcrumbItem>
                </> : <></>}
            </BreadcrumbList>
        </Breadcrumb>
    </>

}