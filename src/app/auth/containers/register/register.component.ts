import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  loginGoogle() {
    const idToken = 'TOKEN_GENERADO_POR_GOOGLE'; // ⚠️ Obtén esto desde Firebase o Google API
    this.authService.loginWithGoogle(idToken).subscribe();
  }

  

}
