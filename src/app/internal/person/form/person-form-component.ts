import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/common/utils/util.service';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { CustomValidator } from 'src/app/common/utils/custom-validator';
import { PersonService } from 'src/app/common/services/person.service';
import { Person } from 'src/app/common/models/person';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CepService } from 'src/app/common/services/cep.service';
import { CEP } from 'src/app/common/models/cep';
import { AllergiesService } from 'src/app/common/services/allergies.service';
import { Allergies } from 'src/app/common/models/allergies';
import { RestrictionFoodService } from 'src/app/common/services/restrictionFood.service';
import { RestrictionFoods } from 'src/app/common/models/restrictionFoods';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form-component.html',
  styleUrls: ['./person-form-component.css']
})
export class PersonFormComponent implements OnInit {
 
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  allergiesCtrl = new FormControl('', CustomValidator.required);
  restrictfoodsCtrl = new FormControl('', CustomValidator.required);

  filteredAllergies: Observable<string[]>;
  filteredRestrictionFoods: Observable<string[]>;

  allergiesSelecteds: string[] = [];
  restrictionFoodsSelecteds: string[] = [];

  allAllergies: string[] = [];
  allRestrictionFoods: string[] = [];
 
  labelPosition: 'before' | 'after' = 'after';
 
  public isKinshipOthers: boolean;
  fileData: File[] = [];
  previewUrl:any[] = [];
  uploadedFilePath: string = null;
  step = 0;

  public form: FormGroup;
  public kinships: any[] = [
    {name:"Pai"},
    {name:"Mãe"},
    {name:"Tia"},
    {name:"Tio"},
    {name:"Avó"},
    {name:"Avô"},
    {name:"Outros"}
  ];

  public bloodTypes: any[] = [
    {type:"A+"},
    {type:"A-"},
    {type:"B+"},
    {type:"B-"},
    {type:"AB+"},
    {type:"AB-"},
    {type:"O+"},
    {type:"O-"},
    {type:"Não especificado"},
  ]

  @ViewChild('allergyInput', { static: false }) allergyInput: ElementRef<HTMLInputElement>;
  @ViewChild('restrictFoodInput', { static: false }) restrictFoodInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild('auto1', { static: false }) matAutocomplete1: MatAutocomplete;

  constructor(
    private router: Router,
    private util: UtilService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private routeStack: RouteStackService,
    private personService: PersonService,
    private cepService:CepService,
    private allergyService:AllergiesService,
    private restrictionFoodService:RestrictionFoodService
  ) {
    this.form = this.createFormGroup();
    this.filteredAllergies = this.allergiesCtrl.valueChanges.pipe(
      startWith(null),
      map((allergy: string | null) => allergy ? this._filter(allergy) : this.allAllergies.slice()));

      this.filteredRestrictionFoods = this.restrictfoodsCtrl.valueChanges.pipe(
        startWith(null),
        map((restrictfoods: string | null) => restrictfoods ? this._filterRestrictionfood(restrictfoods) : this.allRestrictionFoods.slice()));
  }

  remove(allergy: string,i:number): void {
    const index =  this.form.get('students').value[i].allergiesSelecteds.indexOf(allergy);

    if (index >= 0) {
      this.form.get('students').value[i].allergiesSelecteds.splice(index, 1);
      
      this.allergiesCtrl.setValue(null);
    }
  }

  removeRestrictionfood(restrictfoods: string,i:number): void {
    const index =  this.form.get('students').value[i].restrictionFoodSelecteds.indexOf(restrictfoods);

    if (index >= 0) {
      this.form.get('students').value[i].restrictionFoodSelecteds.splice(index, 1);
      
      this.restrictfoodsCtrl.setValue(null);
    }
  }

  private getAllergiesCodes() {

    this.allergyService.filter('').subscribe((res: Allergies[]) => {

      for (const key in res) {
        if (Object.prototype.hasOwnProperty.call(res, key)) {
        
          const element = res[key];
         
          const index = this.allergiesSelecteds.indexOf(key);
      
          if (index == -1){
            for (let index = 0; index < this.countProps(res[key]); index++) {
              const element = res[key][index].name;
              this.allAllergies.push(element);
            }
           
          }
        }
      }
    });
  }

  private getRestrictionFoodsCodes() {

    this.restrictionFoodService.filter('').subscribe((res: RestrictionFoods[]) => {

      for (const key in res) {
        if (Object.prototype.hasOwnProperty.call(res, key)) {
        
          const element = res[key];
         
          const index = this.restrictionFoodsSelecteds.indexOf(key);
      
          if (index == -1){
            for (let index = 0; index < this.countProps(res[key]); index++) {
              const element = res[key][index].name;
              this.allRestrictionFoods.push(element);
            }
           
          }
        }
      }
    });
  }

  private countProps(obj) {
    var count = 0;
    for (var p in obj) {
      obj.hasOwnProperty(p) && count++;
    }
    return count; 
}

  selected(event: MatAutocompleteSelectedEvent,i:number): void {
    let indexExists = this.form.get('students').value[i].allergiesSelecteds.indexOf(event.option.viewValue);
      if(indexExists == -1){
        this.form.get('students').value[i].allergiesSelecteds.push(event.option.viewValue);
        this.allergyInput.nativeElement.value = '';
        this.allergiesCtrl.setValue(null);
      }
  }
  selectedRestrictionfood(event: MatAutocompleteSelectedEvent,i:number): void {
    let indexExists = this.form.get('students').value[i].restrictionFoodSelecteds.indexOf(event.option.viewValue);
      if(indexExists == -1){
        this.form.get('students').value[i].restrictionFoodSelecteds.push(event.option.viewValue);
        this.restrictFoodInput.nativeElement.value = '';
        this.restrictfoodsCtrl.setValue(null);
      }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAllergies.filter(allergy => allergy.toLowerCase().indexOf(filterValue) === 0)
  }

  private _filterRestrictionfood(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allRestrictionFoods.filter(restrictfoods => restrictfoods.toLowerCase().indexOf(filterValue) === 0)
  }

  ngOnInit() {
    this.getAllergiesCodes();
    this.getRestrictionFoodsCodes();
    this.getGuardiansAndStudents(+this.route.snapshot.paramMap.get('id'));
  }

  public submit(value: any): void {

    if (this.form.invalid) {
      CustomValidator.showErrors(this.form);
      return;
    }
    // const filters = this.util.convertDateToString(this.form.value);
  
    if (value.id) {
      this.personService.put(value).subscribe((res: any) => {
        this.util.snackMsg('Cadastro alterado!');
        this.back();
      });
    } else {
      this.personService.post(value).subscribe((res: any) => {
        this.util.snackMsg('Cadastro efetuado com sucesso!');
        this.back();
      });
    }
  }

  public back(): void {
    this.routeStack.backToCaller(this.router, ['app/person/']);
  }
  
  
  private getGuardiansAndStudents(id: number): void {
    if (!id) return;

    this.personService.get(id).subscribe((res: any) => {

    if (res.persons) {
      res.persons.forEach((person: any) => {
        (<FormArray>this.form.controls.guardian).push(this.createGuardianFormGroup(person))
      });
    }

    if (res.students) {
      let i = 0;
      res.students.forEach((students: any) => {
        
        this.previewUrl[i] = students.previewUrl;
        
        (<FormArray>this.form.controls.students).push(this.createStudentsFormGroup(students));
      
        this.CreateExistsAllergiesSelecteds(students.allergiesSelecteds,i);
        this.CreateExistAllRestrictionFoodSelecteds(students.restrictionFoodSelecteds,i);
        i++;
      });
    }
    delete res.persons;
    delete res.students;

    this.form.patchValue(res);
    
    });
    
  }
    
private CreateExistAllRestrictionFoodSelecteds(restrictfoods:any,i:number){

  for (let index = 0; index < restrictfoods.length; index++) {
    const element = restrictfoods[index];

    let indexExists = this.form.get('students').value[i].restrictionFoodSelecteds.indexOf(element);

    if(indexExists == -1){
      this.form.get('students').value[i].restrictionFoodSelecteds.push(element);
      this.restrictfoodsCtrl.setValue(null);
    }
  }
}
  
private CreateExistsAllergiesSelecteds(allergies:any,i:number){

  for (let index = 0; index < allergies.length; index++) {
    const element = allergies[index];

    let indexExists = this.form.get('students').value[i].allergiesSelecteds.indexOf(element);

    if(indexExists == -1){
      this.form.get('students').value[i].allergiesSelecteds.push(element);
      this.allergiesCtrl.setValue(null);
    }
  }
}

  public addGuardians(): void {
    const guardianFormArray = this.form.controls.guardian as FormArray;
    guardianFormArray.push(this.createGuardianFormGroup(null));
  }

  public removeGuardians(index: number): void {
    const guardianFormArray = this.form.controls.guardian as FormArray;
    guardianFormArray.removeAt(index);
  }

  public addStudents(): void {
    const studentsFormArray = this.form.controls.students as FormArray;
    studentsFormArray.value.allAllergies = this.allAllergies;
    studentsFormArray.push(this.createStudentsFormGroup(null));
   
  }

  public removeStudents(index: number): void {
    const studentsFormArray = this.form.controls.students as FormArray;
    studentsFormArray.removeAt(index);

    var elementPreview =  this.previewUrl[index];
    const indexPreview: number = this.previewUrl.indexOf(elementPreview);

    if (indexPreview !== -1) {
        this.previewUrl.splice(index, 1);
    } 

    var elementFileData =  this.previewUrl[index];
    const indexFileData: number = this.previewUrl.indexOf(elementFileData);
   
    if (indexFileData !== -1) {
        this.fileData.splice(index, 1);
    }    
   
  }

  private createGuardianFormGroup(guardian: any): FormGroup {
    const guardianForm = this.builder.group({
      name: ['', [
        CustomValidator.minLength(3),
        CustomValidator.required
      ]],
      cpf:['',[
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
        CustomValidator.required
      ]],
      occupation:['',[
        CustomValidator.required,
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
        CustomValidator.required,
        CustomValidator.email
      ]],
      phoneNumber: ['', [    
      ]],
      phoneNumber2: ['', [    
      ]],
      cep: ['', [    
        CustomValidator.required,
      ]],
      address: ['', [    
        CustomValidator.required,
      ]],
      addressComplement: ['', [    
      ]],
      number: ['', [  
        CustomValidator.required,  
      ]],
      city: ['', [    
        CustomValidator.required,
      ]],
      neighborhood: ['', [   
        CustomValidator.required, 
      ]],
      state: ['', [   
        CustomValidator.required, 
      ]]
    });

    if (guardian) {

      guardianForm.patchValue(guardian);
    }

      guardianForm.valueChanges.subscribe(value => { 
        if(value.kinship.name == "Outros")
          this.isKinshipOthers = true;
        else
          this.isKinshipOthers=false;

      });

    return guardianForm;
  }

  private createStudentsFormGroup(students: any): FormGroup {
    
    const studentsForm = this.builder.group({
      name: ['', [
        CustomValidator.minLength(3),
        CustomValidator.required
      ]],
      cpf:['',[
        CustomValidator.required,
        CustomValidator.minLength(11),
        CustomValidator.maxLength(11),
        CustomValidator.ValidaCpf
      ]],
      rg:['',[
      ]],
      birthDay:['',[
        CustomValidator.required
      ]],
      bloodyType:['',[
        CustomValidator.required
      ]], 
      previewUrl: ['', [
      ]],
      allergiesSelecteds: this.builder.array([]),
      restrictionFoodSelecteds: this.builder.array([])
    });

    this.form.get('students').value.previewUrl = null;
   
    this.form.get('students').value.allergiesSelecteds = new Array<string>();
    this.form.get('students').value.restrictionFoodSelecteds = new Array<string>();

    if (students) {
      this.form.get('students').value.allergiesSelecteds = students.allergiesSelecteds;
      this.form.get('students').value.restrictionFoodSelecteds = students.restrictionFoodSelecteds;

      studentsForm.patchValue(students);
     
    }
  
  
    return studentsForm;
  }

  private createFormGroup(): FormGroup {
    return this.builder.group({
      id: ['', []],
      guardian: this.builder.array([]),
      students: this.builder.array([])
    });
  }

  public formGuardian(form: FormGroup): AbstractControl[] {
    return (form.get('guardian') as FormArray).controls;
  }

  public formStudents(form: FormGroup): AbstractControl[] {
    return (form.get('students') as FormArray).controls;
  }


  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event) {
    if (this.form.pristine) return;
    event.preventDefault();
    event.returnValue = 'Unsaved modifications';
    return event;
  }

 fileProgress(fileInput: any,i:number) {
      this.fileData[i] = <File>fileInput.target.files[0];
      this.preview(i);
  }
 
  preview(i:number) {
    // Show preview 
    var mimeType = this.fileData[i].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData[i]); 
    reader.onload = (_event) => { 
      this.previewUrl[i] = reader.result; 
      this.form.get('students').value[i].previewUrl =  reader.result; 
      this.form.get('students').setValue( this.form.get('students').value);
    }
  }
   
  onSubmit() {
      const formData = new FormData();
     // formData.append('file', this.fileData);
      // this.http.post('url/to/your/api', formData)
      //   .subscribe(res => {
    
      //     this.uploadedFilePath = res.data.filePath;
      //     alert('SUCCESS !!');
      //   }) 
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

  focusOutFunction(index:number){
    let _cep = this.form.get('guardian').value[index].cep;
    
    if(_cep != '' && _cep.length > 7)
    this.cepService.get(_cep).subscribe((res: CEP) => {
      this.setAddress(res,index);
     });
  }

 setAddress(cep:CEP,index:number){
  this.form.get('guardian').value[index].address = cep.logradouro;
  this.form.get('guardian').value[index].city = cep.localidade;
  this.form.get('guardian').value[index].neighborhood = cep.bairro;
  this.form.get('guardian').value[index].state = cep.uf;
  
  this.form.get('guardian').setValue( this.form.get('guardian').value);
 }

  
}
