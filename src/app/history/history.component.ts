import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * The history component to view user's history activity
 */
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  isBorrower: boolean = true;
  borrowerPendingLoanList: any;
  borrowerActiveLoanList: any;
  borrowerDefaultedLoanList: any;
  borrowerCompleteLoanList: any;
  myName: string;
  myBalance: any;
  myAccountNo: any;
  
  constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.myName = window.sessionStorage.name;
    this.myBalance = window.sessionStorage.balance;
    this.myAccountNo = window.sessionStorage.accountID;

    this.dataService.getBorrowerPendingLoans(5717).subscribe((data:any) => {
      console.log(data);
      this.borrowerPendingLoanList = data.borrowedLoans.reverse();
    }, error => {
      console.log(error)
    })

    this.dataService.getBorrowerActiveLoans(5717).subscribe((data:any) => {
      console.log(data);
      this.borrowerActiveLoanList = data.borrowedLoans.reverse();
    }, error => {
      console.log(error)
    })

      this.dataService.getBorrowerDefaultedLoans(5717).subscribe((data:any) => {
        console.log(data);
        this.borrowerDefaultedLoanList = data.borrowedLoans.reverse();
      }, error => {
        console.log(error)
    })

    this.dataService.getBorrowerCompleteLoans(5717).subscribe((data:any) => {
        console.log(data);
        this.borrowerCompleteLoanList = data.borrowedLoans.reverse();
      }, error => {
        console.log(error)
    })
  }

  /**
 * Check if it is lender's view
 */
  ActiveLender() {
    this.isBorrower = false;
    console.log("HELLO IT WORKS")
  }

   /**
 * Check if it is Borrower's view
 */
  ActiveBorrower(){
    this.isBorrower = true;
    console.log("PURE JOY")
  }
}
