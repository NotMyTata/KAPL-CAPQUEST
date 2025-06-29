export interface addQuestDTO{
    name: string,
    difficulty: "A" | "B" | "C"| "D" | "E" | "F",
    roleIds: number[],
    description?: string,
    poster_id: number
}