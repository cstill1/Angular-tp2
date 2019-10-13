import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']

  
  
})
export class RecapComponent implements OnInit {
  @Input() name: string;
  @Input() firstname: string;
  @Input() adresse: string;
  @Input() city: string;
  @Input() cp: string;
  @Input() pays: string;
  @Input() tel: string;
  @Input() login: string;
  @Input() pwd: string;
  @Input() email:string;
  @Input() gender:string;

  constructor() { }

  ngOnInit() {
  }

}
