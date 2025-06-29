import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { 
    Select, 
    SelectTrigger, 
    SelectGroup, 
    SelectContent, 
    SelectItem, 
    SelectValue, 
    SelectLabel 
} from '../ui/select'

const roles = [
    {
        name: 'Front-end Developer',
        class_id: 1,
    },
    {
        name: 'Back-end Developer',
        class_id: 2,
    },
    {
        name: 'Full-stack Developer',
        class_id: 3,
    },
]

interface Props {
    selectedValue: string
    onChange: (value: string) => void
}

interface Role {
    id: number
    name: string
}

function SelectClass({selectedValue, onChange}: Props) {
    const [roles, setRoles] = useState<Role[]>([])

    const fetchRoles = async () => {
        try {
            const res = await fetch("/api/roles", {
            method: "GET",
            });

            const data = await res.json();

            if (!res.ok) {
            throw new Error(data.error ?? "Failed to fetch roles");
            }

            console.log("Roles:", data.data); // array of roles
            setRoles(data.data)
        } catch (err) {
            console.error("Error fetching roles:", err);
            return [];
        }
    };

    useEffect(() => {
        fetchRoles()
    },[])

  return (
    <div>
         <Card>
            <CardHeader>
                <div>
                    <CardTitle className='text-center text-xl'>
                        Role
                    </CardTitle>
                    <CardDescription className='text-center text-xl'>
                        Sort By Role:
                    </CardDescription>
                </div>
                <div className='justify-center flex'>
                     <Select value={selectedValue} onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort By Role" />
                    </SelectTrigger>
                    <SelectContent className='font-serif'>
                        <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                         {roles.map((role) => (
                            <SelectItem key={role.id} value={role.name}>
                            {role.name}
                            </SelectItem>
                        ))}
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </div>
            </CardHeader>
        </Card>
    </div>
  )
}

export default SelectClass