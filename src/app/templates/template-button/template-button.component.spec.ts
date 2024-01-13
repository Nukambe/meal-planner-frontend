import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateButtonComponent } from './template-button.component';

describe('TemplateButtonComponent', () => {
  let component: TemplateButtonComponent;
  let fixture: ComponentFixture<TemplateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
