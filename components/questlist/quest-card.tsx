import React from 'react'
import { Card } from '../ui/card'
import { Quest } from '@/app/pages/questlist/page'
import { useRouter } from 'next/navigation'

interface Props {
    quest: Quest
}

function QuestCard({quest}: Props) {
    const router = useRouter()
    function redirectToQuestDetail(){
        router.push(`quest/${quest.id}`)
    }
  return (
    <div>
        <Card className='h-full text-lg rounded-md p-5' onClick={() => redirectToQuestDetail()}>
            <div className='p-4 flex-cols h-full justify-center text-center space-y-6 border border-primary'>
                <h1>HELP WANTED</h1>
                <h1>{quest.name}</h1>
                <div className='flex justify-center items-end space-x-2'>
                    <h1 className='text-[8rem] leading-[6rem]'>{quest.difficulty}</h1>
                    <h1 className='text-muted-foreground w-fit h-fit text-sm'>Difficulty</h1>
                </div>
                <div>
                    {quest.roles.map((role, index) => (
                        <h1 key={index}>{role}</h1>
                    ))}
                </div>
            </div>
        </Card>
    </div>
  )
}

export default QuestCard