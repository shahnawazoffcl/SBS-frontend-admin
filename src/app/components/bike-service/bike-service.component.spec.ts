import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeServiceComponent } from './bike-service.component';

describe('BikeServiceComponent', () => {
  let component: BikeServiceComponent;
  let fixture: ComponentFixture<BikeServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikeServiceComponent]
    });
    fixture = TestBed.createComponent(BikeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
