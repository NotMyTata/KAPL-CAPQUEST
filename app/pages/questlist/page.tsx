'use client'
import QuestCard from '@/components/questlist/quest-card'
import QuestlistHeader from '@/components/questlist/questlist-header'
import React, { useState, useMemo, useEffect } from 'react'

export interface ApplicantWrapper {
  applicant: Applicant
}

export interface Applicant {
  id: number
  username: string
}

export interface Poster {
  id: number
  user_id: string
  username: string
  rating: number
}

export interface Freelancer {
  id: number
  user_id: string
  username: string
}

export interface Quest {
  id: number
  name: string
  description: string
  difficulty: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  is_available: boolean
  is_finished: boolean
  roles: string[]
  applicants: ApplicantWrapper[]
  poster: Poster
  freelancer: Freelancer
}

function Page() {
  const [filters, setFilters] = useState<{ role?: string; difficulty?: string }>({})
  const [quests, setQuests] = useState<Quest[]>([])

   useEffect(() => {
      const fetchQuests = async () => {
        try {
            const res = await fetch('/api/quest')

            if (!res.ok) {
            const errorData = await res.json()
            console.error("Error fetching quests:", errorData.error || res.statusText)
            return
            }

            const data = await res.json()
            setQuests(data.data as Quest[])
            console.log("quests:", data.data)

        } catch (error) {
            console.error("Fetch failed:", error)
        }
    }
    fetchQuests()
  }, [])

  const sortedQuests = useMemo(() => {
   return [...quests].sort((a, b) => {
    const classA = a.roles.some((role) =>
      filters.role ? role.toLowerCase().includes(filters.role.toLowerCase()) : false
    ) ?? false

    const classB = b.roles.some((role) =>
      filters.role ? role.toLowerCase().includes(filters.role.toLowerCase()) : false
    ) ?? false

    const difficultyA = filters.difficulty ? a.difficulty === filters.difficulty : false
    const difficultyB = filters.difficulty ? b.difficulty === filters.difficulty : false

    const aScore = Number(classA) + Number(difficultyA)
    const bScore = Number(classB) + Number(difficultyB)

    return bScore - aScore
    })
  }, [quests, filters])

  return (
    <div className='font-serif'>
      <QuestlistHeader onFiltersChange={setFilters} />
      <div className="grid grid-cols-[20rem] justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 mt-10">
        {sortedQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  )
}

export default Page
