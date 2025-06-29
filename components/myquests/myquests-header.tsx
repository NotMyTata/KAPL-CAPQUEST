'use client'
import React, { useEffect, useState } from 'react'
import SelectClass from '../questlist/select-class'
import SelectDifficulty from '../questlist/select-difficulty'

interface Props {
     onFiltersChange?: (filters: { class: string | undefined; difficulty: string | undefined }) => void
}

function MyQuestsHeader({onFiltersChange}: Props) {
    const [sortByClass, setSortByClass] = useState('')
    const [sortByDifficulty, setSortByDifficulty] = useState('')

    useEffect(() => {
        onFiltersChange?.({ class: sortByClass, difficulty: sortByDifficulty })
    }, [sortByClass, sortByDifficulty, onFiltersChange])

  return (
    <div className='grid xl:grid-cols-[1fr_2fr] md:grid-cols-1 gap-20 w-100rem'>
        <h1 className='text-3xl'>
            Your Quests<br/>
            <span className='text-muted-foreground text-xl '>Quests you posted</span>
        </h1>
        <div className='grid md:grid-cols-2 xl:grid-cols-2 gap-20'>
            <SelectClass selectedValue={sortByClass} onChange={setSortByClass}/>
            <SelectDifficulty selectedValue={sortByDifficulty} onChange={setSortByDifficulty} />
        </div>
    </div>
  )
}

export default MyQuestsHeader