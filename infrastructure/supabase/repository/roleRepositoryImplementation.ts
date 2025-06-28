import { Role } from "@/domain/entities/role";
import { roleRepository } from "@/domain/repositories/roleRepository";
import { createClient } from "../server";

export class SupabaseRoleRepository implements roleRepository{
    async findById(id: number): Promise<Role | null> {
        try {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from("roles")
                .select("*")
                .eq("id", id)
                .maybeSingle();

            if (error) throw error;
            
            return data as Role;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}