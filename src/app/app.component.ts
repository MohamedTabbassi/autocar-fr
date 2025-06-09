import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { environment } from "./environments/environement.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  template: `
    <div class="app-container">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-header></app-header>
        <main>

      
          <router-outlet></router-outlet>
        </main>
        <app-footer></app-footer>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = "autocar";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Call API when component loads
    this.testApi();
  }

  testApi(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    const url = `${environment.apiBaseUrl}/auth`;
    console.log('Testing API:', url);
    this.http.post<{ success: boolean; message?: string }>(url, { email: "test@example.com", password: "test123" })
      .subscribe({
        next: res => console.log('✅ API Response:', res),
        error: err => console.error('❌ API Error:', err)
      });
  }
}