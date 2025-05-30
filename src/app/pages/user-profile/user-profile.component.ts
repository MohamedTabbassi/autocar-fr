
  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterLink } from '@angular/router';
  import { AuthService } from '../../services/auth-service.service';
  import { User } from '../../models/user-model.service';

  @Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
      <div class="profile-container">
        <h2>Mon Profil</h2>
        <div *ngIf="user" class="profile-details">
          <p><strong>Prénom:</strong> {{user.name}}</p>
          <p><strong>Nom:</strong> {{user.name}}</p>
          <p><strong>Email:</strong> {{user.email}}</p>
          <p><strong>Rôle:</strong> {{user.role}}</p>
          <p><strong>Inscrit le:</strong> {{user.createdAt | date:'dd/MM/yyyy'}}</p>
        </div>
        <a routerLink="/home">Retour à l'accueil</a>
      </div>
    `,
    styles: [
      `
        .profile-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .profile-details {
          margin-bottom: 20px;
        }
      `
    ]
  })
  export class UserProfileComponent implements OnInit {
    user: User | null = null;

    constructor(private authService: AuthService) {}

    ngOnInit() {
      this.authService.currentUser$.subscribe(user => {
        this.user = user;
      });
    }
  }
