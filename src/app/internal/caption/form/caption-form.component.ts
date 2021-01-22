import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/common/utils/util.service';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { CustomValidator } from 'src/app/common/utils/custom-validator';
import { CepService } from 'src/app/common/services/cep.service';
import { CEP } from 'src/app/common/models/cep';

@Component({
  selector: 'app-caption-form',
  templateUrl: './caption-form.component.html',
  styleUrls: ['./caption-form.component.css']
})
export class CaptionFormComponent implements OnInit {

  public form: FormGroup;
  public isKinshipOthers: boolean;
  step = 0;

  constructor(
    private router: Router,
    private util: UtilService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private routeStack: RouteStackService,
    private cepService:CepService
  ) {
    this.form = this.createFormGroup();
  }

  public kinships: any[] = [
    {name:"Pai"},
    {name:"Mãe"},
    {name:"Tia"},
    {name:"Tio"},
    {name:"Avó"},
    {name:"Avô"},
    {name:"Outros"}
  ];

  public knowUss: any[] = [
    {name:"Facebook"},
    {name:"Instagram"},
    {name:"Email"},
    {name:"Telefone"},
    {name:"Indicação"},
  ];

  public period: any[] = [
    {name:"Manhã"},
    {name:"Tarde"},
    {name:"Integral"}
  ];

  ngOnInit() {
    this.getCaption(+this.route.snapshot.paramMap.get('id'));
    this.form.valueChanges.subscribe(value => { 
      if(value.kinship.name == "Outros")
        this.isKinshipOthers = true;
      else
        this.isKinshipOthers=false;

    });
  }

  public submit(value: any): void {
    if (this.form.invalid) {
      CustomValidator.showErrors(this.form);
      return;
    }
console.log(value);
    // if (value.id) {
    //   this.airportService.put(value).subscribe((res: any) => {
    //     this.util.snackMsg('Aeroporto alterado!');
    //     this.back();
    //   });
    // } else {
    //   this.airportService.post(value).subscribe((res: any) => {
    //     this.util.snackMsg('Aeroporto cadastrado!');
    //     this.back();
    //   });
    // }
  }

  public back(): void {
    this.routeStack.backToCaller(this.router, ['app/caption/']);
  }
  
  private getCaption(id: number): void {
    // if (!id) return;

    // this.airportService.get(id).subscribe((res: Airport) => {
    //   this.form.patchValue(res);
    // });
  }

  private createFormGroup(): FormGroup {
    return this.builder.group({
      id: ['', []],
      name: ['', [
        CustomValidator.required,
        CustomValidator.maxLength(250)
      ]], cpf:['',[
        CustomValidator.required,
        CustomValidator.minLength(11),
        CustomValidator.maxLength(11),
        CustomValidator.ValidaCpf
      ]],
      rg:['',[
        CustomValidator.required
      ]],
      birthDay:['',[
        CustomValidator.required
      ]],
      companyName:['',[
      ]],
      occupation:['',[
      ]],
      kinship: ['', [
        CustomValidator.required,
        CustomValidator.autoComplete
      ]],
      kinshipOthers: ['', [
      ]],
      isResponsable: ['', [
      ]],
      email: ['', [
        CustomValidator.email
      ]],
      phoneNumber: ['', [    
      ]],
      phoneNumber2: ['', [    
      ]],
      cep: ['', [    
      ]],
      address: ['', [    
      ]],
      addressComplement: ['', [    
      ]],
      number: ['', [  
      ]],
      city: ['', [    
      ]],
      neighborhood: ['', [   
      ]],
      state: ['', [   
      ]],
      knowUs: ['', [   
      ]],
      campaign: ['', [   
      ]],
      interestedPeriod: ['', [   
      ]],
      answerDate: ['', [   
      ]],
      answerHour: ['', [   
      ]],
      nextAnswerDate: ['', [   
      ]],
      nextAnswerHour: ['', [   
      ]]
     
     
    });
  }

  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  focusOutFunction(){
    let _cep = this.form.value.cep;
    
    if(_cep != '' && _cep.length > 7)
    this.cepService.get(_cep).subscribe((res: CEP) => {
      this.setAddress(res,);
     });
  }
  
 setAddress(cep:CEP){
  this.form.value.address = cep.logradouro;
  this.form.value.city = cep.localidade;
  this.form.value.neighborhood = cep.bairro;
  this.form.value.state = cep.uf;
  
  this.form.setValue( this.form.value);
 }
  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event) {
    if (this.form.pristine) return;
    event.preventDefault();
    event.returnValue = 'Unsaved modifications';
    return event;
  }
}
