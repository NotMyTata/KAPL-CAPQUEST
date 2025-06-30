import { Role } from "@/domain/entity/role";
import { roleRepository } from "@/domain/repository/roleRepository";

export async function fetchAllRolesUseCase(roleRepo: roleRepository): Promise<Role[]> {
    return await roleRepo.fetchAll();
}