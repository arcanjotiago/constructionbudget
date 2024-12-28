import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): any {
    return {
      "message":'OK!',
      "status": 200
    }
  }
}
