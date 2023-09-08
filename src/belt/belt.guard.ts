import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // validate request

    const { belt } = request.body;
    if (!belt) {
      // Throw a custom error message when 'belt' is falsy
      throw new HttpException(
        'Belt is missing or invalid.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true; // Return true if the 'belt' is valid
  }
}
