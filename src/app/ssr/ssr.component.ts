import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Article, ArticleStatus } from '../models/article.model';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';



@Component({
  selector: 'app-ssr',
  standalone: true,
  imports: [TableModule, TagModule, ChipModule],
  templateUrl: './ssr.component.html',
  styleUrl: './ssr.component.scss'
})
export class SsrComponent implements OnInit {

  articles: Article[] = []

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.articles.push({
        id: i,
        title: "My First Article",
        description: "My first article description",
        tags: ["AI", "Gen AI", "LLM"],
        author: "Martin Boué",
        publicationDate: "2023-12-01",
        lastUpdateDate: "2023-12-13",
        status: ArticleStatus.published,
      })
    } 
  }
  

}
