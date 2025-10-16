import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.users.findOne({ where: { email: dto.email } });
    if (exists) throw new UnauthorizedException('Email in use');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.users.create({ email: dto.email, passwordHash, role: dto.role ?? 'USER' });
    await this.users.save(user);
    return this.issue(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.issue(user);
  }

  private issue(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwt.sign(payload, { secret: process.env.JWT_SECRET || 'dev_secret_change_me', expiresIn: '2h' });
    return { access_token: token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
