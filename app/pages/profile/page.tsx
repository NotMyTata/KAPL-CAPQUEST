import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  IconStar, 
  IconTrophy, 
  IconBrandLinkedin, 
  IconBrandGithub, 
  IconBrandInstagram, 
  IconLink, 
  IconSwords, 
  IconBuildingCastle 
} from "@tabler/icons-react";
import { LuFlaskRound, LuScroll, LuPhone } from "react-icons/lu";
import { PiCompassRose } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { CiGlobe } from "react-icons/ci";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto py-10 gap-8 font-serif text-lg md:text-xl">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="rounded-full border-4 border-foreground/20 w-40 h-40 flex items-center justify-center bg-white overflow-hidden">
          {/* Profile photo placeholder*/}
        </div>
        <div className="text-4xl font-medium">John Mustard</div>
        <div className="text-muted-foreground text-xl">
          @johnmustard
        </div>
        <div className="flex gap-4 mt-2">
          <Button variant="secondary" size="lg">Senior Developer</Button>
          <Button variant="secondary" size="lg">Outlaw</Button>
        </div>
      </div>
      
      {/* Bio & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2 text-2xl font-semibold">
              <LuScroll size={24}/> Character Bio</div>
            <div className="text-muted-foreground text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida, neque vitae lobortis pharetra, lacus metus ullamcorper sem, sit amet auctor tortor sem vitae turpis. Etiam in vestibulum massa. Aliquam ipsum elit, hendrerit et dapibus ut, aliquet quis libero. Aliquam a consectetur nisl, ut convallis leo.
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2 text-2xl font-semibold">
              <LuFlaskRound size={24}/> Abilities & Skills</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1 text-base">
                <IconTrophy size={18}/> JavaScript</Badge>
              <Badge variant="secondary" className="flex items-center gap-1 text-base">
                <IconTrophy size={18}/> TypeScript</Badge>
                <Badge variant="secondary" className="flex items-center gap-1 text-base">
                  <IconTrophy size={18}/> Counter Strike</Badge>
                <Badge variant="secondary" className="flex items-center gap-1 text-base">
                  <IconTrophy size={18}/> PostgreSQL</Badge>
                <Badge variant="secondary" className="flex items-center gap-1 text-base">
                  <IconTrophy size={18}/> PostgreSQL</Badge>
                <Badge variant="secondary" className="flex items-center gap-1 text-base">
                  <IconTrophy size={18}/> PostgreSQL</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quest Log */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4 text-2xl font-semibold">
            <IconSwords size={24}/> Quest Log</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 flex flex-col gap-2 bg-muted/30">
              <div className="flex items-center gap-2 font-semibold text-xl">
                <IconSwords size={20}/> E-Commerce Platform</div>
              <div className="text-base text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</div>
              <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 border-green-200 text-base">Completed</Badge>
            </div>
            <div className="border rounded-lg p-4 flex flex-col gap-2 bg-muted/30">
              <div className="flex items-center gap-2 font-semibold text-xl">
                <IconSwords size={20}/> Mobile App Launch</div>
              <div className="text-base text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</div>
              <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 border-green-200 text-base">Completed</Badge>
            </div>
            <div className="border rounded-lg p-4 flex flex-col gap-2 bg-muted/30">
              <div className="flex items-center gap-2 font-semibold text-xl">
                <IconSwords size={20}/> AI Integration</div>
              <div className="text-base text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</div>
              <Badge variant="secondary" className="w-fit bg-yellow-100 text-yellow-800 border-yellow-200 text-base">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location & Contact, Quest Completed, Guild Connections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="w-full">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2 text-2xl font-semibold">
              <PiCompassRose size={24}/> Location & Contact</div>
            <div className="flex items-center gap-2 text-lg">
              <IconBuildingCastle size={18}/> Surabaya</div>
            <div className="flex items-center gap-2 text-lg">
              <LuScroll size={18}/> johnmustard@rockstar.com</div>
            <div className="flex items-center gap-2 text-lg">
              <LuPhone size={18}/> 0123456798</div>
            <div className="flex items-center gap-2 text-lg">
              <CiGlobe size={18}/> johnmustard.com</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2 mb-2 text-2xl font-semibold">
              <IconStar size={24}/> Quest Completed</div>
            <div className="text-5xl md:text-6xl font-bold">24,750</div>
            <div className="text-lg text-muted-foreground">Quest</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2 text-2xl font-semibold">
              <HiOutlineUserGroup size={24}/> Guild Connections</div>
            <div className="flex flex-wrap gap-2">
              <a href="https://linkedin.com" target="_blank">
                <Button variant="secondary" size="lg" className="flex items-center gap-1">
                  <IconBrandLinkedin size={18}/> LinkedIn</Button></a>
              <a href="https://github.com" target="_blank">
                <Button variant="secondary" size="lg" className="flex items-center gap-1">
                  <IconBrandGithub size={18}/> GitHub</Button></a>
              <a href="https://instagram.com" target="_blank">
                <Button variant="secondary" size="lg" className="flex items-center gap-1">
                  <IconBrandInstagram size={18}/> Instagram</Button></a>
              <a href=" " target="_blank">
                <Button variant="secondary" size="lg" className="flex items-center gap-1">
                  <IconLink size={18}/> Portfolio</Button></a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 