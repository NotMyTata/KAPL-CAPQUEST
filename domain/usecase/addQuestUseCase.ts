import { addQuestDTO } from "@/domain/dto/addQuestDTO";
import { questRepository } from "@/domain/repositories/questRepository";
import { roleRepository } from "@/domain/repositories/roleRepository";

export async function addQuestUseCase(questRepo: questRepository, roleRepo: roleRepository, dto: addQuestDTO) {
        let description = dto.description ?? "";
        let roleIds = dto.roleIds;

        const uniqueRoleIds = Array.from(new Set(roleIds));

        if (uniqueRoleIds.length !== dto.roleIds.length) {
            throw new Error("Duplicate roleIds found");
        }

        for (const roleId of uniqueRoleIds) {
            const existingRole = await roleRepo.findById(roleId);
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