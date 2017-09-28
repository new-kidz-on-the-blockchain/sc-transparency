import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierviewcardComponent } from './supplierviewcard.component';

describe('SupplierviewcardComponent', () => {
  let component: SupplierviewcardComponent;
  let fixture: ComponentFixture<SupplierviewcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierviewcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierviewcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
