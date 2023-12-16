import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  menus: MenuItem[] = [
    { label: "Client-Side Rendering (CSR)", routerLink: "csr" },
    { label: "Server-Side Rendering (SSR)", routerLink: "ssr" },
    { label: "Static-Site Generation (SSG)", routerLink: "ssg" },
  ]
}
