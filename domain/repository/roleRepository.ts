import { Role } from "../entity/role";

export interface roleRepository {
    findById(id: number): Promise<Role | null>;
    fetchAll(): Promise<Role[]>;
}