import { Body, Controller, Param, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { multerOptions } from '@config/multer.config';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

import { CreateProductDto, ListProduct } from './data-access/dtos/product-request.dto';
import { ProductService } from './data-access/product.service';
import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';
import { EUserRole } from '@constants/api.constants';

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
  async getListProductCreated(@Param() param: ListProduct, @Req() req) {
    const userId = (req.user as IJwtPayload).userId;
    return this.productService.getListProductCreated(userId, param);
  }

  @HttpGet('/:id', { isPublic: true })
  async getDetailProduct(@Param() param: BaseParamDto) {
    return this.productService.getDetailProduct(param.id);
  }
}
