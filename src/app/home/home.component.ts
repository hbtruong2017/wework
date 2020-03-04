import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  maleForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.maleForm = this.formBuilder.group({
      name: [''],
      age: [''],
      time: [''],
      preferences: [''],
      occasion: ['']
    })
  }

  getMaleInfo() {
    let maleInfo = {
      name: this.maleForm.get("name").value,
      age: this.maleForm.get("age").value,
      time: this.maleForm.get("time").value,
      preferences: this.maleForm.get("preferences").value,
      occasion: this.maleForm.get("occasion").value
    }
    console.log(maleInfo)
    window.sessionStorage.setItem("maleInfo", JSON.stringify(maleInfo))
    this.router.navigate(["../link"])
  }
}
