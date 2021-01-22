import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notification } from 'src/app/common/models/notification';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

  public notification: Notification;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routeStack: RouteStackService,
    private notificationService: NotificationService
  ) {
    this.notification = new Notification();
  }

  ngOnInit() {
    const notificationId = this.route.snapshot.paramMap.get('id');

    this.getNotification(notificationId);
  }

  public goToAdd(id: any): void {
    const route = this.getRouteConditionally();
    if (!route) return;

    this.routeStack.goTo(this.router, route, id);
  }

  public back(): void {
    this.routeStack.backToCaller(this.router, ['app/notifications']);
  }

  private getRouteConditionally(): string {
    switch (this.notification.type) {
      case 'Airport':
        return 'app/airports/add';
      case 'Equipment':
        return 'app/equipments/add';
      case 'EquipmentType':
        return 'app/equipmenttypes/add';
      default:
        return null;
    }
  }

  private markAsVisualized(notificationId: string): void {
    this.notificationService.visualize(notificationId).subscribe(() => {
      this.notificationService.mustUpdate();
    });
  }

  private getNotification(id: string): void {
    this.notificationService.get(id).subscribe(res => {
      this.notification = res;
      this.notification.detail = JSON.parse(this.notification.detail);
      if (!this.notification.isVisualized) {
        this.markAsVisualized(this.notification.id);
      }
    });
  }
}
