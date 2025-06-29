'use client'
import React, { useState, useMemo } from 'react'
import { Quest } from '../questlist/page'
import MyQuestsHeader from '@/components/myquests/myquests-header'
import MyQuestsTicket from '@/components/myquests/myquests-ticket'


const questList: Quest[] = [
  {
    id: 1,
    name: 'Website Development',
    difficulty: 'A',
    rating: 1800,
    description: 'Develop a modern website with responsive design and AI integration.',
    roles: ['Front-End Developers', 'Back-end Developers', 'AI - Engineers'],
    clients: [{ id: 1, username: 'poster01' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 2,
    name: 'Mobile App Redesign',
    difficulty: 'B',
    rating: 1650,
    description: 'Redesign an existing mobile app with improved UX and Flutter.',
    roles: ['UI/UX Designer', 'Flutter Devs'],
    clients: [{ id: 2, username: 'poster02' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 3,
    name: 'Data Analytics',
    difficulty: 'C',
    rating: 1500,
    description: 'Analyze customer data to find actionable business insights.',
    roles: ['Data Scientists', 'Python Devs'],
    clients: [{ id: 3, username: 'poster03' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 4,
    name: 'E-Commerce Platform',
    difficulty: 'A',
    rating: 1820,
    description: 'Create a scalable e-commerce platform with secure payment systems.',
    roles: ['Full-Stack Developers', 'Payment Integration Specialist'],
    clients: [{ id: 4, username: 'poster04' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 5,
    name: 'Game Prototype',
    difficulty: 'B',
    rating: 1600,
    description: 'Build a prototype for a 3D adventure game with immersive sound.',
    roles: ['Game Developers', '3D Artists', 'Sound Designers'],
    clients: [{ id: 5, username: 'poster05' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 6,
    name: 'Chatbot Development',
    difficulty: 'A',
    rating: 1750,
    description: 'Design an NLP-powered chatbot for customer service automation.',
    roles: ['AI - Engineers', 'NLP Specialists', 'Backend Developers'],
    clients: [{ id: 6, username: 'poster06' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 7,
    name: 'AR Navigation App',
    difficulty: 'S',
    rating: 2000,
    description: 'Develop an AR app to assist indoor navigation with real-time guidance.',
    roles: ['AR Developers', 'UI/UX Designer', 'Mobile Developers'],
    clients: [{ id: 7, username: 'poster07' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 8,
    name: 'Legacy System Migration',
    difficulty: 'S',
    rating: 1980,
    description: 'Migrate a large-scale legacy system to a modern architecture.',
    roles: ['System Architects', 'DevOps Engineers'],
    clients: [{ id: 8, username: 'poster08' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 9,
    name: 'Digital Marketing Dashboard',
    difficulty: 'B',
    rating: 1620,
    description: 'Build a dashboard to visualize and monitor marketing campaigns.',
    roles: ['Data Analysts', 'React Developers'],
    clients: [{ id: 9, username: 'poster09' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 10,
    name: 'IoT Home Automation',
    difficulty: 'A',
    rating: 1775,
    description: 'Create an app to control and automate home IoT devices securely.',
    roles: ['Embedded Engineers', 'App Developers', 'Cloud Engineers'],
    clients: [{ id: 10, username: 'poster10' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 11,
    name: 'Blockchain Voting System',
    difficulty: 'S',
    rating: 2050,
    description: 'Develop a secure and transparent voting system using blockchain.',
    roles: ['Blockchain Developers', 'Security Engineers', 'Product Managers'],
    clients: [{ id: 11, username: 'poster11' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 12,
    name: 'Educational Quiz App',
    difficulty: 'C',
    rating: 1480,
    description: 'Build a fun and interactive quiz app for high school students.',
    roles: ['Flutter Devs', 'Content Creators', 'Backend Devs'],
    clients: [{ id: 12, username: 'poster12' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 13,
    name: 'Fitness Tracker',
    difficulty: 'B',
    rating: 1590,
    description: 'Design a mobile fitness app that tracks workouts and calories.',
    roles: ['Mobile Developers', 'UX Researchers', 'API Developers'],
    clients: [{ id: 13, username: 'poster13' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 14,
    name: 'Portfolio Website Generator',
    difficulty: 'C',
    rating: 1450,
    description: 'Create a tool that auto-generates customizable portfolio websites.',
    roles: ['Front-End Developers', 'CMS Integrators'],
    clients: [{ id: 14, username: 'poster14' }],
    poster: {id: 1, username: 'JobPoster01'}
  },
  {
    id: 15,
    name: 'Cybersecurity Awareness Game',
    difficulty: 'A',
    rating: 1785,
    description: 'Build a game to educate users about common cybersecurity threats.',
    roles: ['Game Designers', 'Cybersecurity Specialists', 'Unity Developers'],
    clients: [{ id: 15, username: 'poster15' }],
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
      <MyQuestsHeader onFiltersChange={setFilters}/>
      <div className="grid gap-10 mt-10">
        {sortedQuests.map((quest) => (
          <MyQuestsTicket key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  )
}

export default Page
