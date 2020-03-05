import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Unsplash from 'unsplash-js';

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
  callAPI(keyword: string) {
    let unsplash = new Unsplash({ accessKey: "gtQitnFbwx0e36pya3jZUcE3uGbFUaOVAGey5a7IgVs" });

    unsplash.search.photos(keyword, 1, 4).then((response: any) => {
      return response.json();
    }).then((data: any) => {
      console.log(data)
      this.eventPhoto = data.results[0].urls.full;
      console.log(this.eventPhoto)
    })
  }

}
