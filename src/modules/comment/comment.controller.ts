import { Body, Controller, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';

import { CommentService } from './data-access/comment.service';
import { addCommentREqDto, getListCommentReqDto } from './data-access/dto/comment-req.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@HttpPost('get', { guard: EUserRole.USER })
	getComment(@Body() body: getListCommentReqDto) {
		return this.commentService.getComment(body.url);
	}

	@HttpPost('/', { guard: EUserRole.USER })
	addComment(@Body() body: addCommentREqDto, @Req() req) {
		const userId = (req.user as IJwtPayload).userId;

		return this.commentService.saveComment(userId, body);
	}

	@HttpGet('', { guard: EUserRole.USER })
	listComment(@Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.commentService.listComment(userId);
	}
}
