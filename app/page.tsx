'use client'
import { Button } from '@/components/ui/button'
import { IconShield } from '@tabler/icons-react'
import { MapIcon, SwordIcon, SwordsIcon, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeSwitcher } from '@/components/theme-switcher'

function LandingPage() {
    const router = useRouter()
  return (
    <div>
        <nav className='flex p-4 items-center justify-between border-b sticky top-0 z-50'>
            <Image
            width={500}
            height={500}
            className="dark:invert w-40"
            src={'/CAPQUEST.svg'}
            alt="logo"
            />
            <div className='flex items-center'>
                <div className='flex gap-4'>
                    <Button variant={'outline'} className='visible max-sm:invisible'>
                        <Link href={'/auth/sign-up'}>
                        Sign Up
                        </Link>
                    </Button>
                    <Button>
                        <Link href={'/auth/login'}>
                        Login
                        </Link>
                    </Button>
                </div>
                <div className='ml-6'>
                <ThemeSwitcher />
                </div>
            </div>
        </nav>
        <main className='mt-20'>
            <div className='p-8 flex justify-center py-20'>
                <div className='text-center grid gap-3'>
                    <div className='grid xl:grid-cols-2 md:grid-cols-1 items-center justify-center mt-[5rem]'>
                        <h1 className='text-6xl font-semibold mr-4'>
                            Welcome to
                        </h1>
                         <Image
                        width={500}
                        height={500}
                        className="dark:invert w-[350px] mt-2 mx-auto"
                        src={'/CAPQUEST.svg'}
                        alt="logo"
                        />
                    </div>
                    <p className='text-xl max-w-[650px] justify-self-center'>
                        The ultimate arena where skilled freelancers embark on epic quests and visionary clients discover legendary talent. Join the adventure and unlock your potential!
                    </p>
                    <div className='gap-2 flex justify-center mt-5'>
                        <Button onClick={() => router.push('/auth/login')}>
                            <SwordIcon />
                            Start a Quest
                        </Button>
                        <Button variant={'outline'} onClick={() => router.push('/auth/login')}>
                            <IconShield />
                            Post a Quest
                        </Button>
                    </div>
                </div>
            </div>
        </main>
        <main className='h-full mt-20'>
            <div className='grid md:grid-cols-2 xl:grid-cols-4 p-10 gap-5'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <SwordIcon size={40} className='p-1 border rounded-xl mb-5'/>
                            Elo/Rating System
                        </CardTitle>
                        <CardDescription>
                            Complete quests to earn elo/rating, and work your way up the ranks, giving you more professional quests along the way!
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <MapIcon size={40} className='p-1 border rounded-xl mb-5'/>
                            Categorized Quests
                        </CardTitle>
                        <CardDescription>
                            Easily find quests that suit your style and skill, with categorized quests and an easy sorting system!
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <SwordsIcon size={40} className='p-1 border rounded-xl mb-5'/>
                            Quests Manager
                        </CardTitle>
                        <CardDescription>
                            Manage quests that both you posted and applied for, with detailed information regarding each quests!
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Users size={40} className='p-1 border rounded-xl mb-5'/>
                            Profile Customization
                        </CardTitle>
                        <CardDescription>
                            Easily customize your profile as what you want other people to see, as it will be very important for job posters to pick!
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </main>
    </div>
  )
}

export default LandingPage