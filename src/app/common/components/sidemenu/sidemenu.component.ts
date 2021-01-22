import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStackService } from '../../services/route-stack.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { RoleEnum } from '../../enuns/role.enum';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.6s ease-out',
              style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class SidemenuComponent implements OnInit {

  @Input() drawer: any;

  public menus: any[] = [];

  constructor(
    private router: Router,
    private util: UtilService,
    private routeStack: RouteStackService
  ) { }

  ngOnInit() {
    this.buildMenu();
  }

  public goToOrExpandChildren(menuItem: any): void {
    if (!menuItem.children) {
      this.routeStack.goTo(this.router, menuItem.path);
      this.drawer.close();
    } else {
      menuItem.childrenOpened = !menuItem.childrenOpened;
    }
  }

  public isRouteActive(menuItem: any, menuParent: any): boolean {
    if (menuParent) {
      menuParent.childrenOpened = true;
    }
    return menuItem.path === this.router.url;
  }

  public canShowMenu(menuItem: any): boolean {
    if (menuItem.children) return true;

    const loginData = this.util.decodedToken();
    return menuItem.roles.includes(loginData.role);
  }

  private buildMenu(): void {
    this.menus = [
      {
        icon: 'house',
        path: '/app/home',
        label: 'Início',
        roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER],
        active: true
      },
      {
        icon: 'trending_up',
        path: '/app/caption',
        label: 'Captações',
        roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER],
        active: false
      },
      {
        icon: 'notifications',
        path: '/app/notifications',
        label: 'Notificações',
        roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER],
        active: false
      },
      {
        icon: 'post_add',
        label: 'Cadastros',
        children: [
          {
            icon: 'family_restroom',
            label: 'Responsáveis e Crianças',
            path: '/app/person',
            roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER],
            active: false
          },
          {
            icon: 'pest_control',
            label: 'Alergias',
            path: '/app/allergies',
            roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER],
            active: false
          },
          {
            icon: 'no_meals',
            label: 'Restrições Alimentares',
            path: '/app/restrictionFood',
            roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER],
            active: false
          },
          {
            icon: 'people',
            label: 'Usuários',
            path: '/app/home',
            roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER],
            active: false
          }
        ]
      },
      {
        icon: 'grading',
        label: 'Relatórios',
        children: [
          
        ]
      }
    ];

    this.menus.forEach(m => {
      if (!m.children) return;

      if (m.children.findIndex(c => c.path === this.router.url) > -1)
        m.childrenOpened = true;
    });
  }
}
