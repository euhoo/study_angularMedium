import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PopularTagType } from '../../../types/popularTag.type';
import { map } from 'rxjs/operators';
import { GetPopularTagsResponceInterface } from '../types/getPopularTagsResponceInterface';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}
  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';
    return this.http
      .get<GetPopularTagsResponceInterface>(url)
      .pipe(map((response) => response.tags));
  }
}
