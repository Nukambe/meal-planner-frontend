import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateComparisonComponent } from './template-comparison.component';

describe('TemplateComparisonComponent', () => {
  let component: TemplateComparisonComponent;
  let fixture: ComponentFixture<TemplateComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
