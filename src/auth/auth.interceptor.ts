import {
  Injectable,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

@Injectable()
export class AuthInterceptor extends ClassSerializerInterceptor {
  serialize(response: any, options: ClassTransformOptions) {
    const rawDataJSON = JSON.stringify(response);
    return super.serialize(JSON.parse(rawDataJSON), options);
  }
}
