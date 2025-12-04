import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ai-agents',
  standalone: true,
  imports: [CommonModule, MatIconModule], 
  templateUrl: './ai-agents.html',
  styleUrl: './ai-agents.scss'
})
export class AiAgents implements OnInit {
  private http = inject(HttpClient);
  
  agentsList: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('/agents.json').subscribe(data => {
      this.agentsList = data;
    });
  }
}