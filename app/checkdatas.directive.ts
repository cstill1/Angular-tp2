import { Directive,Input,ElementRef } from '@angular/core';

@Directive({
  selector: '[appCheckdatas]'
})
export class CheckdatasDirective {
  @Input() appCheckdatas : Boolean = false;
 
  constructor(private elementHTML? : ElementRef) { 
   
  }
  ngOnChanges()  {
    if (!this.appCheckdatas) 
      this.elementHTML.nativeElement.style.backgroundColor = 'red';
    else 
      this.elementHTML.nativeElement.style.backgroundColor = 'green';
}
}
