import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <SiteHeader />
            <main className="p-10">
            {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
