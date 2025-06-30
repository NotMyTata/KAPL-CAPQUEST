import { loginDTO } from "@/domain/dto/loginDTO";
import { authRepository } from "@/domain/repository/authRepository";

export async function loginUseCase(
    dto: loginDTO,
    authRepo : authRepository
){
    const user = await authRepo.login(dto.email, dto.password)
    return user
}