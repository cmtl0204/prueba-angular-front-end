import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginHttpService} from '../services/login-http.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(private loginHttpService: LoginHttpService,
              private formBuilder: FormBuilder,
              public alertController: AlertController,
              private router: Router) {
    this.credentials = this.newCredentialsForm;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.credentials.value);
    if (this.credentials.valid) {
      this.login();
    } else {
      this.credentials.markAllAsTouched();
    }
  }

  login() {
    this.loginHttpService.login(this.credentials.value).subscribe(
      token => {
        this.loginHttpService.token = token;
        this.success();
        this.router.navigateByUrl('tabs');
      },
      error => {
        this.error();
      }
    );
  }

  get newCredentialsForm(): FormGroup {
    return this.formBuilder.group({
      username: ['admin@example.com', [Validators.required]],
      password: ['1234', [Validators.required]]
    })
  }

  async success() {
    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: 'Bienvenido',
      message: 'Ingreso Correcto',
      buttons: ['OK']
    });

    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: 'Error',
      message: 'Acceso Incorrecto',
      buttons: ['OK']
    });

    await alert.present();
  }
}
