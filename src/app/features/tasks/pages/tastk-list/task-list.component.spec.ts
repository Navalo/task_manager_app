import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastkListComponent } from './task-list.component';

describe('TastkListComponent', () => {
  let component: TastkListComponent;
  let fixture: ComponentFixture<TastkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TastkListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TastkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
