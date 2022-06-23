import { Body, Controller, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpDelete, HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

import { deleteNewDraftReqDto, saveNewDraftReqDto } from './data-access/dto/new-draft-req.dto';
import { NewDraftService } from './data-access/new-draft.service';

@ApiTags('NewDraft')
@Controller('new-draft')
export class NewDraftController {
	constructor(private readonly newDraftService: NewDraftService) {}

	@HttpPost('', { guard: EUserRole.USER })
	saveDraft(@Body() body: saveNewDraftReqDto, @Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.newDraftService.saveNewDraft(userId, body);
	}

	@HttpGet('', { guard: EUserRole.USER })
	getNewDraft(@Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.newDraftService.getNewDraft(userId);
	}

	@HttpPost('detail', { guard: EUserRole.USER })
	getDetailDraft(@Body() body: deleteNewDraftReqDto, @Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.newDraftService.getDetailDraft(userId, body.url);
	}

	@HttpDelete('', { guard: EUserRole.USER })
	delete(@Body() body: deleteNewDraftReqDto, @Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.newDraftService.delete(body.url, userId);
	}
}
