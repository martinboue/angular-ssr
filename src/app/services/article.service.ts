import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Article } from '../models/article.model';

// We use a mock server which serve pre-generated static JSON responses.
const BASE_PATH = "https://8a545a04-e00b-4eb4-a2a5-566b9f784f46.mock.pstmn.io";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /** Get list of all articles */
  public getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${BASE_PATH}/api/articles`);
  }
  
  /** Get an article with its ID */
  public getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${BASE_PATH}/api/articles/${id}`);
  }

}
