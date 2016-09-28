import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy
   } from '@angular/core';
import { Logger } from 'angular2-logger/core';

/**
 * The component to display pagination
 */
@Component({
  selector:    'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls:   ['table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit, OnDestroy {
  @Input()
  public totalPage: number;

  @Input()
  public currentPage: number;

  public pages: Array<number> = [];

  @Output() pageChangeEvent: EventEmitter<any> = new EventEmitter();

  public constructor(private logger: Logger) { }

  public ngOnInit() {
    this.logger.debug('[TablePaginationComponent][INIT][START]');
    for (let i = 1; i <= this.totalPage; i++) {
      this.pages.push(i);
    }
    this.logger.debug('[TablePaginationComponent][INIT][END]');
  }

  public ngOnDestroy() {
    this.logger.debug('[TablePaginationComponent][DESTROY]');
  }

  public hasPrevious() {
    return this.currentPage !== 1;
  }

  public hasNext() {
    return this.currentPage !== this.totalPage;
  }

  public isPageInRange(page) {
    if (page <= this.currentPage && (this.currentPage - page) <= 4) {
       return true;
    } else if (page >= this.currentPage && (page - this.currentPage) <= 4) {
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
    return this.currentPage + 4 < this.totalPage;
  }
}
