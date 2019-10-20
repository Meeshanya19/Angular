import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientsDataComponent } from './update-patients-data.component';

describe('UpdatePatientsDataComponent', () => {
  let component: UpdatePatientsDataComponent;
  let fixture: ComponentFixture<UpdatePatientsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePatientsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatientsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
