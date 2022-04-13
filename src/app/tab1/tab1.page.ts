import {Component, OnInit} from '@angular/core';
import {StudentHttpService} from '../services/student-http.service';
import {StudentModel} from '../models';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  students: StudentModel[] = [];
  level: FormControl = new FormControl(null);

  constructor(private studentHttpService: StudentHttpService) {
    this.level.valueChanges.subscribe(
      value => {
        this.getStudents(value);
      }
    )
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(level: number = null) {
    this.studentHttpService.getStudents(level).subscribe(
      students => {
        this.students = students;
        console.log(students);
      }
    );
  }
}
