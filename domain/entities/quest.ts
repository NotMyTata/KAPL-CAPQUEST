export class Quest {
    name: string;
    description: string;
    difficulty: "A" | "B" | "C"| "D" | "E";
    is_available: boolean;
    is_finished: boolean;
    poster_id: number;
    freelancer_id: number | null;
    id?: number;

    constructor(
        name: string, description: string = "", difficulty: "A" | "B" | "C"| "D" | "E", is_available: boolean = true, 
        is_finished: boolean = false, poster_id: number, freelancer_id?: number){
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.is_available = is_available;
        this.is_finished = is_finished;
        this.poster_id = poster_id;
        this.freelancer_id = freelancer_id == undefined? null : freelancer_id;
    }
}