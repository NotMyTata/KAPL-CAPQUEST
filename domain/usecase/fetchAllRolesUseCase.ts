import { Role } from "../entities/role";
import { roleRepository } from "../repositories/roleRepository";

export async function fetchAllRolesUseCase(roleRepo: roleRepository): Promise<Role[]> {
    return await roleRepo.fetchAll();
}