import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "../../entities/users.entity";
import { FindOneOptions, Like, Repository } from "typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import { EditUserDto } from "./dtos/editUser.dto";
import { checkUserExistedExpection } from "../../expections/checkUserExsited.expection";
import { DeleteUserDto } from "./dtos/deleteUser.dto";
import { SearchDto } from "../../common/dtos/search.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(payload): Promise<UserEntity | undefined> {
    // Đảm bảo truyền đúng kiểu FindOptionsWhere hoặc FindOptionsWhere[]
    const user = await this.userRepository.findOne({
      where: payload,  // Ví dụ tìm kiếm theo id
      relations: [ 'listing', 'news']
    });
    
    return user;
  }
  async create(payload: CreateUserDto) {
    const { name, email, password, role, phone_number } = payload;
    const checkUserExisted = await this.getOneUserByEmail(payload.email);
    if (checkUserExisted.data) {
      throw new checkUserExistedExpection();
    } else {
      const newUser = this.userRepository.create({
        name: name,
        email: email,
        password: password,
        role: role,
        phone_number,
        avatar: 'https://static.netpop.app/img/avatar-logout.png',
      });
      return this.userRepository.save(newUser, {
        reload: false,
      });
    }
  }
  async edit(payload: EditUserDto) {
    const { name, email, password, role, phone_number } = payload;
    const checkUser = await this.userRepository.findBy({ email: email });
    const newUser = {
      name: name,
      email: email,
      password: password,
      role: role,
      phone_number
    };
    Object.assign(checkUser[0], newUser);
    return await this.userRepository.save(checkUser[0]); 
  }

  async delete(payload: DeleteUserDto) {
    return await this.userRepository.delete({ id: payload.id });
  }

  async findUser({ search, limit = 10, page = 1 }: SearchDto) {
    let searchOption: any = {role: 'user'};
    if (search) {
      searchOption = [
        { name: Like(`%${search.trim()}%`), role: 'user' },
        { email: Like(`%${search.trim()}%`), role: 'user' },
      ];
    }

    const [data, total] = await this.userRepository.findAndCount({
      where: searchOption,
      order: {
        name: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data,
      total,
      currentPage: page,
      totalPage: Math.ceil(total / limit),
    };
  }

  async getOneUserByEmail(email: string) {
    const data = await this.userRepository.findOne({
      where: { email },
    });
    return {
      data,
    };
  }
}