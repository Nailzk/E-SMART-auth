import * as bcrypt from "bcrypt";
import { Role, User } from "entities";
import { RolesEnum } from "enum";
import { getRepository, MigrationInterface } from "typeorm";


export class Seeds1656264614607 implements MigrationInterface {
    public async up(): Promise<User[]> {
        const rolesRepo = getRepository(Role);
        const usersRepo = getRepository(User);

        await rolesRepo.save([
            {
                name: RolesEnum.ADMIN,
            },
            {
                name: RolesEnum.USER,
            },
        ]);

        const userPassword = await bcrypt.hash("TestPass123$$", 10);
        const adminPassword = await bcrypt.hash("AdminPass123$$", 10);

        return await usersRepo.save([
            {
                userName: "admin",
                roleId: 1,
                email: "admin@platform.com",
                password: adminPassword,
            },
            {
                userName: "testuser",
                roleId: 2,
                email: "testuser@platform.com",
                password: userPassword,
            },
        ]);
    }

    public async down(): Promise<void> {
        return;
    }
}
