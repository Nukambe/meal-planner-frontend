import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMacrosComponent } from './weekly-macros.component';

describe('WeeklyMacrosComponent', () => {
  let component: WeeklyMacrosComponent;
  let fixture: ComponentFixture<WeeklyMacrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyMacrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyMacrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
