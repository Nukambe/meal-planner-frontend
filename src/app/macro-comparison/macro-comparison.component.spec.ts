import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroComparisonComponent } from './macro-comparison.component';

describe('MacroComparisonComponent', () => {
  let component: MacroComparisonComponent;
  let fixture: ComponentFixture<MacroComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacroComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MacroComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
