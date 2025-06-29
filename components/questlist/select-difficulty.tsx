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

const difficulty = [
    {
        name: 'A',
        difficulty_id: 1,
    },
    {
        name: 'B',
        difficulty_id: 2,
    },
    {
        name: 'C',
        difficulty_id: 3,
    },
    {
        name: 'D',
        difficulty_id: 4,
    },
    {
        name: 'E',
        difficulty_id: 5,
    },
    {
        name: 'F',
        difficulty_id: 6,
    },
]

interface Props {
    selectedValue: string
    onChange: (value: string) => void
}

function SelectDifficulty({selectedValue, onChange}: Props) {
  return (
    <div>
         <Card>
            <CardHeader>
                <div>
                    <CardTitle className='text-center text-xl'>
                        Difficulty
                    </CardTitle>
                    <CardDescription className='text-center text-xl'>
                        Sort By Difficulty:
                    </CardDescription>
                </div>
                <div className='justify-center flex'>
                     <Select value={selectedValue} onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort By Difficulty" />
                    </SelectTrigger>
                    <SelectContent className='font-serif'>
                        <SelectGroup>
                        <SelectLabel>Difficulty</SelectLabel>
                         {difficulty.map((diff) => (
                            <SelectItem key={diff.difficulty_id} value={diff.name}>
                            {diff.name}
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

export default SelectDifficulty