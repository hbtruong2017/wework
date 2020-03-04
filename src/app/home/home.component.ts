import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  maleForm: FormGroup;
  link: string;
  hasLink: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    window.sessionStorage.clear();

    // Check if there are any query params
    let encodedLink = ''
    if (this.route.snapshot.queryParams['link']) {
      this.hasLink = true;
      this.route.queryParams.subscribe(params => {
        encodedLink = params['link']
      })
      console.log(encodedLink)
      this.link = atob(encodedLink)
      console.log(this.link)
      window.sessionStorage.setItem("friendInfo", this.link)
    } 
      
    // Initialize new form
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
    this.hasLink ? this.router.navigate(["../result"]) : this.router.navigate(["../link"]) 
  }
}
