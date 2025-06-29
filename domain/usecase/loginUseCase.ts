import { loginDTO } from "@/domain/dto/loginDTO";
import { authRepository } from "@/domain/repositories/authRepository";

export async function loginUseCase(
    dto: loginDTO,
    authRepo : authRepository
){
    const user = await authRepo.login(dto.email, dto.password)
    return user
}