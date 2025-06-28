export interface addQuestDTO{
    name: string,
    difficulty: "A" | "B" | "C"| "D" | "E";
    poster_id: number,
    description?: string
}