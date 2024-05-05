import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export interface PresignedResponse {
  presigned_url: string
}

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent implements OnInit {

  imageUrl: string = '';
  downloadedImage: any;

  constructor(private http: HttpClient) { 
    this.downloadImage();
  }

  ngOnInit(): void {
    // this.downloadImage()
  }

  downloadImage(){
    const presigned_url_fetch_endpoint = "http://localhost:9191/get_presigned_url"
    let body = {
      // "object_name": "temp_image_098e6242-f64a-46e0-ada5-6e2b8db4eb91.png"
      "object_name": "images.png"
    }

    this.http.post<PresignedResponse>(
      presigned_url_fetch_endpoint,
      body
    )
    .subscribe(data=>{
      this.http.get(data.presigned_url, { responseType: 'blob' })
      .subscribe(blob => {
        this.downloadedImage = blob;
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onloadend = () => {
          this.imageUrl = reader.result?.toString() || '';

        };
      });
    })

    // const MINIO_URL = "http://localhost:9000";
    // const MINIO_BUCKET = "test-bucket";
    // const IMAGE_NAME = "temp_image_098e6242-f64a-46e0-ada5-6e2b8db4eb91.png";  // Adjust filename
    // const url = `${MINIO_URL}/${MINIO_BUCKET}/${IMAGE_NAME}`;

    
  }

}
