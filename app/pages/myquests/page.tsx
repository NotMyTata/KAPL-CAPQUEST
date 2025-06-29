'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Quest } from '../questlist/page'
import MyQuestsHeader from '@/components/myquests/myquests-header'
import MyQuestsTicket from '@/components/myquests/myquests-ticket'


// const questList: Quest[] = [
//   {
//     id: 1,
//     name: 'Website Development',
//     difficulty: 'A',
//     rating: 1800,
//     description: 'Develop a modern website with responsive design and AI integration.',
//     roles: ['Front-End Developers', 'Back-end Developers', 'AI - Engineers'],
//     clients: [{ id: 1, username: 'poster01' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 2,
//     name: 'Mobile App Redesign',
//     difficulty: 'B',
//     rating: 1650,
//     description: 'Redesign an existing mobile app with improved UX and Flutter.',
//     roles: ['UI/UX Designer', 'Flutter Devs'],
//     clients: [{ id: 2, username: 'poster02' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 3,
//     name: 'Data Analytics',
//     difficulty: 'C',
//     rating: 1500,
//     description: 'Analyze customer data to find actionable business insights.',
//     roles: ['Data Scientists', 'Python Devs'],
//     clients: [{ id: 3, username: 'poster03' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 4,
//     name: 'E-Commerce Platform',
//     difficulty: 'A',
//     rating: 1820,
//     description: 'Create a scalable e-commerce platform with secure payment systems.',
//     roles: ['Full-Stack Developers', 'Payment Integration Specialist'],
//     clients: [{ id: 4, username: 'poster04' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 5,
//     name: 'Game Prototype',
//     difficulty: 'B',
//     rating: 1600,
//     description: 'Build a prototype for a 3D adventure game with immersive sound.',
//     roles: ['Game Developers', '3D Artists', 'Sound Designers'],
//     clients: [{ id: 5, username: 'poster05' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 6,
//     name: 'Chatbot Development',
//     difficulty: 'A',
//     rating: 1750,
//     description: 'Design an NLP-powered chatbot for customer service automation.',
//     roles: ['AI - Engineers', 'NLP Specialists', 'Backend Developers'],
//     clients: [{ id: 6, username: 'poster06' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
//   {
//     id: 7,
//     name: 'AR Navigation App',
//     difficulty: 'C',
//     rating: 2000,
//     description: 'Develop an AR app to assist indoor navigation with real-time guidance.',
//     roles: ['AR Developers', 'UI/UX Designer', 'Mobile Developers'],
//     clients: [{ id: 7, username: 'poster07' }],
//     poster: {id: 1, username: 'JobPoster01'}
//   },
// ]


function Page() {
  const [filters, setFilters] = useState<{ role?: string; difficulty?: string }>({})
  const [myQuests, setMyQuests] = useState<Quest[]>([])


  useEffect(() => {
    const fetchMyQuests = async () => {
        try {
            const res = await fetch('/api/quest/my')

            // Check if the response is NOT OK (status not in 200–299 range)
            if (!res.ok) {
            const errorData = await res.json()
            console.error("Error fetching quests:", errorData.error || res.statusText)
            return
            }

            const data = await res.json()
            setMyQuests(data.data as Quest[])
            console.log("My quests:", data.data)

        } catch (error) {
            // Network or parsing error
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
