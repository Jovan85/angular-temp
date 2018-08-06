import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData: any = {};
  errors: any[] = [];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.formData = {};
  }

  register() {
    this.authService.register(this.formData)
      .subscribe(() => {
        this.router.navigate(['/login', {registered: 'success'}]);
      }, (err) => {
        this.errors = err.error.errors;
      });
  }
}
