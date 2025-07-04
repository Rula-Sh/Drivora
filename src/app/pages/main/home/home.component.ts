import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  intervalId: any;

  ngOnInit(): void {
    this.slider();
  }

  slider() {
    const next = document.querySelector('.next') as HTMLElement;
    const prev = document.querySelector('.prev') as HTMLElement;

    const moveNext = () => {
      let items = document.querySelectorAll('.item');
      document.querySelector('.slide')?.appendChild(items[0]);
    };

    const movePrev = () => {
      let items = document.querySelectorAll('.item');
      document.querySelector('.slide')?.prepend(items[items.length - 1]);
    };

    const startAutoSlide = () => {
      this.intervalId = setInterval(() => {
        moveNext();
      }, 5000); // Change slide every 5 seconds
    };

    const resetAutoSlide = () => {
      clearInterval(this.intervalId);
      startAutoSlide();
    };

    next.addEventListener('click', () => {
      moveNext();
      resetAutoSlide();
    });

    prev.addEventListener('click', () => {
      movePrev();
      resetAutoSlide();
    });

    // Start automatic sliding
    startAutoSlide();
  }
}
