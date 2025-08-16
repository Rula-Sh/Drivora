import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './features/customer/pages/home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen/index';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CloudinaryModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Drivora';

  img!: CloudinaryImage;

  ngOnInit() {
    // Create a Cloudinary instance and set your cloud name. (cloudName value to your cloud name (found on the Cloudinary Console Dashboard)
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dnoxelx9f',
      },
    });
  }
}
