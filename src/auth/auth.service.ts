/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from '../members/entities/member.entity';
import { Librarian } from 'src/librarians/entities/librarian.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Member) private memberModel: typeof Member,
    @InjectModel(Librarian) private librarianModel: typeof Librarian,
    private readonly jwtService: JwtService,
  ) {}

  async loginMember(dto: LoginDto) {
    const member = await this.memberModel.findOne({ where: { email: dto.email } });
    if (!member || !(await bcrypt.compare(dto.password, member.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: { id: number; email: string; role: string } = { 
      id: member.id, 
      email: member.email, 
      role: 'member' 
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async loginLibrarian(dto: LoginDto) {
    const librarian = await this.librarianModel.findOne({ where: { email: dto.email } });
    if (!librarian || !(await bcrypt.compare(dto.password, librarian.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (librarian.role !== 'librarian') {
      throw new UnauthorizedException('You are not authorized to login as a librarian');
    }

    const payload: { id: number; email: string; role: string } = { 
      id: librarian.id as number, 
      email: librarian.email, 
      role: 'librarian' 
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async registerMember(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const member = await this.memberModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    } as CreationAttributes<Member>);
    return member;
  }

  async registerLibrarian(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const librarian = await this.librarianModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: 'librarian',
    } as CreationAttributes<Librarian>);
    return librarian;
  }
}
