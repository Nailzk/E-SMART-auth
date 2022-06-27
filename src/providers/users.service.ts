import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudRequest, GetManyDefaultResponse } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "../entities";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) repo) {
        super(repo);
    }

    getMany(req: CrudRequest): Promise<User[] | GetManyDefaultResponse<User>> {
        console.log(req);
        
        return super.getMany(req);
    }
}
