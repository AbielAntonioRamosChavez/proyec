import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntodeventaComponent } from './puntodeventa.component';

describe('PuntodeventaComponent', () => {
  let component: PuntodeventaComponent;
  let fixture: ComponentFixture<PuntodeventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuntodeventaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntodeventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
