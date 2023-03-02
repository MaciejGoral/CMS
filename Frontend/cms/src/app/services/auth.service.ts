import { Injectable } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment  } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<any>(`${environment.api}/dj-rest-auth/login/`, { username, password });
  }
  verifyToken(){
    const headers = new HttpHeaders({
      "Authorization": `Token ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.api}/verify/token/`, {headers,observe: 'response'});
  }
}

