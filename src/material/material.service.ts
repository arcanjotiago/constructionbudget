import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @Inject('MATERIAL_REPOSITORY')
    private materialRepository: Repository<Material>,
    private authService: AuthService,
  ) {}

  async getMaterial(access_token:any): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.materialRepository.find(); 
    }

    return tokenValidate;
  }

  async getMaterialId(access_token:any, id: any): Promise<Material> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.materialRepository.findOneBy({ id });
    }
    return tokenValidate;
  }

  async createMaterial(access_token:any, createMaterialDto: CreateMaterialDto): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const material: Material = new Material();
      material.name = createMaterialDto.name;
      material.description = createMaterialDto.description;
      material.value = createMaterialDto.value;
      material.quantity = createMaterialDto.quantity;
      
      return this.materialRepository.save(material);    
    }
    
    return tokenValidate;
  }

  async deleteMaterial(access_token:any, id: string): Promise<{ affected?: number }> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.materialRepository.delete(id);
    }
    return tokenValidate; 
  }
  
  async updateMaterial(access_token:any, id: any, updateMaterialDto: UpdateMaterialDto): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const material: Material = new Material();
      material.name = updateMaterialDto.name;
      material.description = updateMaterialDto.description;
      material.value = updateMaterialDto.value;
      material.quantity = updateMaterialDto.quantity;
      return this.materialRepository.update(id, material)
    }
    return tokenValidate; 
  }

  async getMaterialName(access_token:any, name: any): Promise<any> { //criar rota
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.materialRepository.findOneBy({ id });
    }
    return tokenValidate;
  }
    
  //   const checkEmailDuplicate = await this.userRepository.findOneBy( {email} );

  //   if(checkEmailDuplicate != null){
  //     if (checkEmailDuplicate.email == email){
  //       return {
  //         "message": "The email informed has used!, please! send the new email on requisition!",
  //         "status": 401
  //       }
  //     }
  //   }
  //   return {
  //     "message": "The send email not exist in database!",
  //     "status": 200
  //   }   
  // }