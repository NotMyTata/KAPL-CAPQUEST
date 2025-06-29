import { addQuestDTO } from "@/domain/dto/addQuestDTO";
import { questRepository } from "@/domain/repositories/questRepository";
import { roleRepository } from "@/domain/repositories/roleRepository";

export async function addQuestUseCase(questRepo: questRepository, roleRepo: roleRepository, dto: addQuestDTO) {
        let name = dto.name;
        let description = dto.description ?? "";
        let difficulty = dto.difficulty;
        let poster_id = dto.poster_id;
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
            name: name,
            description: description,
            difficulty: difficulty,
            is_available: true,
            is_finished: false,
            poster_id: poster_id
        }, uniqueRoleIds);
}