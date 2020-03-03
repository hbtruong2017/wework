import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
/**
 * The home component to show home page after log in
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pendingLoanList: any;
  myName: string;
  myBalance: any;
  myAccountNo: any;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.myName = window.sessionStorage.name;
    this.myBalance = window.sessionStorage.balance;
    this.myAccountNo = window.sessionStorage.accountID;

    this.dataService.getAllPendingLoans().subscribe((data:any) => {
      console.log(data)
      this.pendingLoanList = data.allLoans.reverse();
      console.log(this.pendingLoanList)
    }, error => {
      console.log(error)
    })
  }

/**
 * Function to redirect to loan detail page
 */
  goToLoan(id: number) {
    this.router.navigate(['/loan'], { queryParams: { id: id } })
  }

  /**
 * Function to redirect to tBank
 */
  gotoTbank() {
    window.location.href = "http://tbankonline.com/SMUtBank_RIB2/#/login?redirect=%2F";
  }
}
