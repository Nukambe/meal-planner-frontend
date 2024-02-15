import 'dotenv/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serveIndex() {
    return 'Hello World!';
  }
}
