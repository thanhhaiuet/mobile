import { Exclude } from 'class-transformer';

import { DtoNumber, DtoString } from '@shared/decorators/dto.decorator';

@Exclude()
export class saveDonationReqDto {
	@DtoString({ expose: true })
	method: string;

	@DtoNumber({ expose: true })
	upVotes: number;

	@DtoNumber({ expose: true })
	amount: number;
}

@Exclude()
export class deleteDonationReqDto {
	@DtoString({ expose: true, optional: true })
	id: string;
}
