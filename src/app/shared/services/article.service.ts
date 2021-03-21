import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ArticleInterface } from '../types/article.interface';
import { GetArticleResponseInterface } from '../types/getArticleResponse.interface';

@Injectable()
export class SharedArticleService {
  constructor(private http: HttpClient) {}
  getArticle(slug: string): Observable<ArticleInterface> {
    const url = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .get<GetArticleResponseInterface>(url)
      .pipe(map((response) => response.article));
  }
}
