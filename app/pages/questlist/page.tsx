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

// const questList: Quest[] = [
//   {
//     id: 1,
//     name: 'Website Development',
//     difficulty: 'A',
//     rating: 1800,
//     description:
//       'Build a responsive website using modern technologies like React and Node.js. Ensure cross-platform compatibility and accessibility.',
//     roles: ['Front-End Developers', 'Back-end Developers', 'AI - Engineers'],
//     clients: [{ id: 1, username: 'poster01' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 2,
//     name: 'Mobile App Redesign',
//     difficulty: 'B',
//     rating: 1600,
//     description:
//       'Redesign an outdated mobile application with a modern, clean UI using Flutter. Focus on user-centered design principles.',
//     roles: ['UI/UX Designer', 'Flutter Devs'],
//     clients: [{ id: 2, username: 'poster02' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 3,
//     name: 'Data Analytics',
//     difficulty: 'C',
//     rating: 1400,
//     description:
//       'Perform data analysis on customer behavior to generate actionable insights using Python and data visualization tools.',
//     roles: ['Data Scientists', 'Python Devs'],
//     clients: [{ id: 3, username: 'poster03' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
// ]



function Page() {
  const [filters, setFilters] = useState<{ role?: string; difficulty?: string }>({})
  const [quests, setQuests] = useState<Quest[]>([])

   useEffect(() => {
      const fetchQuests = async () => {
        try {
            const res = await fetch('/api/quest')

            // Check if the response is NOT OK (status not in 200–299 range)
            if (!res.ok) {
            const errorData = await res.json()
            console.error("Error fetching quests:", errorData.error || res.statusText)
            return
            }

            const data = await res.json()
            setQuests(data.data as Quest[])
            console.log("quests:", data.data)

        } catch (error) {
            // Network or parsing error
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
