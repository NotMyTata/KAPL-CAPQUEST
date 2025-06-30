import { addQuestDTO } from "@/domain/dto/addQuestDTO";
import { questRepository } from "@/domain/repository/questRepository";
import { roleRepository } from "@/domain/repository/roleRepository";

export async function addQuestUseCase(questRepo: questRepository, roleRepo: roleRepository, dto: addQuestDTO) {
        let description = dto.description ?? "";
        let roleIds = dto.roleIds;

        const uniqueRoleIds = Array.from(new Set(roleIds));

        if (uniqueRoleIds.length !== dto.roleIds.length) {
            throw new Error("Duplicate roleIds found");
        }

        for (const roleId of uniqueRoleIds) {
            let existingRole;
            try {
                existingRole = await roleRepo.findById(roleId);
            } catch (error) {
                throw error;
            }
            if (!existingRole) throw new Error(`Role with ID ${roleId} doesn't exist`);
        }

        return await questRepo.add({
            name: dto.name,
            description: description,
            difficulty: dto.difficulty,
            roleIds: uniqueRoleIds,
            poster_id: dto.poster_id,
        });
}