import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainComponent } from './train.component';

describe('TrainComponent', () => {
  let component: AdminTrainComponent;
  let fixture: ComponentFixture<AdminTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
