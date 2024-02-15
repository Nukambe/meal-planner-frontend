import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  async proxy(req: Request) {
    return await this.mpFetch(req);
  }

  private extractRequest(req: Request) {
    const { method, headers, url, body } = req;
    const auth = headers['mp-authorization'];

    const backend = this.configService.get('BACKEND_URL');

    return {
      method: method.toLowerCase(),
      url: backend + url.replace('/api', ''),
      auth,
      body,
    };
  }

  private async mpFetch(req: Request) {
    const { method, url, auth, body } = this.extractRequest(req);
    const headers = { 'mp-authorization': auth };

    console.log('url', url);

    const request: Observable<AxiosResponse<any, any>> = this.http[method](
      url,
      body,
      { headers },
    );

    const response = await firstValueFrom(
      request.pipe(
        map((res: AxiosResponse<any, any>) => res.data),
        catchError((err) => {
          console.log('err', err);
          return of(err);
        }),
      ),
    );

    return response;
  }
}
