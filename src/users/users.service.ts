import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(data: any) {
        return await this.usersRepository.save(data)
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // findOne(id: number): Promise<User> {
    //     return this.usersRepository.findOne(id);
    // }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

}
