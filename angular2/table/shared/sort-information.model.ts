import { SortDirection } from './header.model';

export class SortInformation {

  // The current page num
  public number: number;
  // The number of elements to display per page
  public size: number;
  // The key to sort objects by key
  public sortKey: string;
  // The sort order
  public sortOrder: SortDirection;

  public constructor() {
    this.number = 0;
    this.size = 10;
  }

}