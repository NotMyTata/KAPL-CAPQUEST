import { Quest } from "../entities/quest";

export interface questRepository {
    findById(id: number): Promise<Quest | null>;
    fetchAllQuests(): Promise<Quest[]>;
    fetchActiveQuestsByUserId(userId: number): Promise<Quest[]>;
    fetchQuestsByUserId(userId: number): Promise<Quest[]>;
    add(quest: Quest): Promise<void>;
    apply(questId: number, userId: number) : Promise<void>;
    accept(questId: number, userId: number) : Promise<void>;
    finish(questId: number, userId: number) : Promise<void>;
}