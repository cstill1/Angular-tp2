import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductincartComponent } from './productincart.component';

describe('ProductincartComponent', () => {
  let component: ProductincartComponent;
  let fixture: ComponentFixture<ProductincartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductincartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductincartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
