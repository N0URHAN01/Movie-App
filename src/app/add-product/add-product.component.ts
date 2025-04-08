import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
   username: string = 'Ahmed'


   formValue = {
    productName: '',
    description: ''
   }

   handleSubmitForm(form : NgForm){
     console.log(form)
     console.log(form.value)
     if(form.valid){
       console.log(this.formValue)
     }

   }
}
