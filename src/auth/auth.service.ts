import { BadRequestException, Inject, Injectable, Put } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async postAuth(authDto: AuthDto): Promise<any> {
    let emailDatabase;
    let passwordDatabase;
    let userDatabase;

    try{
      userDatabase = await this.userRepository.findOneBy({email: authDto.email}); 
      emailDatabase = userDatabase.email;
      passwordDatabase = userDatabase.password;
    } catch(error){
       
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Error when check your email in database. Please, check your email is correct!' })
    }
  
    if(emailDatabase === authDto.email && passwordDatabase === authDto.password){
      const genTokenLogin:any = uuidv4();
    
      const auth: Auth = new Auth();
      auth.access_token = genTokenLogin;
      auth.validity = (Date.now());
      auth.user_id = userDatabase.id;
      this.authRepository.save(auth);

      let user: User = new User();
      user = userDatabase;
      user.access_token = genTokenLogin;
      this.userRepository.update({id:user.id}, {access_token:user.access_token});

      return {
        "message":"Login sucessfull!",
        "statusCode": 201,
        "access_token":user.access_token,
        "expires_at":"24 Hrs"
      }
    }
    
    return {"message": "Your credentials is incorect. Please try again!", "statusCode": 401}
  }

  async checkAccessToken(access_token:any): Promise<any>{  
    
    if(typeof(access_token) != "string"){
      return {
        "message":"Acess not authorized! please, send a valid access token in header requisition!",
        "status":401
      }
    }

    const findTokenDatabase:any = await this.authRepository.findOneBy( {access_token} );

    if(findTokenDatabase != null){
      const calcTokenValidate = ((Date.now() - findTokenDatabase.validity) / 1000);
      
      if(calcTokenValidate > 86400){
        return {
          "message":"Acess not authorized! Access token expired!",
          "status":401,
        }
      }
      return {
        "message":"Access granted ",
        "status":200
      }
    }
    
    return {
      "message":"Acess not authorized! Token not find!",
      "status":401,
    }
  }
}