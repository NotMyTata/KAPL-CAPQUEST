'use client'

import ActiveQuestHeader from '@/components/activequests/activequest-header'
import React, { useState, useMemo, useEffect } from 'react'
import { Quest } from '../questlist/page'
import ActiveQuestTicket from '@/components/activequests/activequest-ticket'

function Page() {
  const [filters, setFilters] = useState<{ role?: string; difficulty?: string }>({})
  const [activeQuests, setActiveQuests] = useState<Quest[]>([])

    useEffect(() => {
    const fetchActiveQuests = async () => {
        try {
            const res = await fetch('/api/quest/active')

            if (!res.ok) {
            const errorData = await res.json()
            console.error("Error fetching quests:", errorData.error || res.statusText)
            return
            }

            const data = await res.json()
            setActiveQuests(data.data as Quest[])
            console.log("Active quests:", data.data)

        } catch (error) {
            console.error("Fetch failed:", error)
        }
    }

    fetchActiveQuests()
    }, [])

    const sortedQuests = useMemo(() => {
    return [...activeQuests].sort((a, b) => {
      const classA = a.roles?.some((role) =>
        filters.role ? role.toLowerCase().includes(filters.role.toLowerCase()) : false
      )
      const classB = b.roles?.some((role) =>
        filters.role ? role.toLowerCase().includes(filters.role.toLowerCase()) : false
      )
  
      const difficultyA = filters.difficulty ? a.difficulty === filters.difficulty : false
      const difficultyB = filters.difficulty ? b.difficulty === filters.difficulty : false
  
      const aScore = Number(classA) + Number(difficultyA)
      const bScore = Number(classB) + Number(difficultyB)
  
      return bScore - aScore
  })
}, [activeQuests, filters])   

  return (
    <div className='font-serif'>
      <ActiveQuestHeader onFiltersChange={setFilters}/>
      <div className="grid grid-cols-2 gap-6 mt-10">
        {sortedQuests.map((quest) => (
          <ActiveQuestTicket key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  )
}

export default Page
