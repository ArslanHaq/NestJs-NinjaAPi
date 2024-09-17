import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { comparePasswords, hashPassword } from '../../shared';
import { JwtService } from '@nestjs/jwt';
import { saltRounds } from '../../shared';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    console.log('env', this.configService.get('JWT_SECRET'));

    // TODO: Convert Plain Password to hash before store to backend
    const hash = await hashPassword(password, saltRounds);
    console.log('hash = ', hash);

    // TODO: Compare Plain Password with hash from backend before login
    const compareResult = await comparePasswords(password, hash);
    console.log('compare result = ', compareResult);

    const user: CreateUserDto = await this.usersService.findOne(username);
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Note: we choose a property name of sub to hold our userId value to be consistent with JWT standards.
    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
