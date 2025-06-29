export interface addQuestDTO{
    name: string,
    difficulty: "A" | "B" | "C"| "D" | "E",
    roleIds: number[],
    description?: string,
    poster_id: number
}