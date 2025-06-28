import { Quest } from "@/domain/entities/quest";
import { createClient } from "../client";
import { questRepository } from "@/domain/repositories/questRepository";

const supabase = createClient();

export default class SupabaseQuestRepository implements questRepository {
    async findById(id: number): Promise<Quest | null> {
        try {
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
    async add(quest: Quest): Promise<void> {
        try {
            const { error } = await supabase
                .from("quests")
                .insert(quest);

            if (error) throw error;
        } catch (error) {
            console.error("Error while adding new quest: ", error);
        }
    }
    async fetchAllQuests(): Promise<Quest[]>{
        try {
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
    async apply(questId: number, userId: number): Promise<void> {
        try {

        } catch (error) {
            console.error(error);
        }
    }
    async accept(questId: number, userId: number): Promise<void> {
        try {

        } catch (error) {
            console.error(error);
        }
    }
    async finish(questId: number, userId: number): Promise<void> {
        try {

        } catch (error) {
            console.error(error);
        }
    }

}