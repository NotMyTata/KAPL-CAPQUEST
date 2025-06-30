import { Quest } from '@/app/pages/questlist/page'
import { Card, CardHeader, CardContent } from '../ui/card'
import { User, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProfileBadge from '../profile/profilebadge-questpages'

interface Props {
    quest: Quest
}

function MyQuestsTicket({quest}: Props) {
    const router = useRouter()
    function redirectToQuestDetail(){
        router.push(`quest/${quest.id}`)
    }
  return (
    <Card key={quest.id} className="border border-bg bg-card w-full">
        <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-semibold">{quest.name}</h3>
                </div>
                <p className="mb-4 text-muted-foreground">{quest.description}</p>
            </div>
            <div className="text-right ml-4">
                <div className={`text-6xl font-bold flex justify-center`}>
                {quest.difficulty}
                </div>
                <div className="text-sm text-gray-500">Difficulty</div>
            </div>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
            <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                <div className="flex items-center gap-1 mb-2 items-end">
                    <User className="w-4 h-4" />
                    {quest.is_available ? (
                        
                        <span className="text-sm font-md">Applicant/s</span>
                    ): (
                        <span className="text-sm font-md">Client</span>
                    )}
                </div>
                <div className="flex flex-wrap gap-1">
                    {quest.is_available && quest.applicants?.length > 0 ? (
                        quest.applicants.map((a) => (
                        <ProfileBadge
                            key={a.applicant.id}
                            userId={a.applicant.id}
                            username={a.applicant.username}
                        />
                        ))
                    ) : quest.freelancer ? (
                        <ProfileBadge
                        key={quest.freelancer.id}
                        userId={quest.freelancer.id}
                        username={quest.freelancer.username}
                        />
                    ) : (
                        <span className="text-muted-foreground text-sm italic">No applicants yet</span>
                    )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div>Status:</div>
                     {quest.is_available ? (
                        <Badge className="bg-green-500">Choose a freelancer</Badge>
                    ) : quest.is_finished ? (
                        <Badge variant={'secondary'} >Finished</Badge>
                    ) : quest.freelancer ? (
                        <Badge className='bg-yellow-400 text-black'>In Progress</Badge>
                    ) : (
                        <span className="text-red-500">Unavailable</span>
                    )}
                    <div className="text-sm font-md mb-2 mt-2">Roles:</div>
                    <div className="flex flex-wrap gap-2">
                        {quest.roles.map((role, index) => (
                        <Badge key={index} className="">
                            {role}
                        </Badge>
                        ))}
                    </div>
                    </div>

                    <div className="flex gap-2 pt-2 w-fit">
                    <Button variant={'outline'} size={'default'} className="flex-1" onClick={() => redirectToQuestDetail()}>
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Details
                    </Button>
                    </div>
                </div>
            </div>
        </CardContent>
        </Card>
  )
}

export default MyQuestsTicket