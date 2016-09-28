import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Logger } from 'angular2-logger/core';

/**
 * This component provide table element with a sortable header.
 */
@Component({
  selector:    'app-table',
  templateUrl: './table.component.html',
  styleUrls:   ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  /**
   * Should be an array of json objects like : 
   * [{
   *   label: string, // display in the table head ex: 'Name'
   *   propertyName: string // the property key value ex: '(parentObject).child.subChild.name'
   *   isSortable: boolean,
   *   sortDirection: string //'desc' or 'asc' on the first table item you want use the sort
   * }]
   */
  @Input() headerElements: any;

  @Input() enablePagination: boolean;

  @Input()
  public totalPage: number;

  @Input()
  public currentPage: number;

  // The event catch by parent component
  @Output() sortEvent = new EventEmitter();

  @Output() pageChangeEvent = new EventEmitter();

  public constructor(private logger: Logger) { }

  public ngOnInit() {
    this.logger.debug('[TableComponent][INIT][START]');
    this.logger.debug('[TableComponent][INIT][END]');
  }

  public ngOnDestroy() {
    this.logger.debug('[TableComponent][DESTROY][START]');
    this.logger.debug('[TableComponent][DESTROY][END]');
  }

  /**
   * This function manage the state of the sortable element
   * @param {any}    headerElement The element to toggle sorting
   * @param {string} type The type of sorting (Optional)
   */
  public changeSort(headerElement: any, type: string) {

    // Check if the given element is sortable (to avoid errors)
    if (headerElement.isSortable) {

      if (!type && !headerElement.sortDirection) {
        type = 'asc';
      } else if (!type && headerElement.sortDirection === 'desc') {
        type = 'asc';
      } else if (!type && headerElement.sortDirection === 'asc') {
        type = 'desc';
      }

      // Clear all sort states of other elements
      this.headerElements.data.forEach(function(headerElem) {
        if (headerElem !== headerElement) {
          delete headerElem.sortDirection;
        }
      });

       headerElement.sortDirection = type;

      // Send event to inform parent component for headerElements changes
      let element = {
        'headerElements': this.headerElements,
        'sortableInfo': headerElement
      };
      this.sortEvent.next(element);
    }
  }

  public handlePageChangeEvent(newPage) {
    this.pageChangeEvent.next(newPage);
  }
}
