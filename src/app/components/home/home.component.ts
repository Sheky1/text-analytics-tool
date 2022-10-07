import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tokenForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.tokenForm = this.formBuilder.group({
      token: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  placeToken() {
    this.tokenService.placeToken(this.tokenForm.get('token')?.value);
  }

  tokenAvailable(): boolean {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return this.tokenService.getToken();
  }
}
