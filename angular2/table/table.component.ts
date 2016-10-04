import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { TableHeader, HeaderElement, SortDirection } from './shared/header.model';
import { Pagination } from './pagination/shared/pagination.model';

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
   *   label: string,
   *   isSortable: boolean,
   *   isSortedAsc: boolean,
   *   isSortedDesc: boolean
   * }]
   */
  @Input() tableHeader: TableHeader;

  @Input() disablePagination: boolean;

  @Input() paginationData: Pagination;

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
   * @param {HeaderElement}    headerElement The element to toggle sorting
   * @param {SortDirection} sortDirection The type of sorting (Optional)
   */
  public changeSort(headerElement: HeaderElement, sortDirection?: SortDirection) {

    // Check if the given element is sortable (to avoid errors)
    if (headerElement.isSortable) {

      if (!sortDirection && !headerElement.sortDirection) {
        sortDirection = SortDirection.ASC;
      }
      else if (!sortDirection && headerElement.sortDirection === SortDirection.DESC) {
        sortDirection = SortDirection.ASC;
      }
      else if (!sortDirection && headerElement.sortDirection === SortDirection.ASC) {
        sortDirection = SortDirection.DESC;
      }

      // Clear all sort states of other elements
      this.tableHeader.headerElements.forEach(function(headerElem) {
        if (headerElem !== headerElement) {
          delete headerElem.sortDirection;
        }
      });

       headerElement.sortDirection = sortDirection;

      // Send event to inform parent component for headerElements changes
      let element = {
        'updatedTableHeader': this.tableHeader,
        'headerElementToSort': headerElement
      };
      this.sortEvent.next(element);
    }
  }

  public handlePageChangeEvent(newPage) {
    this.pageChangeEvent.next(newPage);
  }
}
