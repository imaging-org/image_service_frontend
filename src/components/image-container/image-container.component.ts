import { Component } from '@angular/core';
import { ImageCardComponent } from '../image-card/image-card.component';

@Component({
  selector: 'app-image-container',
  standalone: true,
  imports: [
    ImageCardComponent
  ],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss'
})
export class ImageContainerComponent {

}
