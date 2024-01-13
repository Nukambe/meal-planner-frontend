import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListModalComponent } from './shopping-list-modal.component';

describe('ShoppingListModalComponent', () => {
  let component: ShoppingListModalComponent;
  let fixture: ComponentFixture<ShoppingListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
