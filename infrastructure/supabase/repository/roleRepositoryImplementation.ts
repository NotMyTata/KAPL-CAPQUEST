import { Role } from "@/domain/entities/role";
import { roleRepository } from "@/domain/repositories/roleRepository";
import { createClient } from "../server";

export class SupabaseRoleRepository implements roleRepository{
    async findById(id: number): Promise<Role | null> {
        const supabase = await createClient();
            const { data: role, error } = await supabase
                .from("roles")
                .select("*")
                .eq("id", id)
                .maybeSingle();

            if (error) throw new Error(error.message);
            if (!role) return null;
            
            return role;
    }
    async fetchAll(): Promise<Role[]> {
        const supabase = await createClient();
        const { data: roles, error } = await supabase
            .from("roles")
            .select("*")

        if (error) throw new Error(error.message);
        if (!roles) return [];

        return roles;
    }
}