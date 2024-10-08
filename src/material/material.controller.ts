import { Controller, Get, Headers, Post, Put, Res} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {
  constructor(
    private readonly materialService:MaterialService
  ) {}

  @Get('/')
  getMaterial(@Headers('tokenAuthorization') tokenAuthorization:any):any {
    return this.materialService.getMaterial(tokenAuthorization);  
  }
  
  @Get(':id')
  getMaterialId(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id:any) {
    return this.materialService.getMaterialId(tokenAuthorization, id);
  }

  @Post('name')
  getMaterialByName(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() materialName:any) {
    return this.materialService.getMaterialByName(tokenAuthorization, materialName);
  }

  @Post('create')
  createMaterial(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.createMaterial(tokenAuthorization, createMaterialDto);
  }

  @Delete(':id')
  deleteMaterial(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: string, @Res({ passthrough: true }) responseReq) {
    return this.materialService.deleteMaterial(tokenAuthorization, id, responseReq);
  }

  @Put(':id')
  updateMaterial(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: any, @Body() updateMaterialDto: UpdateMaterialDto, @Res({ passthrough: true }) responseReq) {
    return this.materialService.updateMaterial(tokenAuthorization, id, updateMaterialDto, responseReq);
  }

}


