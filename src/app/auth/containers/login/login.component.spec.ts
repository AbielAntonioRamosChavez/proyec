import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // Para manejar rutas en pruebas
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para pruebas de servicios HTTP

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent], // Declaramos el componente a probar
      imports: [
        ReactiveFormsModule, // Si utiliza formularios reactivos
        FormsModule,         // Si utiliza formularios template-driven
        RouterTestingModule, // Para simular rutas
        HttpClientTestingModule // Simula solicitudes HTTP
      ],
    }).compileComponents(); // Compila el componente y sus plantillas
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance; // Instancia el componente
    fixture.detectChanges(); // Detecta cambios iniciales en la plantilla
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });
});
