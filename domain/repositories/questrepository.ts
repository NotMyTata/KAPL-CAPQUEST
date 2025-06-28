import { Quest } from "../entities/quest";
import { QuestApplicant } from "../entities/questApplicant";

export interface questRepository {
    findById(id: number): Promise<Quest | null>;
    fetchAllQuests(): Promise<Quest[]>;
    fetchActiveQuestsByUserId(userId: number): Promise<Quest[]>;
    fetchQuestsByUserId(userId: number): Promise<Quest[]>;
    fetchQuestApplicant(questId: number, freelancerId: number): Promise<QuestApplicant | null>
    add(quest: Quest, roleIds: number[]): Promise<void>;
    apply(questId: number, freelancerId: number) : Promise<void>;
    accept(questId: number, freelancerId: number) : Promise<void>;
    finish(questId: number) : Promise<void>;
}