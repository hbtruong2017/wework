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

  countDown(date: any) {

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let countDown = date.getTime(),
      x = setInterval(function () {

        let now = new Date().getTime(),
          distance = countDown - now;

        document.getElementById('days').innerText = Math.floor(distance / (day)) + "",
          document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)) + "",
          document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)) + "",
          document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second) + "";

        //do something later when date is reached
        //if (distance < 0) {
        //  clearInterval(x);
        //  'IT'S MY BIRTHDAY!;
        //}

      }, second)
  }
}
