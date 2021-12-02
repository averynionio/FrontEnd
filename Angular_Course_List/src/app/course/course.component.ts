import { Component, OnInit } from '@angular/core';
import { Model, Course } from "./model";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
  constructor() {
  }
  
  ngOnInit(): void {
  }

  model = new Model();

  getCollege() {
    return this.model.college;
  }

  getCourses() {
    return this.model.courses; 
  }

  addCourse(newCourse) {
    if (newCourse != "") {
		  this.model.courses.push(new Course(newCourse, true));
		}
  }

}
