import {Component, ElementRef, ViewChild} from '@angular/core';
import {StudentHttpService} from '../services/student-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, IonDatetime} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  studentForm: FormGroup;
  registeredAtModal: boolean = false;
  birthdateModal: boolean = false;

  constructor(private studentHttpService: StudentHttpService,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {
    this.studentForm = this.newStudentForm;
  }

  get newStudentForm(): FormGroup {
    return this.formBuilder.group({
        name: [null, [Validators.required]],
        birthdate: [null, [Validators.required]],
        fatherName: [null, [Validators.required]],
        motherName: [null, [Validators.required]],
        level: [null, [Validators.required]],
        section: [null, [Validators.required]],
        registeredAt: [null, [Validators.required]],
      }
    )
  }

  onSubmit() {
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      this.createStudent();
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  createStudent() {
    this.studentHttpService.createStudent(this.studentForm.value).subscribe(
      student => {
        this.presentAlert();
      }
    )
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  confirmModalRegisteredAt() {
    this.registeredAtModal = false;
  }

  confirmModalBirthdate() {
    this.birthdateModal = false;
  }

  get nameField() {
    return this.studentForm.controls['name'];
  }

  get birthdateField() {
    return this.studentForm.controls['birthdate'];
  }

  get fatherNameField() {
    return this.studentForm.controls['fatherName'];
  }

  get motherNameField() {
    return this.studentForm.controls['motherName'];
  }

  get levelField() {
    return this.studentForm.controls['level'];
  }

  get sectionField() {
    return this.studentForm.controls['section'];
  }

  get registeredAtField() {
    return this.studentForm.controls['registeredAt'];
  }
}
