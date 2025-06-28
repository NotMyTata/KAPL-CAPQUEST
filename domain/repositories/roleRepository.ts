import { Role } from "../entities/role";

export interface roleRepository {
    findById(id: number): Promise<Role | null>;
}