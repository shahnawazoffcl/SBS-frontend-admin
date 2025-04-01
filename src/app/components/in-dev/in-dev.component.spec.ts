import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InDevComponent } from './in-dev.component';

describe('InDevComponent', () => {
  let component: InDevComponent;
  let fixture: ComponentFixture<InDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InDevComponent]
    });
    fixture = TestBed.createComponent(InDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
