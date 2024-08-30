import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Post('/')
  postAuth(@Body() authDto: AuthDto){
    return this.authService.postAuth(authDto);
  }

}