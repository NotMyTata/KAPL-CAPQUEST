'use client'
import {IconSwords, IconSword, IconShield, IconBuildingCastle, IconUser} from '@tabler/icons-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Quest List",
    url: "/pages/questlist",
    icon: IconBuildingCastle,
  },
  {
    title: "Active Quests",
    url: "#",
    icon: IconSwords,
  },
  {
    title: "My Quests",
    url: "#",
    icon: IconShield,
  },
  {
    title: "Create a Quest",
    url: "#",
    icon: IconSword,
  },
]

export function AppSidebar() {

  const pathname = usePathname();
  const router = useRouter();


  return (
    <Sidebar collapsible='icon' className='font-sans'>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="justify-center mt-2">
            
            <Image
            width={500}
            height={500}
            className="dark:invert w-40"
            src={'/CAPQUEST.svg'}
            alt="logo"
            />
          </SidebarGroupLabel> */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className='justify-center items-center mt-2'>
                 <Image
                  width={500}
                  height={500}
                  className="dark:invert w-40"
                  src={'/CAPQUEST.svg'}
                  alt="logo"
                  />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator className='mt-4 mb-4'/>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
            const isSelected = pathname === item.url

            return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className='text-lg'
                      tooltip={item.title}
                      isActive={isSelected ? true : false}
                      onClick={() => router.push(`${item.url}`)}
                    >
                      {item.icon && <item.icon className="mr-2" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            <SidebarSeparator className='my-3'/>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-lg"
                isActive={pathname === "/pages/profile"}
                onClick={() => router.push("/pages/profile")}
              >
                <IconUser className='mr-2'/>
                My Character
              </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}