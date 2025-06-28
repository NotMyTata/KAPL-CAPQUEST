import { addQuestDTO } from "@/domain/dto/addQuestDTO";
import { Quest } from "@/domain/entities/quest";
import { questRepository } from "@/domain/repositories/questRepository";

export default async function addQuestUseCase(
    questRepository: questRepository, 
    dto: addQuestDTO) {
        let name = dto.name;
        let description = dto.description ?? "";
        let difficulty = dto.difficulty;
        let poster_id = dto.poster_id;

        const data = new Quest(name, description, difficulty, true, false, poster_id);
        await questRepository.add(data);
}