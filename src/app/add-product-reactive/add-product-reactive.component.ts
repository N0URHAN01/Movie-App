import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-product-reactive',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-reactive.component.html',
  styleUrl: './add-product-reactive.component.css',
})
export class AddProductReactiveComponent {
  productForm: FormGroup;
  formBuilder = inject(FormBuilder);
  
  constructor() {
    // this.productForm = new FormGroup({
    //   productName: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //   ]),
    //   description: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(10),
    //     Validators.maxLength(200),
    //   ]),
    // });
    this.productForm = this.formBuilder.group({
      productName: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]],
    });
  }

  get formControls(){
    return this.productForm.controls;
  }

  handleSubmitForm(){
    console.log(this.productForm)
    console.log(this.productForm.value)

  }
}

// Import ReactiveFormModule
// Init. form = new FomGroup({ fieldControl : new FormControl() })
// HTML -> <form [formGroup]="form" (ngSubmit)="handleSubmitFn()"
// HTML -> <field formControlName="fieldControl"/>