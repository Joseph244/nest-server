import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import { ApiErrorCode } from '../enums/api-error-code.enum';

// 验证id参数是否可以转换为int型，否则抛出异常
@Injectable()
export class IdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    value = parseInt(value);

    if (isNaN(value) || typeof value !== 'number' || value <= 0) {
      throw new ApiException(
        '参数ID无效',
        ApiErrorCode.USER_ID_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
