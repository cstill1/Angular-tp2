import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl } from '@angular/forms';
import {Component} from '@angular/core';

import { SearchingproductComponent } from './searchingproduct.component';

describe('SearchingproductComponent', () => {
  let component: SearchingproductComponent;
  let fixture: ComponentFixture<SearchingproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchingproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
