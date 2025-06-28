'use client'

import QuestCard from '@/components/questlist/quest-card'
import QuestlistHeader from '@/components/questlist/questlist-header'
import React, { useState, useMemo } from 'react'

export type Quest = {
  id: number
  title: string
  roles: string[]
  difficulty: string
}

const questList: Quest[] = [
  {
    id: 1,
    title: 'Website Development',
    difficulty: 'A',
    roles: ['Front-End Developers', 'Back-end Developers', 'AI - Engineers'],
  },
  {
    id: 2,
    title: 'Mobile App Redesign',
    difficulty: 'B',
    roles: ['UI/UX Designer', 'Flutter Devs'],
  },
  {
    id: 3,
    title: 'Data Analytics',
    difficulty: 'C',
    roles: ['Data Scientists', 'Python Devs'],
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
