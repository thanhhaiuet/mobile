import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HttpDelete, HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

import { DonationService } from './donation.service';
import { deleteDonationReqDto, saveDonationReqDto } from './req.dto';

@ApiTags('Donation')
@Controller('donation')
export class DonationController {
	constructor(private readonly donationService: DonationService) {}

	@HttpGet('', { isPublic: true })
	getAllDonation() {
		return this.donationService.getAllDonation();
	}

	@HttpPost('', { isPublic: true })
	saveDonation(@Body() body: saveDonationReqDto) {
		console.log(body);

		return this.donationService.saveDonation(body);
	}

	@HttpDelete(':id', { isPublic: true })
	deleteOne(@Param() param: BaseParamDto) {
		return this.donationService.deleteOne(param.id);
	}

	@HttpDelete('', { isPublic: true })
	delete() {
		return this.donationService.delete();
	}
}
