import { Injectable }   from '@angular/core';
import { Http, Headers }  from '@angular/http';
import { Logger }         from 'angular2-logger/core';
import { Observable }     from 'rxjs/Rx';
import { environment }    from '../../../../environments/environment';
import { Page, Pageable } from '../../model';
import { SortInformation } from '../../component/table/shared/sort-information.model';

declare var JSOG;
import 'jsog';

/**
 * Service to provide CRUD centralized functions.
 * The notation (`${this.backendUrl}${this.url}/${id}`) is equivalent as (this.backendUrl + this.url + '/' + id)
 * Use ` (ALT+7) instead of ' (4)
 */
@Injectable()
export class CrudService {

  private backendUrl: string;

  constructor(private http: Http,
    private logger: Logger) {
      this.backendUrl = environment.backend.url;
  }

  /**
   * api call to getAll elements.
   * @param {string} url for example /api/contracts
   * @param {Pageable} an optional pageable to handle results pagination.
   */
  public getAll(url: string): Observable<Array<any>> {
    return this.http.get(`${this.backendUrl}${url}`)
      .map((responseData) => {
        this.logger.debug('[' + `${this.backendUrl}${url}` + '][RESPONSE-GET] Response : ', responseData);
        let result = JSOG.stringify(responseData.json());
        return JSOG.parse(result) || {};
      })
      .catch((err) => {
        this.logger.debug('[' + `${this.backendUrl}${url}` + '][ERROR-GET]', err);
        return Observable.throw(err.json().error || 'Server error');
      });
  }

  /**
   * [findOne description]
   * @param {string} url [description]
   * @param {number} id  [description]
   */
  public get(url: string): Observable<any> {
    return this.http.get(`${this.backendUrl}${url}`)
      .map((responseData) => {
        this.logger.debug('[' + `${this.backendUrl}${url}` + '][RESPONSE-GET] Response : ', responseData);
        let result = JSOG.stringify(responseData.json());
        return JSOG.parse(result) || {};
      })
      .catch((err) => {
        this.logger.debug('[' + `${this.backendUrl}${url}` + '][ERROR-GET]', err);
        return Observable.throw(err.json().error || 'Server error');
      });
  }

  public getPagineable(url: string, pageable: SortInformation): Observable<any> {

    // Spring pagination start at page 0.
    // Application pagination start at page 1.
    // Manage here +1 -1
    
    pageable.number = pageable.number - 1;

    let pageableUrl = `${url}?page=${pageable.number}&size=${pageable.size}`;
    if (pageable.sortKey && pageable.sortKey !== '') {
      pageableUrl = pageableUrl.concat(`&sort=${pageable.sortKey},${pageable.sortOrder}`);
    }
    return this.get(pageableUrl).map(pageOfData => {
      pageOfData.number = pageOfData.number + 1;
      return pageOfData;
    });
  }


  /**
   * [save description]
   * @param {string} url          [description]
   * @param {any}    objectToSave [description]
   */
  public save(url: string, objectToSave: any): Observable<any> {
    if (objectToSave.id) {
      return this.put(url, objectToSave);
    }

    return this.post(url, objectToSave);
  }

  /**
   * [delete description]
   * @param {string} url [description]
   * @param {number} id  [description]
   */
  public delete(url: string, id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}${url}/${id}`);
  }

  /**
   * [put description]
   * @param {string} url          [description]
   * @param {any}    objectToSave [description]
   */
  private put(url: string, objectToSave: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.backendUrl}${url}/${objectToSave.id}`, JSON.stringify(objectToSave), {headers: headers})
      .catch((err) => {
        this.logger.debug('[' + `${this.backendUrl}${url}` + '][ERROR-PUT]', err);
        return Observable.throw(err);
      })
      .map((responseData) => {
        this.logger.debug('[' + `${this.backendUrl}${url}/${objectToSave.id}` + '][RESPONSE-PUT] Response : ', responseData);
        return responseData.json();
      });
  }

  /**
   * [post description]
   * @param {string} url          [description]
   * @param {any}    objectToSave [description]
   */
  private post(url: string, objectToSave: any): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.backendUrl}${url}`, JSON.stringify(objectToSave), {headers: headers})
      .catch((err) => {
        this.logger.debug('[' + `${this.backendUrl}${url}` + '][ERROR-POST]', err);
        return Observable.throw(err);
      })
      .map((responseData) => {
        this.logger.debug('[' + `${this.backendUrl}${url}` + '][RESPONSE-POST] Response : ', responseData);

        let result = JSOG.stringify(responseData.json());
        return JSOG.parse(result) || {};
      });
  }
}
