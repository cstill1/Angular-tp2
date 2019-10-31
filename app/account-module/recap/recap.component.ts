import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']

  
  
})
export class RecapComponent implements OnInit {

  constructor(private store:Store) { }
  user :Observable<User[]>;
  ngOnInit() {
    this.store.select(state => state.user.user).subscribe(u => { this.user = u;});
  }

}
