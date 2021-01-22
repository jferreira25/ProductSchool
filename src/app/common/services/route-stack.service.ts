import { Injectable } from '@angular/core';
import { RouteStack } from '../models/route-stack';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteStackService {

  constructor() { }

  private routeStack = [] as RouteStack[];

  /**
   * This method navigate to another route setting it in a Stack
   * @param router Router object injected
   * @param route Path to go in
   * @param params Params to pass in route to go in
   */
  public goTo(router: Router, route: string, ...params: any[]): void {
    if (params && params.length) {
      if (params.some(x => x.queryParams)) {
        router.navigate([route], params[0]);
      } else {
        router.navigate(this.separateArray(route, params));
      }
    } else {
      router.navigate([route]);
    }
    this.routeStack.push({
      route: route,
      caller: router.url,
      params: params ? params : []
    } as RouteStack);
  }

  /**
   * Helper method to navigate with Stacks
   * @param route Path to go in
   * @param params Params to pass in route to go in
   */
  private separateArray(route: string, params): string[] {
    const array = [];

    array.push(route);

    if (typeof params === 'string') {
      array.push(params);
      return array;
    }

    for (let i = 0; i < params.length; i++) {
      array.push(params[i]);
    }

    return array;
  }

  /**
   * Unstack the routes, allowing dinamically returns
   * @param router Router object injected 
   * @param defaultBackRoute Default path (route) to back in case of refreshed page
   */
  public backToCaller(router: Router, defaultBackRoute: any[]): void {
    if (!this.isStackEmpty()) {
      const unstacked = this.routeStack.pop();
      router.navigate([decodeURI(unstacked.caller)]);
    } else {
      router.navigate(defaultBackRoute);
    }
  }

  /**
   * Helper method of Stack navigation
   */
  private isStackEmpty(): boolean {
    return !this.routeStack || !this.routeStack.length;
  }
}
