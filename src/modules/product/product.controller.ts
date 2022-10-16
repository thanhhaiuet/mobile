import { Body, Controller, Param, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';

import { multerOptions } from '@config/multer.config';

import { EStatusProduct, EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

import { CreateProductDto, ListProduct, ListProductProfileCreated } from './data-access/dtos/product-request.dto';
import { ProductService } from './data-access/product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @HttpPost('')
  async createProduct(@Body() body: CreateProductDto) {
    await this.productService.createProduct(body);
  }

  @HttpPost('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file) {
    return { url: file?.filename };
  }

  @HttpGet('', { isPublic: true })
  async getProducts(@Query() query: ListProduct) {
    return this.productService.getProducts(query);
  }

  @HttpGet('/get-list-product-created', { guard: EUserRole.USER })
  async getListProductCreated(@Query() query: ListProductProfileCreated, @Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.productService.getListProductCreated(userId, query);
  }

  @HttpGet('/statistical', { guard: EUserRole.USER })
  statisticalProductCreated(@Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.productService.statisticalProductCreated(userId);
  }

  @HttpGet('/:id', { isPublic: true })
  async getDetailProduct(@Param() param: BaseParamDto) {
    return this.productService.getDetailProduct(param.id);
  }

  @HttpPost('update-status', { isPublic: true })
  updateStatus(@Body() body: { status: EStatusProduct; productId: string }) {
    return this.productService.updateStatus(body.status, body.productId);
  }
}
