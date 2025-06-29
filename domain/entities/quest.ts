import { Profile } from "./profile";

export interface Quest {
    id?: number;
    name: string;
    description: string;
    difficulty: "A" | "B" | "C"| "D" | "E";
    is_available: boolean;
    is_finished: boolean;
    applicants: Profile[];
    poster: Profile;
    freelancer?: Profile;
}