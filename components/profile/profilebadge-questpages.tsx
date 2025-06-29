import React from 'react'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'
import { UserCircle } from 'lucide-react'

interface Props {
    userId: number
    username: string
}

function ProfileBadge({userId, username}: Props) {
    const router = useRouter()
  return (
    <div>
        <Badge className='gap-2 cursor-pointer h-7' variant={'outline'} onClick={() => router.push(`/pages/profile/${userId}`)}>
            <UserCircle className='w-4 h-4' />
            {username}
        </Badge>
    </div>
  )
}

export default ProfileBadge