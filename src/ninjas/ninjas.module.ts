import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [NinjasController],
  providers: [
    NinjasService,
    //   Add auth guard global in ninjas module
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
})
export class NinjasModule {}
