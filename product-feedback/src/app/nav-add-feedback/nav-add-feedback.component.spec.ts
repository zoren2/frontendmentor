import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAddFeedbackComponent } from './nav-add-feedback.component';

describe('NavAddFeedbackComponent', () => {
  let component: NavAddFeedbackComponent;
  let fixture: ComponentFixture<NavAddFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAddFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
