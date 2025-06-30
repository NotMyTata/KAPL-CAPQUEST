'use client'
import { Card } from '@/components/ui/card'
import { LuScroll, LuFlaskRound } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { User } from 'lucide-react'
import { toast } from 'sonner'


interface Profile {
  id: number
  username: string
  description: string
  rating: number
  avatar: string | null
  user_id: string
}

function getRank(rating: number){
  if(rating >= 1800 ){
    return 'A'
  } else if (rating < 1800 && rating >= 1440){
    return 'B'
  } else if (rating < 1440 && rating >= 1080){
    return 'C'
  } else if (rating < 1080 && rating >= 720){
    return 'D'
  } else if (rating < 720 && rating >= 360){
    return 'E'
  }else{
    return 'F'
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>()
  const [newUsername ,setNewUsername] = useState<string>('')
  const [newDescription, setNewDescription] = useState<string>('')
  const [canUpdate, setCanUpdate] = useState<boolean>(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
  const params = useParams()
  const profileId = params.id
  
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/profile/")
        const result = await res.json()
        
        console.log(result.data.id)
        console.log(profile?.id)
        if (res.ok && result?.data?.id === profile?.id) {
          setCanUpdate(true)
        }
      } catch (err) {
        console.error("Error fetching current user profile", err)
      }
    }

    if (profile) {
      checkAccess()
    }
  }, [profile])

  
  async function updateProfile(profileData: {
  username?: string;
  description?: string;
  }) {
    try {
      setIsLoadingUpdate(true)
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      setIsLoadingUpdate(false)
      toast.success('Successfully updated profile!')

      window.location.reload();
      console.log('Updated profile:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  function handleUpdate(){
    updateProfile({ username: newUsername, description: newDescription });
  }

  const fetchUser = async () => {
    const res = await fetch(`/api/profile/${profileId}`);
    const data = await res.json();
    setProfile(data.data)
    setNewUsername(data.data.username)
    setNewDescription(data.data.description)
    console.log(data)
  }

  useEffect(() => {
    fetchUser()

  },[])

  if (!profile){
    return (
      <div className='flex justify-center self-center font-serif font-bold'>Loading...</div>
    )
  }

  if (profile && canUpdate)
  return (
    <div>
      {canUpdate ? (
      <div className='w-full flex font-serif'>
        <Sheet>
        <SheetTrigger className='ml-auto' asChild>
          <Button variant={'outline'} className='font-serif'>
            Edit Profile
          </Button>
        </SheetTrigger>
        <SheetContent className='font-serif'>
          <SheetHeader>
            <SheetTitle className='text-xl'>Edit Profile</SheetTitle>
            <SheetDescription className='text-md'>
              Edit your profile by filling in the fields you want to edit.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 pt-7 pb-5">
          <div className="grid gap-3">
            <Label 
            htmlFor="username"
            className='text-lg'
            >Name
            </Label>
            <Input 
            id="username" 
            placeholder='WorldDestroyer28'
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label 
            htmlFor="description"
            className='text-lg'
            >
              Description
            </Label>
            <Textarea 
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
        </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={() => handleUpdate()}>
                {isLoadingUpdate ? (
                  <h1>Saving changes...</h1>
                ):(
                  <h1>Save Changes</h1>
                )}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
        </Sheet>
      </div>
      ): (
         <div></div>
      )}
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-6 gap-6 font-serif text-base">
        {/* Profile Header */}
        <div className="flex flex-col items-center w-full gap-2">
          <div className="rounded-full border-2 border-primary w-32 h-32 flex items-center justify-center overflow-hidden">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-16 h-16 text-primary" />
            )}
          </div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">{profile.username}</div>
          <div className="text-base text-muted-foreground">@{profile.username}</div>
          <div className="mt-1 space-y-2 justify-items-center">
            <div className="border rounded-lg px-5 py-1 text-base font-semibold">Rating : {profile.rating}</div>
            <div className="border w-fit rounded-lg px-5 py-1 text-base font-semibold">Rank : {getRank(profile.rating)}</div>
          </div>
        </div>

        {/* Bio & Skills */}
        <Card className="w-full p-4 flex flex-col md:flex-row gap-4 items-start rounded-xl border bg-card text-card-foreground shadow">
          {/* Character Bio */}
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-2 mb-1 text-lg font-semibold">
              <LuScroll size={24}/> Character Bio
            </div>
            <div className="text-sm md:text-base leading-relaxed">
              {profile.description}
            </div>
          </div>
          {/* Abilities & Skills */}
          {/* <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-2 mb-1 text-lg font-semibold">
              <LuFlaskRound size={24}/> Abilities & Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-base">{skill}</Badge>
              ))}
            </div>
          </div> */}
        </Card>

        {/* Quest Log & Quest Completed */}
        {/* <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"> */}

          {/* Quest Log */}
          {/* <Card className="col-span-2 p-4 rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
              <IconSwords size={24}/> Quest Log
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              {quests.map((quest, idx) => (
                <div key={idx} className="flex-1 border rounded-xl p-3 bg-muted/30 flex flex-col gap-1">
                  <div className="font-semibold text-base md:text-lg">{quest.title}</div>
                  <div className="text-xs text-muted-foreground">{quest.desc}</div>
                  <Badge variant="secondary" className="w-fit text-xs">{quest.status}</Badge>
                </div>
              ))}
            </div>
          </Card> */}

          {/* Quest Completed */}
          {/* <Card className="flex flex-col items-center justify-center p-4 rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex items-center gap-2 mb-1 text-lg font-semibold">
              <IconStar size={24}/> Quest Completed
            </div>
            <div className="text-3xl md:text-4xl font-bold">24,750</div>
            <div className="text-base text-muted-foreground">Quest</div>
          </Card> */}
        {/* </div> */}
      </div>
    </div>
  )
} 