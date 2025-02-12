import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondeventasComponent } from './gestiondeventas.component';

describe('GestiondeventasComponent', () => {
  let component: GestiondeventasComponent;
  let fixture: ComponentFixture<GestiondeventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestiondeventasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestiondeventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
