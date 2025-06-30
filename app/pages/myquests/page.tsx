'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Quest } from '../questlist/page'
import MyQuestsHeader from '@/components/myquests/myquests-header'
import MyQuestsTicket from '@/components/myquests/myquests-ticket'


function Page() {
  const [filters, setFilters] = useState<{ role?: string; difficulty?: string }>({})
  const [myQuests, setMyQuests] = useState<Quest[]>([])


  useEffect(() => {
    const fetchMyQuests = async () => {
        try {
            const res = await fetch('/api/quest/my')

            if (!res.ok) {
            const errorData = await res.json()
            console.error("Error fetching quests:", errorData.error || res.statusText)
            return
            }

            const data = await res.json()
            setMyQuests(data.data as Quest[])
            console.log("My quests:", data.data)

        } catch (error) {
            console.error("Fetch failed:", error)
        }
    }
    fetchMyQuests()
  },[])
  const sortedQuests = useMemo(() => {
   return [...myQuests].sort((a, b) => {
    const classA = a.roles?.some((role) =>
      filters.role ? role.toLowerCase().includes(filters.role.toLowerCase()) : false
    ) ?? false

    const classB = b.roles?.some((role) =>
      filters.role ? role.toLowerCase().includes(filters.role.toLowerCase()) : false
    ) ?? false

    const difficultyA = filters.difficulty ? a.difficulty === filters.difficulty : false
    const difficultyB = filters.difficulty ? b.difficulty === filters.difficulty : false

    const aScore = Number(classA) + Number(difficultyA)
    const bScore = Number(classB) + Number(difficultyB)

    return bScore - aScore
    })
  }, [myQuests, filters])

  return (
    <div className='font-serif'>
      <MyQuestsHeader onFiltersChange={setFilters}/>
      <div className="grid grid-cols-2 gap-10 mt-10">
        {sortedQuests.map((quest) => (
          <MyQuestsTicket key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  )
}

export default Page
