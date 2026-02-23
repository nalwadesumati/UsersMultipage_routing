import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairsDashboardComponent } from './fairs-dashboard.component';

describe('FairsDashboardComponent', () => {
  let component: FairsDashboardComponent;
  let fixture: ComponentFixture<FairsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
