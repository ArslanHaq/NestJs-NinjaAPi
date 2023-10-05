import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // We're registering the JwtModule as global to make things easier for us. This means that we don't need to import the JwtModule anywhere else in our application.
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  // Enable authentication globally
  // If the vast majority of your endpoints should be protected by default, you can register the authentication guard as a global guard
  // instead of using @UseGuards() decorator on top of each controller
  // you could simply flag which routes should be public.
  // With this in place, Nest will automatically bind AuthGuard to all endpoints.
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
