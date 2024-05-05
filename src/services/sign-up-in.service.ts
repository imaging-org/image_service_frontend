import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface SignUpResponse {
  status: string
}

export interface SignInResponse {
  login: string,
  user_id: string,
  user_name: string
}

export interface UserData {
  user_id: string,
  user_name: string
}

@Injectable({
  providedIn: 'root'
})
export class SignUpInService {

  constructor(private http: HttpClient) { }

  private user_data = new BehaviorSubject<UserData>({
    user_id: "",
    user_name: ""
  });
  public logged_in = new BehaviorSubject<boolean>(false);

  get_user_data(): Observable<UserData>{
    return this.user_data.asObservable();
  }

  set_user_data(user_data: UserData){
    this.user_data.next(user_data);
  }

  sign_up(username: string, password: string): Observable<SignUpResponse>{
    const sign_up_url = `${environment.BACKEND_URL}/${environment.SIGN_UP_ENDPOINT}`
    const body = {
      "user_name": username,
      "password": password
    }
    return this.http.post<SignUpResponse>(
      sign_up_url,
      body
    )
  }

  sign_in(username: string, password: string): Observable<SignInResponse>{
    const sign_in_url = `${environment.BACKEND_URL}/${environment.SIGN_IN_ENDPOINT}`
    const body = {
      "user_name": username,
      "password": password
    }
    return this.http.post<SignInResponse>(
      sign_in_url,
      body
    )
  }

  sign_out(user_id: string): Observable<SignUpResponse>{
    const sign_out_url = `${environment.BACKEND_URL}/${environment.SIGN_OUT_ENDPOINT}/${user_id}`
    return this.http.get<SignUpResponse>(
      sign_out_url
    )
  }

}
