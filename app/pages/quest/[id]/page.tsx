'use client'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IconUser } from '@tabler/icons-react'
import { toast } from 'sonner'

interface Profile {
  id: number
  user_id: string
  username: string
  rating: number
}

interface Applicant {
  id?: number
  freelancer_id?: number
  user_id?: string
  username?: string
  user?: {
    id: number
    username: string
  }
  applicant?: {
    id: number
    username: string
    rating: number
    description: string
    avatar: string
    created_at: string
  }
}

interface Quest {
  id: number
  name: string
  description: string
  difficulty: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  is_available: boolean
  is_finished: boolean
  applicants: Applicant[]
  poster: Profile
  freelancer?: Profile
  roles?: any[]
}

export default function QuestPage() {
  const params = useParams()
  const id = Number(params.id)
  const router = useRouter()
  const [quest, setQuest] = useState<Quest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [applying, setApplying] = useState(false)
  const [accepting, setAccepting] = useState<number | null>(null)
  const [finishing, setFinishing] = useState(false)

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/quest/${id}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch quest')
        }
        
        const data = await response.json()
        setQuest(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/profile')
        if (response.ok) {
          const data = await response.json()
          setCurrentUser(data.data)
        }
      } catch (err) {
        setError('Failed to fetch current user')
      }
    }

    if (id) {
      fetchQuest()
      fetchCurrentUser()
    }
  }, [id])


  function getRatingRange(difficulty: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'){
    if (difficulty === 'A'){
      return '1800 +'
    } else if (difficulty === 'B'){
      return '1440 - 1800'
    } else if (difficulty === 'C'){
      return '1080 - 1440'
    } else if (difficulty === 'D'){
      return '720 - 1080'
    } else if (difficulty === 'E'){
      return '360 - 720'
    } else {
      return '< 360'
    }
  }

  const handleApply = async () => {
    if (!quest || !currentUser) return
    
    try {
      setApplying(true)
      const response = await fetch(`/api/quest/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to apply')
      }

      toast.success("Successfully applied to quest!")
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply')
    } finally {
      setApplying(false)
    }
  }

  const handleAccept = async (applicant: Applicant) => {
    if (!quest || !currentUser) {
      setError('Missing data for accept operation')
      return
    }

    let freelancerId = applicant.id || applicant.freelancer_id || applicant.user_id || applicant.user?.id
    
    if (!freelancerId && applicant.applicant) {
      freelancerId = applicant.applicant.id
    }
    
    if (!freelancerId) {
      setError('Invalid applicant data')
      return
    }

    const numericFreelancerId = typeof freelancerId === 'string' ? parseInt(freelancerId, 10) : freelancerId
    
    if (isNaN(numericFreelancerId)) {
      setError('Invalid freelancer ID')
      return
    }
    
    try {
      setAccepting(numericFreelancerId)
      
      const response = await fetch(`/api/quest/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ freelancer_id: numericFreelancerId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to accept applicant')
      }
      
      toast.success("Successfully accepted applicant!")
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept applicant')
    } finally {
      setAccepting(null)
    }
  }

  const handleFinish = async () => {
    if (!quest || !currentUser) return
    
    try {
      setFinishing(true)
      const response = await fetch(`/api/quest/${id}/finish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to finish quest')
      }

      toast.success("Successfully set quest as finished!")
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to finish quest')
    } finally {
      setFinishing(false)
    }
  }

  const isPoster = currentUser && quest && currentUser.id === quest.poster.id
  const isFreelancer = currentUser && quest && quest.freelancer && currentUser.id === quest.freelancer.id
  const hasApplied = currentUser && quest && quest.applicants && quest.applicants.some(applicant => {
    const applicantId = applicant.id || applicant.freelancer_id || applicant.user_id || applicant.user?.id || applicant.applicant?.id
    return applicantId === currentUser.id
  })
  const canApply = currentUser && quest && quest.is_available && !quest.is_finished && !isPoster && !isFreelancer && !hasApplied
  const canFinish = isPoster && quest && !quest.is_available && !quest.is_finished && quest.freelancer

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full text-lg font-semibold font-serif">
        Loading quest...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full text-lg font-semibold font-serif text-red-500">
        {error}
      </div>
    )
  }

  if (!quest) {
    return (
      <div className="flex justify-center items-center h-full w-full text-lg font-semibold font-serif">
        Quest not found
      </div>
    )
  }

  return (
    <div className="font-serif w-full h-full min-h-full flex items-center justify-center">
      <div className="rounded-xl border bg-card text-card-foreground shadow w-full h-full p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full h-full min-h-[70vh] border border-gray-400 rounded-none p-4 md:p-12 py-16 flex flex-col h-full">
          <div className="grid md:grid-cols-2 gap-8 h-full items-end">

            <div className="flex flex-col h-full justify-end items-start p-2 md:p-8 pb-0">
              <div className="w-full">
                <div className="text-lg mb-2">Title</div>
                <div className="text-5xl font-bold mb-6 font-serif">{quest.name}</div>
                <div className="text-lg mb-2">Difficulty</div>
                <div className="flex items-center mb-6">
                  <span className="text-6xl font-bold font-serif">{quest.difficulty}</span>
                  <span className="text-6xl font-bold font-serif ml-2"> ({getRatingRange(quest.difficulty)})</span>
                </div>
                <div className="text-lg mb-2">Roles</div>
                <div className="flex flex-wrap gap-4 mt-2 mb-6">
                  {quest.roles && Array.isArray(quest.roles) && quest.roles.length > 0 ? (
                    quest.roles.map((role, idx) => (
                      <Badge
                        key={`role-${idx}-${role.id || role.name || idx}`}
                        variant="outline"
                        className="rounded-xl border bg-card px-6 py-2 text-lg font-bold font-serif"
                      >
                        {role.name || role}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No roles specified</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full justify-end items-start p-2 md:p-8 pt-0">
              <div className="w-full mb-auto">
                <div className="text-lg mb-2">Description</div>
                <div className="text-lg font-serif mb-8 whitespace-pre-line">{quest.description}</div>
                <div className="text-lg mb-2">Poster</div>
                <div className="flex flex-col gap-4 mb-6 md:mb-8">
                  <Button
                  className='flex items-center gap-4 rounded-xl border px-6 py-1 w-fit h-15'
                  variant={'outline'}
                  onClick={() => router.push(`/pages/profile/${quest.poster.id}`)}
                  >
                    <span className="w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden">
                      <IconUser />
                    </span>
                    <span className="text-lg font-serif">{quest.poster.username}</span>
                  </Button>
                </div>
                {quest.freelancer && (
                  <>
                    <div className="text-lg mb-2">Assigned Freelancer</div>
                    <div className="flex flex-col gap-4 mb-6 md:mb-8">
                      <Button
                      className='flex items-center gap-4 rounded-xl border px-6 py-1 w-fit h-15'
                      variant={'outline'}
                      onClick={() => router.push(`/pages/profile/${quest.freelancer?.id}`)}
                      >
                        <span className="w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden">
                          <IconUser />
                        </span>
                        <span className="text-lg font-serif">{quest.freelancer.username}</span>
                      </Button>
                    </div>
                  </>
                )}
                {quest.applicants && Array.isArray(quest.applicants) && quest.applicants.length > 0 && (
                  <>
                    <div className="text-lg mb-2">Applicants ({quest.applicants.length})</div>
                    <div className="flex flex-col gap-4 mb-6 md:mb-8">
                      {quest.applicants.map((applicant, index) => {
                        const username = applicant.username || applicant.user?.username || applicant.applicant?.username || `Applicant ${index + 1}`
                        const applicantId = applicant.id || applicant.freelancer_id || applicant.user_id || applicant.user?.id || applicant.applicant?.id

                        return (
                          <div key={`applicant-${applicantId || index}`} className='flex items-center'>
                            {/* key={`applicant-${applicantId || index}`}
                             */}
                          <Button
                          className='flex items-center gap-4 rounded-xl border px-6 py-1 w-fit h-15'
                          variant={'outline'}
                          onClick={() => router.push(`/pages/profile/${applicantId}`)}
                          >
                            <span className="w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden">
                              <IconUser />
                            </span>
                            <span className="text-lg font-serif">{username}</span>
                          </Button>
                            {isPoster && quest.is_available && !quest.is_finished && (
                              <Button
                                onClick={() => handleAccept(applicant)}
                                disabled={accepting === applicantId}
                                className="ml-4 px-4 py-2 text-sm"
                              >
                                {accepting === applicantId ? 'Accepting...' : 'Accept'}
                              </Button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
                {(!quest.applicants || !Array.isArray(quest.applicants) || quest.applicants.length === 0) && isPoster && (
                  <div className="text-lg mb-2 text-muted-foreground">No applicants yet</div>
                )}
              </div>
              <div className="flex items-end w-full gap-4">
                {canFinish && (
                  <Button
                    onClick={handleFinish}
                    disabled={finishing}
                    className="rounded-xl border bg-green-600 hover:bg-green-700 text-white text-2xl font-bold font-serif py-6 flex-1"
                  >
                    {finishing ? 'Finishing...' : 'Finish Quest'}
                  </Button>
                )}
                {canApply && (
                  <Button
                    onClick={handleApply}
                    variant={'outline'}
                    disabled={applying}
                    className="rounded-xl border bg-card text-card-foreground text-3xl font-bold font-serif py-6 w-full"
                  >
                    {applying ? 'Applying...' : 'Apply'}
                  </Button>
                )}
                {hasApplied && (
                  <Button
                    disabled
                    className="rounded-xl border bg-gray-100 text-gray-500 text-3xl font-bold font-serif py-6 w-full"
                  >
                    Already Applied
                  </Button>
                )}
                {isPoster && !canFinish && (
                  <Button
                    disabled
                    className="rounded-xl border bg-gray-100 text-gray-500 text-3xl font-bold font-serif py-6 w-full"
                  >
                    Your Quest
                  </Button>
                )}
                {isFreelancer && (
                  <Button
                    disabled
                    className="rounded-xl border bg-green-100 text-green-700 text-3xl font-bold font-serif py-6 w-full"
                  >
                    Assigned to You
                  </Button>
                )}
                {!quest.is_available && !quest.is_finished && !isFreelancer && !isPoster && (
                  <Button
                    disabled
                    className="rounded-xl border bg-gray-100 text-gray-500 text-3xl font-bold font-serif py-6 w-full"
                  >
                    Quest Unavailable
                  </Button>
                )}
                {quest.is_finished && (
                  <Button
                    disabled
                    className="rounded-xl border bg-blue-100 text-blue-700 text-3xl font-bold font-serif py-6 w-full"
                  >
                    Quest Completed
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
