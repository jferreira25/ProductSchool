import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/common/utils/util.service';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { CustomValidator } from 'src/app/common/utils/custom-validator';
import { RestrictionFoodService } from 'src/app/common/services/restrictionFood.service';
import { RestrictionFoods } from 'src/app/common/models/restrictionFoods';


@Component({
  selector: 'app-restrictionFood-form',
  templateUrl: './restrictionFood-form.component.html',
  styleUrls: ['./restrictionFood-form.component.css']
})
export class RestrictionFoodFormComponent implements OnInit {

  public allergiesType: any[] = [{name:"Alimentos"},{name:"Medicação"}];
  public form: FormGroup;

  constructor(
    private router: Router,
    private util: UtilService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private routeStack: RouteStackService,
    private restrictionFoodService: RestrictionFoodService
  ) {
    this.form = this.createFormGroup();
  }

  ngOnInit() {
    this.getAllergies(+this.route.snapshot.paramMap.get('id'));
  }

  public submit(value: any): void {
    if (this.form.invalid) {
      CustomValidator.showErrors(this.form);
      return;
    }

    if (value.id) {
      this.restrictionFoodService.put(value).subscribe((res: any) => {
        this.util.snackMsg('Restrição alimentar alterada!');
        this.back();
      });
    } else {
      this.restrictionFoodService.post(value).subscribe((res: any) => {
        this.util.snackMsg('Restrição alimentar cadastrada!');
        this.back();
      });
    }
  }

  public back(): void {
    this.routeStack.backToCaller(this.router, ['app/restrictionFood/']);
  }
  
  private getAllergies(id: number): void {
     if (!id) return;

    this.restrictionFoodService.get(id).subscribe((res: RestrictionFoods) => {
      this.form.patchValue(res);
    });
  }

  private createFormGroup(): FormGroup {
    return this.builder.group({
      id: ['', []],
      name: ['', [
        CustomValidator.required,
        CustomValidator.maxLength(250)
      ]]
    });
  }

  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event) {
    if (this.form.pristine) return;
    event.preventDefault();
    event.returnValue = 'Unsaved modifications';
    return event;
  }
}
