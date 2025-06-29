import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IconStar } from '@tabler/icons-react'
import { LuScroll, LuFlaskRound } from 'react-icons/lu'
import { IconSwords } from '@tabler/icons-react'

const skills = [
  'JavaScript',
  'PostgreSQL',
  'PostgreSQL',
  'TypeScript',
  'Counter Strike',
  'PostgreSQL',
];

const quests = [
  {
    title: 'E-Commerce Platform',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida,',
    status: 'Completed',
  },
  {
    title: 'Mobile App Launch',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida,',
    status: 'Completed',
  },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-6 gap-6 font-serif text-base">
      {/* Profile Header */}
      <div className="flex flex-col items-center w-full gap-2">
        <div className="rounded-full border-4 border-black w-32 h-32 flex items-center justify-center bg-white overflow-hidden">
          {/* Profile photo placeholder */}
        </div>
        <div className="text-2xl md:text-3xl font-semibold mt-1">User</div>
        <div className="text-base text-muted-foreground">@user</div>
        <div className="mt-1">
          <div className="border rounded-lg px-5 py-1 text-base font-semibold">Rating :</div>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida, neque vitae lobortis pharetra, lacus metus ullamcorper sem, sit amet auctor tortor sem vitae turpis. Etiam in vestibulum massa. Aliquam ipsum elit, hendrerit et dapibus ut, aliquet quis libero. Aliquam a consectetur nisl, ut convallis leo.
          </div>
        </div>
        {/* Abilities & Skills */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex items-center gap-2 mb-1 text-lg font-semibold">
            <LuFlaskRound size={24}/> Abilities & Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-base">{skill}</Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Quest Log & Quest Completed */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quest Log */}
        <Card className="col-span-2 p-4 rounded-xl border bg-card text-card-foreground shadow">
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
        </Card>
        {/* Quest Completed */}
        <Card className="flex flex-col items-center justify-center p-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex items-center gap-2 mb-1 text-lg font-semibold">
            <IconStar size={24}/> Quest Completed
          </div>
          <div className="text-3xl md:text-4xl font-bold">24,750</div>
          <div className="text-base text-muted-foreground">Quest</div>
        </Card>
      </div>
    </div>
  )
} 