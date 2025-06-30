'use client'
import {IconSwords, IconSword, IconShield, IconBuildingCastle, IconUser, IconMail, IconLogout} from '@tabler/icons-react'
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
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// Menu items.
const items = [
  {
    title: "Quest List",
    url: "/pages/questlist",
    icon: IconBuildingCastle,
  },
  {
    title: "Active Quests",
    url: "/pages/activequests",
    icon: IconSwords,
  },
  {
    title: "My Quests",
    url: "/pages/myquests",
    icon: IconShield,
  },
  {
    title: "Create a Quest",
    url: "/pages/createquest",
    icon: IconSword,
  },
]

export function AppSidebar() {

  const pathname = usePathname();
  const router = useRouter();
  const [profileId, setProfileId] = useState<number>()
  const [clickedProfile, setClickedProfile] = useState(false)

   const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile/")
        const result = await res.json()
        
        console.log(result.data.id)
        setProfileId(result.data.id)

      } catch (err) {
        console.error("Error fetching current user profile", err)
      }
    }
  
  useEffect(() => {
    fetchUser()
  },[])

  function redirectToProfile(){
    if (profileId){
    router.push(`/pages/profile/${profileId}`)
    } else {
      toast.info('Please wait while we get the user data')
      setClickedProfile(true)
    }
  }

  useEffect(() => {
    if (clickedProfile && profileId) {
      router.push(`/pages/profile/${profileId}`)
    }
  }, [profileId, clickedProfile])

  async function handleLogout(){
      const res = await fetch("/api/auth/logout", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Logout failed:", data.error);
    } else {
      // Redirect or refresh page
      console.log("Successfully logged out")
      window.location.href = "/pages/login";
    }
  }

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
                isActive={pathname === "/pages/inbox"}
                onClick={() => router.push("/pages/inbox")}
              >
                <IconMail className='mr-2'/>
                Inbox
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-lg"
                isActive={pathname === `/pages/profile/${profileId}`}
                onClick={() => redirectToProfile()}
              >
                <IconUser className='mr-2'/>
                My Character
              </SidebarMenuButton>
            </SidebarMenuItem>
              <SidebarSeparator className='my-4'/>
              <SidebarMenuItem>
                <SidebarMenuButton
                className='text-lg'
                onClick={() => handleLogout()}
                >
                  <IconLogout className='mr-2'/>
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}