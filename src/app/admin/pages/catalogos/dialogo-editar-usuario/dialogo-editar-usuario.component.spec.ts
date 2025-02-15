import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEditarUsuarioComponent } from './dialogo-editar-usuario.component';

describe('DialogoEditarUsuarioComponent', () => {
  let component: DialogoEditarUsuarioComponent;
  let fixture: ComponentFixture<DialogoEditarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoEditarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
