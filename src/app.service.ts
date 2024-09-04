import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): any {
    return {
      "message":'Aplication it`s working!',
      "status": 200
    }
  }
}
