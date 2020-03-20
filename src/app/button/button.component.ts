import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  maleInformation: any;
  friendInformation: any;
  link: string;
  hasLink: boolean = false;
  
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
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
  }

}
