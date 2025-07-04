import { Quest } from "@/domain/entity/quest";
import { createClient } from "../server";
import { questRepository } from "@/domain/repository/questRepository";
import { QuestApplicant } from "@/domain/entity/questApplicant";
import { QuestRoles } from "@/domain/entity/questRoles";
import { addQuestDTO } from "@/domain/dto/addQuestDTO";

export class SupabaseQuestRepository implements questRepository {
    async findById(id: number): Promise<Quest | null> {
        const supabase = await createClient();
        const { data: quest, error } = await supabase
            .rpc("get_quest", { questid: id });

        if (error) throw new Error(error.message);
        if (!quest) return null;

        return quest;
    }
    async fetchQuestList(): Promise<Quest[]> {
        const supabase = await createClient();
        const { data: questList, error } = await supabase
            .rpc("get_all_quests_with_applicants_and_roles");

        if (error) throw new Error(error.message);
        if (!questList) return [];

        return questList;
    }
    async fetchActiveQuestList(freelancerId: number): Promise<Quest[]> {
        const supabase = await createClient();
        const { data: activeQuestList, error } = await supabase
            .rpc("get_active_quests_with_applicants_and_roles", { freelancerid: freelancerId });

        if (error) throw new Error(error.message);
        if (!activeQuestList) return [];
        
        return activeQuestList;
    }
    async fetchMyQuestList(posterId: number): Promise<Quest[]> {
        const supabase = await createClient();
        const { data: myQuestList, error } = await supabase
            .rpc("get_my_quests_with_applicants_and_roles", { posterid: posterId });

        if (error) throw new Error(error.message);
        if (!myQuestList) return [];

        return myQuestList;
    }
    async fetchAllQuests(): Promise<Quest[]>{
        const supabase = await createClient();
        const { data: quests, error } = await supabase
            .from("quests")
            .select("*");

        if (error) throw new Error(error.message);
        if (!quests) return [];

        return quests;
    }
    async fetchActiveQuestsByUserId(userId: number): Promise<Quest[]> {
        const supabase = await createClient();
        const { data: quests, error } = await supabase
            .from("quests")
            .select("*")
            .eq("freelancer_id", userId)

        if (error) throw new Error(error.message);
        if (!quests) return [];

        return quests;
    }
    async fetchQuestsByUserId(userId: number): Promise<Quest[]> {
        const supabase = await createClient();
        const { data: quests, error } = await supabase
            .from("quests")
            .select("*")
            .eq("poster_id", userId)

        if (error) throw new Error(error.message);
        if (!quests) return [];

        return quests;
    }
    async fetchQuestApplicant(questId: number, freelancerId: number): Promise<QuestApplicant | null> {
        const supabase = await createClient();
        const { data: questApplicant, error } = await supabase
            .from("quest_applicants")
            .select("*")
            .eq("quest_id", questId)
            .eq("freelancer_id", freelancerId)
            .maybeSingle();

        if (error) throw new Error(error.message);
        if (!questApplicant) return null;

        return questApplicant;
    }
    async fetchQuestApplicants(questId: number): Promise<any[]> {
        const supabase = await createClient();
        const { data: questApplicants, error } = await supabase
            .from("quest_applicants")
            .select("user (*)")
            .eq("quest_id", questId)

        if (error) throw new Error(error.message);
        if (!questApplicants) return [];

        return questApplicants.map(applicant => applicant.user);
    }
    async add(data: addQuestDTO): Promise<Quest | null> {
        const supabase = await createClient();
        const { data: newQuest, error: errorQuest } = await supabase
            .from("quests")
            .insert({
                name: data.name,
                description: data.description,
                difficulty: data.difficulty,
                is_available: true,
                is_finished: false,
                poster_id: data.poster_id
            })
            .select()
            .single();

        if (errorQuest) throw new Error(errorQuest.message);

        const questRoles: Omit<QuestRoles, "id">[] = data.roleIds.map(roleId => ({
            quest_id: newQuest.id,
            role_id: roleId,
        }));

        const { error: errorRoles } = await supabase
            .from("quest_roles")
            .insert(questRoles)

        if (errorRoles) throw new Error(errorRoles.message);
        if (!newQuest) return null;

        return newQuest;
    }
    async apply(questId: number, freelancerId: number): Promise<QuestApplicant | null> {
        const supabase = await createClient();
        const { data: questApplicant, error } = await supabase
            .from("quest_applicants")
            .insert({
                quest_id: questId,
                freelancer_id: freelancerId
            })
            .select()
            .single()

        if (error) throw new Error(error.message);
        if (!questApplicant) return null;

        return questApplicant;
    }
    async accept(questId: number, freelancerId: number): Promise<Quest | null> {
        const supabase = await createClient();
        const { data: quest, error: errorUpdate } = await supabase
            .from("quests")
            .update({
                freelancer_id: freelancerId,
                is_available: false
            })
            .eq("id", questId)
            .select()
            .single();

        if (errorUpdate) throw new Error(errorUpdate.message);

        const { error: errorDelete } = await supabase
            .from("quest_applicants")
            .delete()
            .eq("quest_id", questId);

        if (errorDelete) throw new Error(errorDelete.message);
        if (!quest) return null;

        return quest;
    }
    async finish(questId: number): Promise<Quest | null> {
        const supabase = await createClient();
        const { data: quest, error } = await supabase
            .from("quests")
            .update({
                is_finished: true
            })
            .eq("id", questId)
            .select()
            .single()
        
        if (error) throw new Error(error.message);
        if (!quest) return null;

        return {
            ...quest,
            freelancer: {
                id: quest.freelancer_id
            }
        };
    }
}