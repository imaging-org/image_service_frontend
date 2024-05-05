import { Component } from '@angular/core';
import { GalleryInputComponent } from '../gallery-input/gallery-input.component';
import { ImageContainerComponent } from '../image-container/image-container.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    GalleryInputComponent,
    ImageContainerComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
