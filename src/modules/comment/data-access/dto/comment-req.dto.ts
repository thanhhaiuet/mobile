import { Exclude } from 'class-transformer';

import { DtoString } from '@shared/decorators/dto.decorator';

@Exclude()
export class addCommentREqDto {
	@DtoString({ expose: true })
	url: string;

	@DtoString({ expose: true, optional: true })
	id: string;

	@DtoString({ expose: true, maxLength: 60 })
	content: string;
}
