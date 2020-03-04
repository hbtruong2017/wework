import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  link: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let encodedLink = ''
    this.route.queryParams.subscribe(params => {
      encodedLink = params['link']
    })
    console.log(encodedLink)
    this.link = atob(encodedLink)
    console.log(this.link)
  }

}
