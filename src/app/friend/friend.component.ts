import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Unsplash from 'unsplash-js';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  link: string;
  eventName: string;
  eventPhoto: string;
  eventAddress: string;
  eventDate: string;
  eventTime: string;
  eventEndTime: string;

  othersLink: string;

  maleInformation: any;
  friendInformation: any;


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {

    this.othersLink = window.location.host + "/home";

    let maleInfo = JSON.parse(window.sessionStorage.getItem("maleInfo"));
    let friendInfo = JSON.parse(window.sessionStorage.getItem("friendInfo"));
    this.maleInformation = maleInfo;
    this.friendInformation = friendInfo;

    // https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    // DateRangesOverlap = max(start1, start2) < min(end1, end2)
    const months = ["JANUARY", "FEBRUARY", "MARCH","APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    let startTiming = this.getMaxDate(this.returnDateFormat(maleInfo.date1, maleInfo.hour1)[0],
      this.returnDateFormat(friendInfo.date1, friendInfo.hour1)[0])

    console.log(startTiming)

    let endTiming = this.getMinDate(this.returnDateFormat(maleInfo.date1, maleInfo.hour1)[1],
      this.returnDateFormat(friendInfo.date1, friendInfo.hour1)[1])

    this.callAPI(maleInfo.preferences)
    this.randomAddressGenerator(maleInfo.preferences)

    this.eventDate = startTiming.getDate() + " " + months[startTiming.getMonth()] + " " + startTiming.getFullYear();
    this.eventTime = startTiming.getHours() + ":00"
    this.eventEndTime = (startTiming.getHours() + 2) + ":00"
    this.eventName = "Bunavi Mondo " + maleInfo.preferences[0].toUpperCase() + maleInfo.preferences.slice(1) + " event";

    this.countDown(startTiming);

  }

  returnDateFormat(date: string, time: string) {
    // Return in format Date(year, month, day, hours, minutes)

    let dateArray: any = date.split("/");
    let timeArray: any = time.split("-");

    let arr = [];
    arr.push(new Date(dateArray[2], dateArray[1], dateArray[0], timeArray[0].split(":")[0], timeArray[0].split(":")[1]))
    arr.push(new Date(dateArray[2], dateArray[1], dateArray[0], timeArray[1].split(":")[0], timeArray[1].split(":")[1]))

    return arr
  }

  getMaxDate(date1: string, date2: string) {
    let maxDates = []
    maxDates.push(date1)
    maxDates.push(date2)
    let maxTiming = new Date(Math.max.apply(null, maxDates));
    console.log(maxTiming)
    return maxTiming
  }

  getMinDate(date1: string, date2: string) {
    let minDates = []
    minDates.push(date1)
    minDates.push(date2)
    let minTiming = new Date(Math.min.apply(null, minDates));
    console.log(minTiming)
    return minTiming
  }

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

  randomAddressGenerator(keyword: string) {
    this.httpClient.get("https://developers.onemap.sg/commonapi/search?searchVal=" + keyword + "&returnGeom=N&getAddrDetails=Y&pageNum=1").subscribe((data: any) => {
      console.log(data)
      this.eventAddress = data.results[4]["ADDRESS"]
    })

  }

}

