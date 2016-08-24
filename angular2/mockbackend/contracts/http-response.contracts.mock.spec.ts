import { HttpResponseMock } from '../http-response.mock.spec';
import { ContractsMock } from './contracts.mock.spec';
import { Response, ResponseOptions }  from '@angular/http';


export class HttpResponseContractsMock extends HttpResponseMock {

  //
  // Public Variables
  //
  
  //
  // Private Variables
  //
  private contractsMock: ContractsMock;
  private restApiValue: String = '/corporate-contract-prints';

  constructor(backendUrl: string) {
    super(backendUrl);
    this.contractsMock = new ContractsMock();
  }

  //
  // Public functions
  //
  
  // Functions comments @see{http-response.mock.spec.ts}
  public registerApi(api: string, param: any) {
    let url: string;

    switch(api) {
        case this.restApiValue:
          // The returned Object in the http response
          let returnedObject;

          // If a param is given, add it to the full URL
          if(param) {
            returnedObject = this.retrieveOneContract(param);
            api = api + '/' + param;
          }
          else{
            returnedObject = this.retrieveAllContracts();
          }

          // Store the full URL of the http request
          url = this.backendUrl + api;
          this.responses[url] = new Response(new ResponseOptions({body: returnedObject}));
        break;
      }  

  }

  //
  // Private functions
  //
  
  /* Mock for all Contracts */
  private retrieveAllContracts(): any {
    return this.contractsMock.contracts;
  }

  /* Mock for one Contract */
  private retrieveOneContract(id: any): any {
    return this.getArrayElementById(this.contractsMock.contracts, id);
  }

}