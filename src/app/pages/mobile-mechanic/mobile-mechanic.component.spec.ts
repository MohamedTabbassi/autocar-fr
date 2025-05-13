import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMechanicComponent } from './mobile-mechanic.component';

describe('MobileMechanicComponent', () => {
  let component: MobileMechanicComponent;
  let fixture: ComponentFixture<MobileMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMechanicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
