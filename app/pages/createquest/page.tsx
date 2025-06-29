'use client'
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Plus } from 'lucide-react'

const availableRoles = [
    "Front-End",
    "Back-End",
    "AI Wizard",
    "DevOps",
    "UI/UX Designer",
    "Product Manager",
    "QA Tester",
]

const ratings = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
]

function Page() {
    const [title, setTitle] = useState('')
    const [descripton, setDescription] = useState('')
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [selectedDifficulty, setSelectedDifficulty] = useState('')

    const addRole = (role: string) => {
        if (!selectedRoles.includes(role)) {
            setSelectedRoles((prev) => [...prev, role])
        }
    }

    const removeRole = (roleToRemove: string) => {
        setSelectedRoles((prev) => prev.filter((role) => role !== roleToRemove))
    }

    const handleSubmit = () => {
        
    }

    useEffect(() => {
        console.log(selectedRoles)
    },[selectedRoles])

  return (
     <div className="font-serif w-full h-full min-h-full flex items-center justify-center">
      <div className="rounded-xl border bg-card text-card-foreground shadow w-full h-full p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full h-full min-h-[70vh] border rounded-none p-4 md:p-12 py-16 flex flex-col h-full">
            <div className='space-y-6 px-20'>
                <h1 className='text-4xl'>Create A Quest</h1>
                <div className='space-y-2'>
                    <Label
                    htmlFor='title'
                    className='text-3xl'
                    >
                        Title
                    </Label>
                    <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='text-2xl'
                    id='title'
                    placeholder='Quest Title'
                    />
                </div>
                <div className='space-y-2'>
                    <Label
                    htmlFor='description'
                    className='text-3xl'
                    >
                        Description
                    </Label>
                    <Textarea
                    value={descripton}
                    onChange={(e) => setDescription+(e.target.value)}
                    placeholder='Quest Description'
                    />
                </div>
                <div className='space-y-2'>
                    <Label
                    htmlFor='roles'
                    className='text-3xl'
                    >
                        Roles
                    </Label>
                    <div className='flex gap-3'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                            type="button"
                            className="w-10 h-10 border hover:bg-gray-50 flex items-center justify-center text-gray-700 rounded-full"
                            >
                            <Plus className="w-5 h-5 dark:invert" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48 font-serif text-xl">
                            {availableRoles
                            .filter((role) => !selectedRoles.includes(role))
                            .map((role) => (
                                <DropdownMenuItem key={role} onClick={() => addRole(role)}>
                                {role}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedRoles.map((role) => (
                        <Badge key={role} variant={'outline'} 
                        className="px-4 py-2 text-md rounded-2xl font-serif font-normal">
                        {role}
                        <button
                            type="button"
                            onClick={() => removeRole(role)}
                            className="ml-2 "
                        >
                            ×
                        </button>
                        </Badge>
                    ))}
                    </div>
                </div>
                <div className='space-y-2'>
                    <Label
                    htmlFor='difficulty'
                    className='text-3xl'
                    >
                        Rating/Difficulty
                    </Label>
                    <div className='flex gap-2'>
                        {ratings.map((rating, idx) => (
                            <Button
                            key={idx}
                            variant={'outline'}
                            onClick={() => setSelectedDifficulty(rating)}
                            className={`w-12 h-12 rounded-3xl text-lg font-serif transition-colors ${
                                selectedDifficulty === rating ? "border border-primary font-bold" : "text-foreground"
                            }`}
                            >
                                {rating}
                            </Button>
                        ))}
                    </div>
                </div>
                <Button
                variant={'default'}
                className='w-full h-12 text-2xl'
                onClick={() => handleSubmit()}
                >
                    Create
                </Button>
            </div>
        </Card>
      </div>
    </div>
  )
}

export default Page