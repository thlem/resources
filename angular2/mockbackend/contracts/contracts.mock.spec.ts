export class ContractsMock {

  public contracts = [];

  private commonContractData(id) {

    return {
      accountCode :"code2",
      corporateGin :"1er258963",
      corporateName :"Targaryen",
      corporateReference :"Daenerys",
      corporateSiret :"159632rf147",
      gin :"147852369",
      id : id,
      printDate :"1236g54",
      typeCode :"BC",
      validityEndDate :"2016-08-20T13:00:00.000Z",
      validityStartDate :"2016-08-10T13:00:00.000Z",
      managerEmails: [],
      corporateEnvironment: {
        id :2,
        labelCorpEnv :"DaenerysTargaryen",
        stateCode :"valid"
      },
      associatedReferencePrints: [
        {
          accountCode :"code1",
          corporateGin :"125erf8963",
          corporateName :"ARStark",
          corporateReference :"ARArya",
          corporateSiret :"15ref9632147",
          gin :"14785ytr2369",
          id :3,
          printDate :"123ff654",
          typeCode :"BD",
          validityEndDate :"2016-09-20T13:00:00.000Z",
          validityStartDate :"2016-09-10T13:00:00.000Z"
        },
        {
          accountCode :"code1",
          corporateGin :"12589rf63",
          corporateName :"ARStark",
          corporateReference :"ARSansa",
          corporateSiret :"15963erf2147",
          gin :"14785v2369",
          id :4,
          printDate :"1236vg54",
          typeCode :"BF",
          validityEndDate :"2016-10-20T13:00:00.000Z",
          validityStartDate :"2016-10-10T13:00:00.000Z"
        }
      ],
      afContact: {
        firstname :"Ramsay",
        id :2,
        idNumber :"G684124",
        lastname :"Bolton"
      }
    }
  }

  constructor(){
    this.contracts.push(this.commonContractData(1));
    this.contracts.push(this.commonContractData(2));
    this.contracts.push(this.commonContractData(3));
    this.contracts.push(this.commonContractData(4));
  }

}