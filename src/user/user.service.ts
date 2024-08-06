import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async getUser(access_token:any): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.userRepository.find(); 
    }
    return tokenValidate;
  }

  async getUserId(access_token:any, id: any): Promise<User> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      return this.userRepository.findOneBy({ id });
    }
    return tokenValidate;
    }

  async getUserEmail(email: any): Promise<any> {
    const checkEmailDuplicate = await this.userRepository.findOneBy( {email} );

    if(checkEmailDuplicate != null){
      if (checkEmailDuplicate.email == email){
        return {
          "message": "The email informed has used!, please! send the new email on requisition!",
          "status": 401
        }
      }
    }
    return {
      "message": "The send email not exist in database!",
      "status": 200
    }   
  }
    
  async createUser(createUserDto: CreateUserDto): Promise<User> {

      const validateMail = await this.getUserEmail(createUserDto.email);
      if(validateMail.status == 401){
        return validateMail;
      };
      
      const user: User = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      return this.userRepository.save(user);

    // return tokenValidate;
  }

  async deleteUser(access_token:any, id: string, responseReq): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const response:any = await this.userRepository.delete(id);

      if (response.affected == 1){
        return {
          "message": `The user was removed successfully!`,
          "status": 200
        }
      };

      if (response.affected == 0){
        responseReq.status(404);
        return {
          "message": 'Error! The user was not removed. Please, check the userId',
          "status": 404
        }
      };
    }
    return tokenValidate; 
  }
  
  async updateUser(access_token:any, id: any, updateUserDto: UpdateUserDto, responseReq): Promise<any> {
    const tokenValidate:any = await this.authService.checkAccessToken(access_token);
    
    if (tokenValidate.status == 200){
      const user: User = new User();
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
      user.access_token = updateUserDto.access_token;
      const response:any = await this.userRepository.update(id, user)

      if (response.affected == 1){
        return {
          "message": `The user was updated successfully!`,
          "status": 200
        }
      };

      if (response.affected == 0){
        responseReq.status(304);
        return {
          "message": 'Error! The user was not updated!',
          "status": 304
        }
      };
    }
    return tokenValidate; 
  }


}