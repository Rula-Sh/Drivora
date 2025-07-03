import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  toggleSidebar(show: boolean) {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    if (show) {
      sidebar.classList.add('visible');
    } else {
      sidebar.classList.remove('visible');
    }
  }
}
