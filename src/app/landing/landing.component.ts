import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';



@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  usuarioActual: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.usuarioActual = null;
    });
  }
}
