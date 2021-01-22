/**
 * Object to control Stack of navigation
 */
export class RouteStack {
  route: string; // path of route
  caller: string; // caller of navigation
  params: any[]; // params like ':id'
}
