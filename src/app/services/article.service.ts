import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Article } from '../models/article.model';

// We use a mock server which serve pre-generated static JSON responses.
const BASE_PATH = "https://657cd291853beeefdb9a03df.mockapi.io";

// We use a delay to simulate computing time.
const DELAY = 1000; // ms

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /** Get list of all articles */
  public getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${BASE_PATH}/api/articles`).pipe(delay(DELAY));
  }
  
  /** Get an article with its ID */
  public getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${BASE_PATH}/api/articles/${id}`).pipe(delay(DELAY));
  }

}
