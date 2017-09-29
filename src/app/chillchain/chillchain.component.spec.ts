import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChillChainComponent as ChillchainComponent} from './chillchain.component';

describe('ChillchainComponent', () => {
  let component: ChillchainComponent;
  let fixture: ComponentFixture<ChillchainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChillchainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChillchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
