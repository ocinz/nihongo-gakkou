"use client"
import { useSession, SessionProvider } from 'next-auth/react';
import * as React from "react"
import {
    BookOpen,
    BookOpenCheck,
    Bot,
    Command,
    Fingerprint,
    Frame,
    Home,
    IdCard,
    LifeBuoy,
    Map,
    Newspaper,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    User2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
    navMain: [
        {
            title: "Home",
            url: "/",
            icon: Home,
            isActive: true,
        },
        {
            title: "Material",
            url: "/material",
            icon: Newspaper,

        },
        {
            title: "Pengayaan",
            url: "/enrichment",
            icon: Newspaper,

        },
        {
            title: "Practice",
            url: "/practice",
            icon: BookOpenCheck,
            disabled: false,
            // items: [
            //     {
            //         disabled: true,
            //         title: "N1",
            //         url: "/practice/n1",
            //     },
            //     {
            //         disabled: true,

            //         title: "N2",
            //         url: "/practice/n2",
            //     },
            //     {
            //         disabled: true,

            //         title: "N3",
            //         url: "/practice/n3",
            //     }, {
            //         disabled: true,

            //         title: "N4",
            //         url: "/practice/n4",
            //     }, {
            //         title: "N5",
            //         url: "/practice/n5",
            //     },
            // ],
        },
        {
            title: "Shiken",
            url: "/exam",
            icon: BookOpen,
            // items: [
            //     {
            //         disabled: true,
            //         title: "N1",
            //         url: "/exam/n1",
            //     },
            //     {
            //         disabled: true,
            //         title: "N2",
            //         url: "/exam/n2",
            //     },
            //     {
            //         disabled: true,
            //         title: "N3",
            //         url: "/exam/n3",
            //     }, {
            //         disabled: true,
            //         title: "N4",
            //         url: "/exam/n4",
            //     }, {
            //         title: "N5",
            //         url: "/exam/n5",
            //     },
            // ],
        },
        {
            title: "User",
            url: "/user",
            icon: User2,
        },
        {
            title: "Role",
            url: "/role",
            icon: IdCard,
        },
        {
            title: "Authority",
            url: "/authority",
            icon: Fingerprint,
        },
        {
            title: "Settings",
            url: "/setting",
            icon: Settings2,
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "/support",
            icon: LifeBuoy,
            disabled: true
        },
        {
            title: "Feedback",
            url: "/feedback",
            icon: Send,
            disabled: true
        },
    ],
    // projects: [
    //     {
    //         name: "Design Engineering",
    //         url: "#",
    //         icon: Frame,
    //     },
    //     {
    //         name: "Sales & Marketing",
    //         url: "#",
    //         icon: PieChart,
    //     },
    //     {
    //         name: "Travel",
    //         url: "#",
    //         icon: Map,
    //     },
    // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const session = useSession()
    const user = { name: session.data?.user?.name ?? "", email: session.data?.user?.email ?? "", avatar: session.data?.user?.image ?? "" }
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Nihongo Gakkou</span>
                                    <span className="truncate text-xs">Balajar Bahasa Jepang</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
