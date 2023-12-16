import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

const BASE_PATH = "https://657cd291853beeefdb9a03df.mockapi.io";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public getArticles(): Observable<Article[]> {
    console.log("Fetching GET '/api/articles' from", this.platformId);
    return this.httpClient.get<Article[]>(`${BASE_PATH}/api/articles`);
  }
  
  public getArticle(id: string): Observable<Article> {
    console.log(`Fetching '/api/articles/${id}' from`, this.platformId);
    return this.httpClient.get<Article>(`${BASE_PATH}/api/articles/${id}`);
  }

}
