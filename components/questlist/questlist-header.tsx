'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/infrastructure/supabase/client'
import SelectClass from './select-class'
import SelectDifficulty from './select-difficulty'

interface Props {
     onFiltersChange?: (filters: { class: string | undefined; difficulty: string | undefined }) => void
}

function QuestlistHeader({onFiltersChange}: Props) {
    const [username, setUsername] = useState<string | undefined>('')
    const [sortByClass, setSortByClass] = useState('')
    const [sortByDifficulty, setSortByDifficulty] = useState('')

    async function getUser(){
        // const { data, error } = await supabase.auth.getUser()
        // const displayName = data.user.user_metadata.display_name
        // Github display name
        const supabase = createClient()
        const {data, error} = await supabase.auth.getUser()
        const displayName = data.user?.email
        console.log(data.user?.id)

        setUsername(displayName)
    }

    useEffect(() => {
        getUser()
    },[])

    useEffect(() => {
        onFiltersChange?.({ class: sortByClass, difficulty: sortByDifficulty })
    }, [sortByClass, sortByDifficulty, onFiltersChange])

  return (
    <div className='grid xl:grid-cols-[1fr_2fr] md:grid-cols-1 gap-20 w-100rem'>
        <h1 className='text-3xl'>
            Hello, {username} <br/>Looking for a quest?
        </h1>
        <div className='grid md:grid-cols-2 xl:grid-cols-2 gap-20'>
            <SelectClass selectedValue={sortByClass} onChange={setSortByClass}/>
            <SelectDifficulty selectedValue={sortByDifficulty} onChange={setSortByDifficulty} />
        </div>
    </div>
  )
}

export default QuestlistHeader