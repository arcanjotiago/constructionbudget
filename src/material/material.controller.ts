import { Controller, Get, Header, Headers, Patch, Post, Put } from '@nestjs/common';
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

  @Post('create')
  createMaterial(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.createMaterial(tokenAuthorization, createMaterialDto);
  }

  @Delete(':id')
  deleteMaterial(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: string) {
    return this.materialService.deleteMaterial(tokenAuthorization, id);
  }

  @Put(':id')
  updateMaterial(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: any, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.updateMaterial(tokenAuthorization, id, updateMaterialDto);
  }

}
