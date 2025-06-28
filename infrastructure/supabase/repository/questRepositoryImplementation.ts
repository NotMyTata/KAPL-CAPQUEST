import { Quest } from "@/domain/entities/quest";
import { createClient } from "../server";
import { questRepository } from "@/domain/repositories/questRepository";
import { QuestApplicant } from "@/domain/entities/questApplicant";
import { QuestRoles } from "@/domain/entities/questRoles";

export class SupabaseQuestRepository implements questRepository {
    async findById(id: number): Promise<Quest | null> {
        try {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from("quests")
                .select("*")
                .eq("id", id)
                .maybeSingle();

            if (error) throw error;

            if (!data) return null;

            return data as Quest;
        } catch (error) {
            console.error("Error while finding quest by id: ", error);
            return null;
        }
    }
    async fetchAllQuests(): Promise<Quest[]>{
        try {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from("quests")
                .select("*");

            if (error) throw error;
            
            return data;
        } catch (error){
            console.error("Error while fetching all quests: ", error);
            return [];
        }
    }
    async fetchActiveQuestsByUserId(userId: number): Promise<Quest[]> {
        try {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from("quests")
                .select("*")
                .eq("freelancer_id", userId)

            if (error) throw error;

            return data;
        } catch (error){
            console.error("Error while fetching active quests by user id: ", error);
            return [];
        }
    }
    async fetchQuestsByUserId(userId: number): Promise<Quest[]> {
        try {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from("quests")
                .select("*")
                .eq("poster_id", userId)

            if (error) throw error;

            return data as Quest[];
        } catch (error){
            console.error("Error while fetching quests by user id: ", error);
            return [];
        }
    }
    async fetchQuestApplicant(questId: number, freelancerId: number): Promise<QuestApplicant | null> {
        try {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from("quest_applicants")
                .select("*")
                .eq("quest_id", questId)
                .eq("freelancer_id", freelancerId)
                .maybeSingle();

            if (error) throw error;

            return data as QuestApplicant;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async add(quest: Quest, roleIds: number[]): Promise<void> {
        try {
            const supabase = await createClient();
            const { data: newQuest, error: errorQuest } = await supabase
                .from("quests")
                .insert(quest)
                .select()
                .single();

            if (errorQuest) throw errorQuest;

            console.log(roleIds);

            const questRoles: Omit<QuestRoles, "id">[] = roleIds.map(roleId => ({
                quest_id: newQuest.id,
                roles_id: roleId,
            }));

            const { error: errorRoles } = await supabase
                .from("quest_roles")
                .insert(questRoles)

            if (errorRoles) throw errorRoles;
        } catch (error) {
            console.error("Error while adding new quest: ", error);
        }
    }
    async apply(questId: number, freelancerId: number): Promise<void> {
        try {
            const supabase = await createClient();
            const { error } = await supabase
                .from("quest_applicants")
                .insert({
                    quest_id: questId,
                    freelancer_id: freelancerId
                })

            if (error) throw error;
        } catch (error) {
            console.error("Error while applying to quest: ", error);
        }
    }
    async accept(questId: number, freelancerId: number): Promise<void> {
        try {
            const supabase = await createClient();
            const { error: errorUpdate } = await supabase
                .from("quests")
                .update({
                    freelancer_id: freelancerId,
                    is_available: false
                })
                .eq("id", questId);

            if (errorUpdate) throw errorUpdate;

            const { error: errorDelete } = await supabase
                .from("quest_applicants")
                .delete()
                .eq("quest_id", questId);

            if (errorDelete) throw errorDelete;
        } catch (error) {
            console.error("Error while accepting: ", error);
        }
    }
    async finish(questId: number): Promise<void> {
        try {
            const supabase = await createClient();
            const { error } = await supabase
                .from("quests")
                .update({
                    is_finished: true
                })
                .eq("id", questId);
            
            if (error) throw error;
        } catch (error) {
            console.error(error);
        }
    }

}