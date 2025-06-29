import React from 'react'
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

function SelectClass({selectedValue, onChange}: Props) {
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
                        <SelectValue placeholder="Sort By Class" />
                    </SelectTrigger>
                    <SelectContent className='font-serif'>
                        <SelectGroup>
                        <SelectLabel>Classes</SelectLabel>
                         {roles.map((role) => (
                            <SelectItem key={role.class_id} value={role.name}>
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