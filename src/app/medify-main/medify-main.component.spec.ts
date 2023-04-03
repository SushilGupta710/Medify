import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedifyMainComponent } from './medify-main.component';

describe('MedifyMainComponent', () => {
  let component: MedifyMainComponent;
  let fixture: ComponentFixture<MedifyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedifyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedifyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
