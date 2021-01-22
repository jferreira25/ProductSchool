import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStackService } from '../../services/route-stack.service';
import { UtilService } from '../../utils/util.service';
import { LoginData } from '../../models/login-data';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() drawer: any;
  public loginData: LoginData;

  constructor(
    private router: Router,
    private routeStack: RouteStackService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.loginData = this.util.decodedToken();
  }

  public logout(): void {
    this.util.confirmMsg('Deseja realmente sair?').subscribe((res: boolean) => {
      if (res) {
        this.util.logout();
        this.routeStack.goTo(this.router, '/auth/login');
      }
    });
  }
}
