import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { map } from 'rxjs/operators';

import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
	loading = false;
    submitted = false;
	errorMessage = "";
  constructor(private formBuilder: FormBuilder,
	private apiService: ApiService) { }

  ngOnInit() {
	  this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
		
        // get return url from route parameters or default to '/'
       // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
	// stop here if form is invalid
	if (this.loginForm.invalid) {
		this.submitted = true;
		return;
	}else {
		this.loading = true;
		this.submitted = true;
		this.apiService.login(this.f.username.value, this.f.password.value);
	}
  }

}
