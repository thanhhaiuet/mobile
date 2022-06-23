import { Exclude, Transform } from 'class-transformer';

import { DtoDatetime } from '@shared/decorators/dto.decorator';
import { formatDate } from '@shared/utils/time.utils';

@Exclude()
export class SaveTimeReqDto {
	@DtoDatetime({ expose: true })
	// @Transform(({ value }) => formatDate(value, 'DD-MM-YYYY hh:mm:ss'))
	timeStart: Date;
}
