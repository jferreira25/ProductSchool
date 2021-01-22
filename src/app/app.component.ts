import { Component } from '@angular/core';
import { LoadingStatus } from './common/utils/loading-status';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoadingVisible: boolean;

  constructor(
    private loading: LoadingStatus,
    private swUpdate: SwUpdate) { }

  ngOnInit(): void {
    this.loading.listen().subscribe((isVisible: boolean) => {
      setTimeout(() => {
        this.isLoadingVisible = isVisible;
      }, 0);
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Nova versão disponível, deseja atualizar?')) {
          window.location.reload();
        }
      });
    }
  }
  
}
