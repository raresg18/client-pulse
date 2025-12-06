import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AgentDialog } from './dialog/agent-dialog';

@Component({
  selector: 'app-ai-agents',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatSnackBarModule], 
  templateUrl: './ai-agents.html',
  styleUrl: './ai-agents.scss'
})

export class AiAgents implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  agentsList: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('/agents.json').subscribe(data => {
      this.agentsList = data;
    });
  }

  openAddAgent() {
    const dialogRef = this.dialog.open(AgentDialog);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.agentsList.length + 1;
        result.tasks = '0'; 
        result.rating = 5.0;
        
        this.agentsList.push(result);
        this.snackBar.open('🤖 AI Agent deployed successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  openConfigAgent(agent: any) {
    const dialogRef = this.dialog.open(AgentDialog, { data: agent });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.agentsList.indexOf(agent);
        if (index !== -1) {
          this.agentsList[index] = result;
          this.agentsList = [...this.agentsList]; 
          this.snackBar.open('⚙️ Agent configuration updated!', 'Close', { duration: 3000 });
        }
      }
    });
  }
}