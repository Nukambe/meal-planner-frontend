import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosModalComponent } from './macros-modal.component';

describe('MacrosModalComponent', () => {
  let component: MacrosModalComponent;
  let fixture: ComponentFixture<MacrosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacrosModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MacrosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
