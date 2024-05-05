import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MainToolBarComponent } from '../components/main-tool-bar/main-tool-bar.component';
import { SignUpInService } from '../services/sign-up-in.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    
    MainToolBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'image_service_frontend';
  signed_in_status = false;

  private destroy$ = new Subject<void>();

  constructor(private signUpInService: SignUpInService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.signUpInService.logged_in
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{
        this.signed_in_status = data
        if (!this.signed_in_status) {
          this.router.navigateByUrl("/signin");
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
