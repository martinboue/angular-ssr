import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article-list/article/article.component';
import { ArticleService } from './services/article.service';
import { inject } from '@angular/core';
import { Article } from './models/article.model';
import { Observable } from 'rxjs';

const articleResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> => {
    const articleService = inject(ArticleService);
    return articleService.getArticle(route.params["id"]);
}

export const routes: Routes = [
    { 
        path: '',   
        redirectTo: '/csr', 
        pathMatch: 'full' 
    },
    // CSR
    { 
        path: 'csr', 
        component: ArticleListComponent, 
        title: "CSR - Client-Side Rendering"
    },
    {
        path: 'csr/:id',
        title: 'CSR - Client-Side Rendering',
        component: ArticleComponent,
        resolve: {
            article: articleResolver
        }
    },
    // SSR
    { 
        path: 'ssr', 
        component: ArticleListComponent, 
        title: "SSR - Server-Side Rendering"
    },
    {
        path: 'ssr/:id',
        title: 'SSR - Server-Side Rendering',
        component: ArticleComponent,
        resolve: {
            article: articleResolver
        }
    },
    // SSG
    { 
        path: 'ssg', 
        component: ArticleListComponent, 
        title: 'SSG - Static Site Generation',
    },
    {
        path: 'ssg/:id',
        title: 'SSG - Static Site Generation',
        component: ArticleComponent,
        resolve: {
            article: articleResolver
        }
    }
];
