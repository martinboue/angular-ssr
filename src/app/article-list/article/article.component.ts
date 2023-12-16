import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Article } from '../../models/article.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  article!: Article;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    console.log(`Init ArticleComponent from platform=${this.platformId} and URL=${this.router.url}`);
    
    // Article was fetch with resolver and is accessible from route data.
    this.article = this.route.snapshot.data['article'];
  }

}
