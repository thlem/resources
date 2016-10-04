export class TableHeader {
  public headerElements: Array<HeaderElement>;
  public currentSortElement: string;

  public constructor(headerElements: Array<HeaderElement>, currentSortElement: string) {

    this.headerElements = headerElements;
    this.currentSortElement = currentSortElement;

  }

}

export class HeaderElement {

  public label: string;
  public propertyName: string;
  public isSortable: boolean;
  public sortDirection: SortDirection;

  public constructor(label?: string, propertyName?: string, isSortable?: boolean, sortDirection?: SortDirection) {
    this.label = label;
    this.propertyName = propertyName;
    this.isSortable = isSortable;
    this.sortDirection = sortDirection;
  }

}

export enum SortDirection {
  ASC = <any>'asc',
  DESC = <any>'desc'
}