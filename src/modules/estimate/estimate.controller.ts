import { Body, Controller, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpDelete, HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

import { CreateEstimate, DetailProduct } from './data-access/dtos/estimate-request.dto';
import { EstimateService } from './data-access/estimate.service';
import { ListProduct } from '@modules/product/data-access/dtos/product-request.dto';

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
  async getListProductEstimated(@Param() param: ListProduct, @Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.estimateService.getListProductEstimated(userId, param);
  }
}
