'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const Quest = [
  {
    id: 1,
    title: 'Website Development',
    diff: 'A',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida, neque vitae lobortis pharetra, lacus metus ullamcorper sem, sit amet auctor tortor sem vitae turpis. Etiam in vestibulum massa. Aliquam ipsum elit, hendrerit et dapibus ut, aliquet quis libero. Aliquam a consectetur nisl, ut convallis leo.',
    clients: [
      { id: 1, name: 'Ryan Hawk' },
      { id: 2, name: 'David Tooah' },
      { id: 3, name: 'Sue Sam' },
    ]
  }
]

export default function QuestPage() {
  const params = useParams()
  const id = Number(params.id)
  const quest = Quest.find(q => q.id === id)

  if (!quest) return <div>Quest not found</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{quest.title}</h1>
      <p className="text-gray-700">{quest.description}</p>
      <h2 className="mt-4 font-semibold">Clients:</h2>
      <ul>
        {quest.clients.map(client => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  )
}
