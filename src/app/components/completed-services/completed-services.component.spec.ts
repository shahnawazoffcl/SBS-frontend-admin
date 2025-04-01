import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedServicesComponent } from './completed-services.component';

describe('CompletedServicesComponent', () => {
  let component: CompletedServicesComponent;
  let fixture: ComponentFixture<CompletedServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedServicesComponent]
    });
    fixture = TestBed.createComponent(CompletedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
