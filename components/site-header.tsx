// import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeSwitcher } from "./theme-switcher"
// import { ThemeToggleNoButton } from "../theme-toggle"

export function SiteHeader() {
  return (
   <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
    <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
    </div>
        <div className="justify-self-end">
            <ThemeSwitcher />
        </div>
    </header>
  )
}
