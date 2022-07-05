import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { Repository } from "typeorm";
import { HASH_SALT, USER_DEFAULT_ROLE_ID } from "../constant";
import { LoginDTO, RegisterDto } from "../dto";
import { Role, User } from "../entities";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly _usersRepo: Repository<User>,
        @InjectRepository(Role) private readonly _rolesRepo: Repository<Role>,
        private readonly _jwtService: JwtService
    ) {}

    public async register(dto: RegisterDto): Promise<boolean> {
        const hashedPassword = await this._hashPassword(dto.password);

        await this._usersRepo.save({
            ...dto,
            password: hashedPassword,
            roleId: USER_DEFAULT_ROLE_ID,
        });

        return true;
    }

    public async login(
        dto: LoginDTO,
        res: Response
    ): Promise<{ [key: string]: string }> {
        const user = await this._getUser(dto);
        const role = await this._getRole(user.roleId);

        this._handleSignCookies(user, res, role);
        await this._comparePassword(dto, user);

        return { msg: "success" };
    }

    private async _hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, HASH_SALT);
    }

    private _createToken(user: User, role: Role) {
        return this._jwtService.sign({ id: user.id, role: role.name });
    }

    private async _comparePassword(dto: LoginDTO, user: User) {
        const isCompared = await bcrypt.compare(dto.password, user.password);

        if (!isCompared) {
            throw new BadRequestException("Wrong password");
        }
    }

    private _handleSignCookies(user: User, res: Response, role: Role): void {
        const token = this._createToken(user, role);

        res.cookie("jwt_token", token);
    }

    private async _getUser(dto: LoginDTO): Promise<User> {
        const user = await this._usersRepo.findOne({
            userName: dto.userName,
        });

        if (!user) {
            throw new BadRequestException("User not Fount");
        }

        return user;
    }

    private async _getRole(id: number): Promise<Role> {
        return this._rolesRepo.findOneOrFail({ id });
    }
}
