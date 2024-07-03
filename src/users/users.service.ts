import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, name, password, phone } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      name,
      password: hashedPassword,
      phone,
    });
    return this.entityManager.save(user);
  }

  findAll() {
    return this.userRepository.find({});
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExist = await this.userRepository.findOne({ where: { id } });
    if (!userExist) {
      throw new NotFoundException();
    }
    const updUser = Object.assign(userExist, updateUserDto);
    return this.entityManager.save(updUser);
  }

  async remove(id: number) {
    const userExist = await this.userRepository.findOne({ where: { id } });
    if (!userExist) {
      throw new NotFoundException();
    }
    userExist.isActive = false;
    return this.entityManager.save(userExist);
  }

  async validate(email: string, password: string) {
    const userexist = await this.userRepository.findOne({
      where: {
        email,
        isActive: true,
      },
      select: {
        password: true,
        id: true,
        name: true,
      },
    });
    if (!userexist) {
      throw new BadRequestException('User with this email doesnt exists');
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userexist.password,
      );
      if (!isPasswordCorrect) {
        throw new BadRequestException('Invalid creadentials');
      }
      console.log(isPasswordCorrect);

      return {
        id: userexist.id,
        name: userexist.name,
      };
    }
  }
}
