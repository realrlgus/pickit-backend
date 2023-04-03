import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequestException } from 'src/exception/custom-bad-request.exception';
import { PasswordUtil } from 'src/utils/password.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async isExistUser(value: string, type: keyof CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { [type]: value },
    });
    return !!user;
  }

  async findAllUser() {
    const userData = await this.userRepository.find();
    return {
      data: userData,
    };
  }

  async findOneUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  async createOneUser(createUserDto: CreateUserDto) {
    const { username, email, name, nickname, password } = createUserDto;
    if (await this.isExistUser(username, 'username')) {
      throw new CustomBadRequestException('중복된 사용자명입니다.');
    }
    if (await this.isExistUser(email, 'email')) {
      throw new CustomBadRequestException('중복된 이메일입니다.');
    }
    if (await this.isExistUser(name, 'name')) {
      throw new CustomBadRequestException('중복된 이름입니다.');
    }
    if (await this.isExistUser(nickname, 'nickname')) {
      throw new CustomBadRequestException('중복된 닉네임입니다.');
    }

    const newPassword = await PasswordUtil.hashPassword(password);

    const createUserData = await this.userRepository.save({
      ...createUserDto,
      password: newPassword,
    });

    return {
      data: createUserData,
    };
  }
  async updateOneUser(id: number, updateUserDto: UpdateUserDto) {
    const { name, nickname, password } = updateUserDto;

    if (await this.isExistUser(name, 'name')) {
      throw new CustomBadRequestException('중복된 이름입니다.');
    }
    if (await this.isExistUser(nickname, 'nickname')) {
      throw new CustomBadRequestException('중복된 닉네임입니다.');
    }

    const newPassword = password
      ? await PasswordUtil.hashPassword(password)
      : password;

    await this.userRepository.update(id, {
      ...(name && { name }),
      ...(nickname && { nickname }),
      ...(password && { password: newPassword }),
    });

    const updateUserData = await this.userRepository.findOne({ where: { id } });

    return {
      data: updateUserData,
    };
  }
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
