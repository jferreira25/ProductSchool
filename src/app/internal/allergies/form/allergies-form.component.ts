import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/common/utils/util.service';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { CustomValidator } from 'src/app/common/utils/custom-validator';
import { AllergiesService } from 'src/app/common/services/allergies.service';
import { Allergies } from 'src/app/common/models/allergies';


@Component({
  selector: 'app-allergies-form',
  templateUrl: './allergies-form.component.html',
  styleUrls: ['./allergies-form.component.css']
})
export class AllergiesFormComponent implements OnInit {

  public allergiesType: any[] = [{name:"Alimentos"},{name:"Medicação"}];
  public form: FormGroup;

  constructor(
    private router: Router,
    private util: UtilService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private routeStack: RouteStackService,
    private allergiesService: AllergiesService
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
      this.allergiesService.put(value).subscribe((res: any) => {
        this.util.snackMsg('Alergia alterada!');
        this.back();
      });
    } else {
      this.allergiesService.post(value).subscribe((res: any) => {
        this.util.snackMsg('Alergia cadastrada!');
        this.back();
      });
    }
  }

  public back(): void {
    this.routeStack.backToCaller(this.router, ['app/allergies/']);
  }
  
  private getAllergies(id: number): void {
     if (!id) return;

    this.allergiesService.get(id).subscribe((res: Allergies) => {
      this.form.patchValue(res);
    });
  }

  private createFormGroup(): FormGroup {
    return this.builder.group({
      id: ['', []],
      name: ['', [
        CustomValidator.required,
        CustomValidator.maxLength(250)
      ]],
      type:['', [
        CustomValidator.required,
        CustomValidator.autoComplete
      ]],
    });
  }

  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event) {
    if (this.form.pristine) return;
    event.preventDefault();
    event.returnValue = 'Unsaved modifications';
    return event;
  }
}
