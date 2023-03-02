import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {

   }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((data)=>{
      console.log(data);
      if(data.key){
        this.error = false;
        localStorage.setItem('token', data.key);
        window.location.href = '/admin';
      }},(error)=>{
        this.error = true;
      });
    }




}
