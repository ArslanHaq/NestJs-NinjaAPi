import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, password: string): Promise<any> {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        bcrypt.compare(password, hash, function (err, result) {
          console.log(result);
        });
      });
    });

    const user: CreateUserDto = await this.usersService.findOne(username);
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password: _, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
