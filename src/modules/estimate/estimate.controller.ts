import { Body, Controller, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';

import { CreateEstimate, DetailProduct } from './data-access/dtos/estimate-request.dto';
import { EstimateService } from './data-access/estimate.service';

@ApiTags('Estimates')
@Controller('estimates')
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) { }

  @HttpPost('', { isPublic: true })
  createEstimate(@Body() body: CreateEstimate) {
    return this.estimateService.createEstimate(body);
  }

  @HttpPost('/product', { guard: EUserRole.USER })
  detailProduct(@Body() body: DetailProduct, @Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.estimateService.getDetailProduct(body, userId);
  }
}
