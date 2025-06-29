'use client'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

const Quest = [
  {
    id: 1,
    title: 'Website Development',
    difficulty: 'A',
    rating: 1800,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida, neque vitae lobortis pharetra, lacus metus ullamcorper sem, sit amet auctor tortor sem vitae turpis. Etiam in vestibulum massa. Aliquam ipsum elit, hendrerit et dapibus ut, aliquet quis libero. Aliquam a consectetur nisl, ut convallis leo.',
    roles: ['Front-End', 'Back-End', 'AI Wizard'],
    clients: [{ id: 1, username: 'Poster.username' }],
  },
]

export default function QuestPage() {
  const params = useParams()
  const id = Number(params.id)
  const quest = Quest.find((q) => q.id === id)

  if (!quest)
    return (
      <div className="flex justify-center items-center h-full w-full text-lg font-semibold font-serif">
        Quest not found
      </div>
    )

  return (
    <div className="font-serif w-full h-full min-h-full flex items-center justify-center">
      <div className="rounded-xl border bg-card text-card-foreground shadow w-full h-full p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full h-full min-h-[70vh] border border-gray-400 rounded-none p-4 md:p-12 py-16 flex flex-col h-full">
          <div className="grid md:grid-cols-2 gap-8 h-full items-end">

            <div className="flex flex-col h-full justify-end items-start p-2 md:p-8 pb-0">
              <div className="w-full">
                <div className="text-lg mb-2">Title</div>
                <div className="text-5xl font-bold mb-6 font-serif">{quest.title}</div>
                <div className="text-lg mb-2">Difficulty</div>
                <div className="flex items-center mb-6">
                  <span className="text-6xl font-bold font-serif">{quest.difficulty}</span>
                  <span className="text-6xl font-bold font-serif ml-2">- {quest.rating} +</span>
                </div>
                <div className="text-lg mb-2">Roles</div>
                <div className="flex flex-wrap gap-4 mt-2">
                  {quest.roles.map((role, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="rounded-xl border bg-card px-6 py-2 text-lg font-bold font-serif"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full justify-end items-start p-2 md:p-8 pt-0">
              <div className="w-full mb-auto">
                <div className="text-lg mb-2">Description</div>
                <div className="text-lg font-serif mb-8 whitespace-pre-line">{quest.description}</div>
                <div className="text-lg mb-2">Clients</div>
                <div className="flex flex-col gap-4 mb-6 md:mb-8">
                  {quest.clients.map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center gap-4 rounded-xl border bg-card px-6 py-2 w-fit"
                    >
                      <span className="w-10 h-10 rounded-full bg-gray-300 inline-block" />
                      <span className="text-lg font-serif">{client.username}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-end w-full">
                <Button
                  variant="outline"
                  className="rounded-xl border bg-card text-card-foreground text-3xl font-bold font-serif py-6 w-full"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
