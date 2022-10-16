import { Body, Controller, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';
import { ListProduct } from '@modules/product/data-access/dtos/product-request.dto';

import { HttpDelete, HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

import { CreateEstimate, DetailProduct, GetListProductEstimated } from './data-access/dtos/estimate-request.dto';
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

  @HttpPost('delete/:id', { isPublic: true })
  async deleteEstimate(@Param() param: BaseParamDto) {
    await this.estimateService.deleteRecord(param?.id);
  }

  @HttpGet('/list/:id', { guard: EUserRole.USER })
  getListEstimateOfProduct(@Param() param: BaseParamDto, @Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.estimateService.getListEstimateOfProduct(param.id, userId);
  }

  @HttpGet('/get-list-product-estimated', { guard: EUserRole.USER })
  async getListProductEstimated(@Query() query: GetListProductEstimated, @Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.estimateService.getListProductEstimated(userId, query);
  }

  @HttpGet('statistical/product-receive')
  statisticalProductReceive(@Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.estimateService.statisticalReceive(userId);
  }

  @HttpPost('accept-estimate', { isPublic: true })
  acceptEstimate(@Body() body: { estimateId: string }) {
    return this.estimateService.acceptEstimate(body.estimateId)
  }
}
