import { MockBackend, MockConnection } from '@angular/http/testing';

/**
 * This Mock provide backend mock for each HTTP request.
 * Instead of calling the real backend, it will return the mocked response.
 */
export abstract class HttpResponseMock {

  //
  // Public Variables
  //
  
  //
  // Private Variables
  //
  protected responses: Object;
  protected backendUrl: String;

  // Constructor
  constructor(backendUrl: string){

    // Store the current context backend url
    this.backendUrl = backendUrl;

    // Initialize responses storage for urls
    this.responses = {};

  }

  // 
  // Public functions
  // 
  
  /**
   * Open a fake connection to the backend for URLS present in the responses object.
   * Each time a request is send, mockBackend intercept and store it into the subscribed connection.
   * Then we just have to return to stored response.
   * @param {MockBackend} mockBackend The Mock backend request interceptor.
   */
  public connectMockBackend(mockBackend: MockBackend) {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      var response = this.responses[connection.request.url];
      connection.mockRespond(response);
    });
  }

  /**
   * For the given API, store the correct values for this API.
   * WARNING, this function only support on param at the moment.
   * @param {String} api The REST API
   * @param {any} param the REST API param
   */
  public abstract registerApi(api, param);
  
  //
  // Private Functions
  //

  protected getArrayElementById(array, id) {

    for(var i = 0; i < array.length; i++) {
      if(array[i].id === id) {
        return array[i];
      }
    }
  }

}