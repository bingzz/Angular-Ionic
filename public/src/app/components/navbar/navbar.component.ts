import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Nav } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  activePage: string;
  userName: string = '';
  loadingDuration = 2000;

  navigation: Nav[] = [
    {
      navigate: 'listening',
      name: 'play-circle',
      title: 'Listen Now'
    },
    {
      navigate: 'radio',
      name: 'radio',
      title: 'Radio'
    },
    {
      navigate: 'library',
      name: 'library',
      title: 'Library'
    },
    {
      navigate: 'search',
      name: 'search',
      title: 'Search'
    },
  ];

  constructor (private router: Router, private userService: UserService) {
    this.activePage = router.url.split('/').pop() ?? '';

    this.userService.user$.subscribe((user) => {
      this.userName = user.username || 'N/A';
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.split('/').pop())
    ).subscribe(currentPath => {
      this.activePage = currentPath ?? '';
    });
  }

  navigateToPage(url: string) {
    if (!url) return;

    this.activePage = url;
    this.router.navigate([`/home/${url}`]);
  }

  setCurrentPage(path: string): string {
    return path === this.activePage ? 'primary' : '';
  }

  logout() {
    this.userService.logout();
  }
}
