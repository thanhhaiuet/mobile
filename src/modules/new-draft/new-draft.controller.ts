import { Body, Controller, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';

import { saveNewDraftReqDto } from './data-access/dto/new-draft-req.dto';
import { NewDraftService } from './data-access/new-draft.service';

@ApiTags('NewDraft')
@Controller('new-draft')
export class NewDraftController {
	constructor(private readonly newDraftService: NewDraftService) {}

	@HttpGet('', { guard: EUserRole.USER })
	getNewDraft(@Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.newDraftService.getNewDraft(userId);
	}

	@HttpPost('save-draft', { guard: EUserRole.USER })
	saveDraft(@Body() body: saveNewDraftReqDto, @Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.newDraftService.saveNewDraft(userId, body);
	}
}
