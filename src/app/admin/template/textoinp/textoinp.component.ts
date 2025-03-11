import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-textoinp',
  standalone: false,
  
  templateUrl: './textoinp.component.html',
  styleUrl: './textoinp.component.css'
})
export class TextoinpComponent {
@Input() label: string= 'input';
@Input() placeholder: string= 'Escribe aca';
@Input() type: 'text'|'number'|'password'='text';
@Input() validation: 'numeric'|'letters'|'alphanumeric'='alphanumeric';
@Output() valueChange = new EventEmitter<string>();
inputControl = new FormControl('',[Validators.required]);
onInputChange (){
  this.valueChange.emit(this.inputControl.value || '');
}
validateInput(event: KeyboardEvent) {
  const char = event.key;
  if (this.validation === 'numeric' && !/^\d$/.test(char)) {
    event.preventDefault();
  } else if (this.validation === 'letters' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(char)) {
    event.preventDefault();
  }
}
}
