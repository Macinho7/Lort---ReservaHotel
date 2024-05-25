/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  async SuccessSession(Session: any) {

    const testS = Session
    const testU = testS.session_id
    console.log(testS);
    console.log(testU);

  }
}
