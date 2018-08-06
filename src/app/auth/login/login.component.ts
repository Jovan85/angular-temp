import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.notifyMessage = 'You can login now';
      }
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe((token) => {
        this.router.navigate(['/rentals']);
      }, (err) => {
        this.errors = err.error.errors;
      });
  }

}
