import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { SignUpInService } from '../../services/sign-up-in.service';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {

  user_name: string = "";
  user_id: string = "";
  private destroy$ = new Subject<void>();

  constructor(private signUpInService: SignUpInService) {
  }

  onSignOut(){
    this.signUpInService.sign_out(this.user_id)
    .subscribe(data=>{
      if (data.status == "success") {
        this.signUpInService.logged_in.next(false);
      }
    })
  }

  
  ngOnInit(): void {
    this.signUpInService.get_user_data()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{
        this.user_id = data.user_id;
        this.user_name = data.user_name;
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
