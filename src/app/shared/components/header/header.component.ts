import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggleSidebar(show: boolean) {
    const sidebar = document.querySelector('.sidebar') as HTMLElement; // get sidebar class... 'HTMLElement' is used to avoide the error: 'sidebar' is possibly 'null'
    show
      ? sidebar.classList.add('visible')
      : sidebar.classList.remove('visible');
  }
}
