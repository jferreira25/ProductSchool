import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { RoleEnum } from 'src/app/common/enuns/role.enum';
import { UtilService } from 'src/app/common/utils/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public boxes: any[];

  constructor(
    private router: Router,
    private util: UtilService,
    private routerStack: RouteStackService
  ) { }

  ngOnInit() {
    this.buildBoxes();
  }

  public goTo(path: string): void {
    this.routerStack.goTo(this.router, path);
  }

  public canShowBox(box: any): boolean {
    const loginData = this.util.decodedToken();
    return box.roles.includes(loginData.role);
  }

  private buildBoxes(): void {
    this.boxes = [
      {
        title: 'Responsáveis e crianças',
        description: 'Cadastro de responsáveis e crianças',
        path: '/app/person',
        roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER]
      },
      {
        title: 'Captações',
        description: 'Captação leads de clientes',
        path: '/app/caption',
        roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER]
      },
      {
        title: 'Notificações',
        description: 'Controle de notificações',
        path: '/app/notifications',
        roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER]
      },
    ];
  }
}
