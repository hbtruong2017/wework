import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  loanId: number;
  loanInfo: any;
  pendingLoanList: any;
  borrowerId: number;
  borrowerInfo: any;
  borrowerAccount: any;
  borrowerName: string;
  loanAmount: any;
  loanCategory: any;
  balanceAfter: any;
  myName: string;
  myBalance: any;
  myAccountNo: any;

  
  constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.loanId = params['id']
    })
    this.myName = window.sessionStorage.name;
    this.myBalance = window.sessionStorage.balance;
    this.myAccountNo = window.sessionStorage.accountID;
    this.dataService.getLoanInfoByLoanId(this.loanId).subscribe((data: any) => {
      this.loanInfo = data.loanInfo[0];
      this.loanAmount = this.loanInfo.amount;
      this.borrowerId = this.loanInfo.borrowerAccount;
      this.loanCategory = this.loanInfo.loanCategory;

      this.dataService.getCustomerDetailsFromServer(this.borrowerId).subscribe((data: any) => {
        this.borrowerInfo = data.customerInfo[0];
        this.borrowerAccount = this.borrowerInfo.accountNumber;
        console.log("borrowerAccount: " + this.borrowerAccount)
        this.borrowerName = this.borrowerInfo.custFirstName + " " + this.borrowerInfo.custLastName;
      })
    })
    this.dataService.getAllPendingLoans().subscribe((data: any) => {
      this.pendingLoanList = data.allLoans.splice(0, 5);
    }, error => {
      console.log(error)
    })
  }


  goToLoan(id: number) {
    this.router.navigate(['/loan'], { queryParams: { id: id } })
  }

  fundLoan() {
    console.log("Start adding Beneficiary List")
    this.addToBeneficiaryList();
  }

  addToBeneficiaryList() {
    let header = JSON.stringify({
      serviceName: "addBeneficiary",
      userID: window.sessionStorage.getItem("userID"),
      PIN: window.sessionStorage.getItem("PIN"),
      OTP: "999999"
    });

    // let content = JSON.stringify(contentObj);
    let content = JSON.stringify({
      AccountID: this.borrowerAccount,
      Description: this.borrowerName
    });

    this.dataService.addBeneficiary(header, content).subscribe((data: any) => {
      console.log(data);
      this.transferFund();
    })
  }

  transferFund() {
    let header = JSON.stringify({
      serviceName: "creditTransfer",
      userID: window.sessionStorage.getItem("userID"),
      PIN: window.sessionStorage.getItem("PIN"),
      OTP: "999999"
    });

    // let content = JSON.stringify(contentObj);
    let content = JSON.stringify({
      accountFrom: window.sessionStorage.getItem("accountID"),
      accountTo: this.borrowerAccount,
      transactionAmount: this.loanAmount,
      transactionReferenceNumber: new Date().getTime(),
      narrative: this.loanCategory
    });

    this.dataService.transferAmount(header, content).subscribe((data: any) => {
      this.balanceAfter = data.Content.ServiceResponse.BalanceAfter._content_;
      window.sessionStorage.setItem("balance", this.balanceAfter)
      this.updateLoanStatus();
    })
  }

  updateLoanStatus() {
    let statusReq = {
      loanerAccount: window.sessionStorage.getItem("accountID"),
      loanId: this.loanId,
      loanStatus: "active"
    }

    this.dataService.setLoanStatus(statusReq).subscribe((data: any) => {
      console.log(data);
    })
  }

  gotoTbank() {
    window.location.href = "http://tbankonline.com/SMUtBank_RIB2/#/login?redirect=%2F";
  }
}
