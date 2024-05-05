import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { SignUpInService, UserData } from '../../services/sign-up-in.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private signUpInService: SignUpInService, private router: Router) {

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      reEnterPassword: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  
  onSubmit() {
    if (this.signUpForm.controls["password"].value != this.signUpForm.controls["reEnterPassword"].value) {
      this.signUpForm.controls["reEnterPassword"].setErrors({
        'error': "Passwords not matching"
      })
      this.errorMessage = "Passwords not matching";
    }

    if (this.signUpForm.valid) {
      this.signUpInService.sign_up(this.signUpForm.value["username"], this.signUpForm.value["password"])
      .subscribe(data=>{
        if (data.status == "success") {
          this.signUpInService.sign_in(this.signUpForm.value["username"], this.signUpForm.value["password"])
          .subscribe(data_sign_in=>{
            if (data_sign_in.login == "success"){
              const userData: UserData = {
                user_id: data_sign_in.user_id,
                user_name: data_sign_in.user_name
              }
              this.signUpInService.set_user_data(userData);
              this.signUpInService.logged_in.next(true);
              this.router.navigateByUrl("/gallery");
            }
          })
        }
      })
    }
  }
}
