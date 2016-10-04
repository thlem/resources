import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy
   } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Pagination } from './shared/pagination.model';

/**
 * The component to display pagination
 */
@Component({
  selector:    'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls:   ['table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit, OnDestroy {

  @Input() paginationData: Pagination;

  public pages: Array<number> = [];

  @Output() pageChangeEvent: EventEmitter<any> = new EventEmitter();

  public constructor(private logger: Logger) { }

  public ngOnInit() {
    this.logger.debug('[TablePaginationComponent][INIT][START]');
    for (let i = 1; i <= this.paginationData.totalPages; i++) {
      this.pages.push(i);
    }
    this.logger.debug('[TablePaginationComponent][INIT][END]');
  }

  public ngOnDestroy() {
    this.logger.debug('[TablePaginationComponent][DESTROY]');
  }

  public hasPrevious() {
    return this.paginationData.currentPage !== 1;
  }

  public hasNext() {
    return this.paginationData.currentPage !== this.paginationData.totalPages;
  }

  public isPageInRange(paginationData) {
    if (paginationData <= this.paginationData.currentPage && (this.paginationData.currentPage - paginationData) <= 2) {
       return true;
    } else if (paginationData >= this.paginationData.currentPage && (paginationData - this.paginationData.currentPage) <= 2) {
      return true;
    }
    return false;
  }

  public changePage(pageNumber, doPageChange) {
    if (doPageChange) {
      this.pageChangeEvent.next(pageNumber);
    }
  }

  public displayLastPage() {
    return this.paginationData.currentPage + 2 < this.paginationData.totalPages;
  }
}
