import { Body, Controller, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';

import { CommentService } from './data-access/comment.service';
import { addCommentREqDto } from './data-access/dto/comment-req.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@HttpGet('', { guard: EUserRole.USER })
	getComment(@Req() req) {
		const userId = (req.user as IJwtPayload).userId;

		return this.commentService.getComment(userId);
	}

	@HttpPost('', { guard: EUserRole.USER })
	addComment(@Body() body: addCommentREqDto, @Req() req) {
    console.log(1231231231);
    
		const userId = (req.user as IJwtPayload).userId;

		return this.commentService.saveComment(userId, body);
	}
}
