// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const SERVER_URL = 'http://localhost:3000';
const TBANK_API_URL = "https://tbankonline.com/SMUtBank_API/Gateway?Header=" 

export const environment = {
  production: false,

  REQUEST_OTP_URL: TBANK_API_URL,
  LOGIN_CUSTOMER_URL: TBANK_API_URL,
  GET_CUSTOMER_DETAILS: TBANK_API_URL,
  GET_CUSTOMER_ACCOUNTS: TBANK_API_URL,
  ADD_BENEFICIARY_URL: TBANK_API_URL,
  CREDIT_TRANSFER_URL: TBANK_API_URL,
  GET_CUSTOMER_URL: SERVER_URL + "/getCustInfo/",

  // Home page
  GET_ALL_PENDING_LOANS_URL: SERVER_URL + "/getAllLoan/pending",

  // Borrower's pending loans
  GET_BORROWER_PENDING_LOANS_URL: SERVER_URL + "/getBorrowerLoans/pending-",

  // Borrower's active loans
  GET_BORROWER_ACTIVE_LOANS_URL: SERVER_URL + "/getBorrowerLoans/active-",

  // Borrower's defaulted loans
  GET_BORROWER_DEFAULTED_LOANS_URL: SERVER_URL + "/getBorrowerLoans/defaulted-",

   // Borrower's complete loans
   GET_BORROWER_COMPLETE_LOANS_URL: SERVER_URL + "/getBorrowerLoans/complete-",

  // Loan details page
  GET_LOAN_DETAILS_FOR_LOANER_URL: SERVER_URL + "/getLoanerLoans/",

  SET_LOAN_URL: SERVER_URL + "/setLoan",
  SUBMIT_LOAN_URL: SERVER_URL + "/createLoan",

  GET_LOAN_INFO_BY_LOAN_ID: SERVER_URL + "/getLoanInfoByLoanId/"
  // GET_LOAN_INFO_BY_LOAN_ID: SERVER_URL + "/getLoanInfoByLoanId/"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
