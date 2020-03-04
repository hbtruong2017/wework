import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  currentURL: string;

  constructor(private router: Router) { }

  ngOnInit() {

    // Get passed down information

    let maleInfo = window.sessionStorage.getItem("maleInfo");
    console.log(maleInfo)
    console.log(typeof maleInfo)
    let encodedString = btoa(maleInfo);
    this.currentURL = window.location.host + "/home?link=" + encodedString;
    console.log(this.currentURL)
  }


}
