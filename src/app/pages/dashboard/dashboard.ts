import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);

  totalClients: number = 0;
  activeProjects: number = 0;
  totalAgents: number = 0;
  totalRevenue: string = '€0';

  ngOnInit() {
    forkJoin({
      clients: this.http.get<any[]>('/clients.json'),
      agents: this.http.get<any[]>('/agents.json')
    }).subscribe(({ clients, agents }) => {
      
      this.totalClients = clients.length;

      this.activeProjects = clients.filter(c => c.status === 'Active').length;

      this.totalAgents = agents.length;

      this.totalRevenue = '€' + (this.totalClients * 1.5).toFixed(1) + 'M'; 
    });
  }
}