import { Exclude } from 'class-transformer';

import { DtoDatetime, DtoProp, DtoString } from '@shared/decorators/dto.decorator';

class sourceNew {
	@DtoString({ expose: true })
	id: string;

	@DtoString({ expose: true })
	name: string;
}

@Exclude()
export class saveNewDraftReqDto {
	@DtoString({ expose: true, maxLength: 50 })
	url: string;

	@DtoString({ expose: true, maxLength: 50 })
	author: string;

	@DtoString({ expose: true, maxLength: 252 })
	title: string;

	@DtoString({ expose: true, maxLength: 512 })
	description: string;

	@DtoString({ expose: true, maxLength: 1500 })
	content: string;

	@DtoProp(true, { type: sourceNew })
	source: sourceNew;

	@DtoString({ expose: true, maxLength: 50 })
	urlToImage: string;

	@DtoDatetime({ expose: true, optional: true })
	publishedAt: Date;
}
