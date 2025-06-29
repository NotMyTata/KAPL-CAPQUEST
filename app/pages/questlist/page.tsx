'use client'
import QuestCard from '@/components/questlist/quest-card'
import QuestlistHeader from '@/components/questlist/questlist-header'
import React, { useState, useMemo } from 'react'

export interface Client {
  id: number
  username: string
}

export interface Poster {
  id: number
  username: string
}

export interface Quest {
  id: number
  name: string
  difficulty: 'S' | 'A' | 'B' | 'C'
  rating: number
  description: string
  roles: string[]
  clients: Client[]
  poster: Poster
}

const questList: Quest[] = [
  {
    id: 1,
    name: 'Website Development',
    difficulty: 'A',
    rating: 1800,
    description:
      'Build a responsive website using modern technologies like React and Node.js. Ensure cross-platform compatibility and accessibility.',
    roles: ['Front-End Developers', 'Back-end Developers', 'AI - Engineers'],
    clients: [{ id: 1, username: 'poster01' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 2,
    name: 'Mobile App Redesign',
    difficulty: 'B',
    rating: 1600,
    description:
      'Redesign an outdated mobile application with a modern, clean UI using Flutter. Focus on user-centered design principles.',
    roles: ['UI/UX Designer', 'Flutter Devs'],
    clients: [{ id: 2, username: 'poster02' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 3,
    name: 'Data Analytics',
    difficulty: 'C',
    rating: 1400,
    description:
      'Perform data analysis on customer behavior to generate actionable insights using Python and data visualization tools.',
    roles: ['Data Scientists', 'Python Devs'],
    clients: [{ id: 3, username: 'poster03' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
]


function Page() {
  const [filters, setFilters] = useState<{ class?: string; difficulty?: string }>({})

  const sortedQuests = useMemo(() => {
  return [...questList].sort((a, b) => {
    const classA = a.roles.some((role) =>
      filters.class ? role.toLowerCase().includes(filters.class.toLowerCase()) : false
    )
    const classB = b.roles.some((role) =>
      filters.class ? role.toLowerCase().includes(filters.class.toLowerCase()) : false
    )

    const difficultyA = filters.difficulty ? a.difficulty === filters.difficulty : false
    const difficultyB = filters.difficulty ? b.difficulty === filters.difficulty : false

    const aScore = Number(classA) + Number(difficultyA)
    const bScore = Number(classB) + Number(difficultyB)

    return bScore - aScore // sort descending by relevance
  })
}, [filters])

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
