import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Article } from '../models/article.model';
import { CardModule } from 'primeng/card';
import { ArticleService } from '../services/article.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CardModule, ButtonModule, ProgressSpinnerModule, RouterLink, NgOptimizedImage],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  loading: boolean = false;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    console.log(`Init ArticleListComponent from platform=${this.platformId} and URL=${this.router.url}`);
    this.loadArticles();
  }
 
  loadArticles() {
    this.loading = true;
    this.articleService.getArticles()
      .pipe(finalize(() => this.loading = false))
      .subscribe(articles => this.articles = articles);
  }

}
