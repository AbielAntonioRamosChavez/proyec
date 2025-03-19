import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-headermenu',
  standalone: false,
  templateUrl: './headermenu.component.html',
  styleUrl: './headermenu.component.css'
})
export class HeadermenuComponent {
  constructor(private auth_service: AuthService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    const targetElement = event.target as HTMLElement;

    // Toggle Sidebar
    if (targetElement.id === 'sidebarToggle' || targetElement.closest('#sidebarToggle')) {
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', JSON.stringify(document.body.classList.contains('sb-sidenav-toggled')));
    }

    // Toggle Dropdown
    if (targetElement.id === 'navbarDropdown' || targetElement.closest('#navbarDropdown')) {
      const dropdownMenu = document.querySelector('ul[aria-labelledby="navbarDropdown"]');
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
      }
    }

    // 🔹 Cerrar sesión
    if (targetElement.id === 'logout' || targetElement.closest('#logout')) {
      this.logout();
    }
  }

  logout(): void {
    this.auth_service.logout().subscribe({
      next: () => console.log('Sesión cerrada correctamente'),
      error: (err) => console.error('Error al cerrar sesión:', err),
    });
  }
}
