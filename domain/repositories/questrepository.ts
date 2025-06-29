import { Quest } from "../entities/quest";
import { QuestApplicant } from "../entities/questApplicant";

export interface questRepository {
    findById(id: number): Promise<Quest | null>;
    fetchAllQuests(): Promise<Quest[]>;
    fetchActiveQuestsByUserId(userId: number): Promise<Quest[]>;
    fetchQuestsByUserId(userId: number): Promise<Quest[]>;
    fetchQuestApplicant(questId: number, freelancerId: number): Promise<QuestApplicant | null>
    fetchQuestApplicants(questId: number): Promise<QuestApplicant[]>
    add(quest: Quest, roleIds: number[]): Promise<Quest | null>;
    apply(questId: number, freelancerId: number) : Promise<QuestApplicant | null>;
    accept(questId: number, freelancerId: number) : Promise<Quest | null>;
    finish(questId: number) : Promise<Quest | null>;
}