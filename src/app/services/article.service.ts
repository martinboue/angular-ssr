import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

const BASE_PATH = "https://657cd291853beeefdb9a03df.mockapi.io";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${BASE_PATH}/api/articles`);
  }
  
  public getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${BASE_PATH}/api/articles/${id}`);
  }

}
