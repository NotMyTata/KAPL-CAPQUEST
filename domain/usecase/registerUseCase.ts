import { loginDTO } from "@/domain/dto/loginDTO";
import { authRepository } from "@/domain/repository/authRepository";

export async function registerUseCase(
    dto : loginDTO,
    authRepo : authRepository
){
    const user = await authRepo.register(dto.email, dto.password)
    return user
}