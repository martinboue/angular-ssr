import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabMenuModule, ProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  loadingSub!: Subscription; 
  loading: boolean = false;

  // Nav bar menu links
  menus: MenuItem[] = [
    { label: "Client-Side Rendering (CSR)", routerLink: "csr" },
    { label: "Server-Side Rendering (SSR)", routerLink: "ssr" },
    { label: "Static-Site Generation (SSG)", routerLink: "ssg" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to all routing events to display a loading overlay while fetching data using resolvers.
    this.loadingSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
