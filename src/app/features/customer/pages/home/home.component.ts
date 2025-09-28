import {
  Component,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarModelStats } from '../../../../shared/models/carModelStats';
import { CarService } from '../../../../core/services/car.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Added this to implement Swiper in the project
})
export class HomeComponent {
  intervalId: any;

  trendingModels: CarModelStats[] = [];
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.slider();
    this.showCarModels('audi');
    this.showTrendingCars();
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

  showCarModels(carbrand: string) {
    let slides = document
      .getElementById('our-cars')
      ?.getElementsByTagName(
        'swiper-container'
      ) as HTMLCollectionOf<HTMLElement>;

    if (!slides) return;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].id != 'brands')
        if (slides[i].id == carbrand) {
          slides[i].style.display = 'block';
        } else {
          slides[i].style.display = 'none';
        }
    }
  }

  showTrendingCars() {
    this.carService.getTop5TrendingModels().subscribe({
      next: (models) => {
        this.trendingModels = models;
        console.log('Fetched Trending Models: ', models);
      },
      error: (err) => {
        console.error('Error fetching Trending Models: ', err);
      },
    });
  }
}
