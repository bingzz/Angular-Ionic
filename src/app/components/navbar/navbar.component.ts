import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  activePage: string

  constructor(private router: Router) {
    this.activePage = router.url.split('/').pop() ?? ''
  }

  navigateToPage(url: string) {
    if (!url) return

    this.activePage = url
    this.router.navigate([`/home/${url}`])
  }

  setCurrentPage(path: string): string {
    return path === this.activePage ? 'primary' : ''
  }

  logout() {
    // Clear cache
    this.router.navigate(['/'])
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.split('/').pop())
    ).subscribe(currentPath => {
      this.activePage = currentPath ?? ''
    })
  }
}
