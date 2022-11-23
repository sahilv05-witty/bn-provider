import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

/**
 * Serialize decorator can be used with either controller class or method to convert the entity data received from service to the Dto format
 * @param dto: Dto
 * @returns The converted DTO data
 */
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * Serialize intercerceptor helps to converts the entities to the Dto format.
 */
class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data: any) => {
        const result = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });

        return result;
      }),
    );
  }
}
