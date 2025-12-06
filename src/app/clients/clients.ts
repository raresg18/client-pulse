import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddClientDialog } from './dialog/add-client-dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, MatSnackBarModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  allClients: any[] = [];
  clientList: any[] = [];
  searchText: string = '';

  ngOnInit() {
    this.http.get<any[]>('/clients.json').subscribe(data => {
      this.allClients = data;
      this.clientList = data;
    });
  }

  onSearch() {
    if (!this.searchText) {
      this.clientList = this.allClients;
    } else {
      const term = this.searchText.toLowerCase();
      this.clientList = this.allClients.filter(client => 
        client.name.toLowerCase().includes(term) || 
        client.company.toLowerCase().includes(term)
      );
    }
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddClientDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allClients = [result, ...this.allClients];
        this.onSearch();
        this.snackBar.open('Client added successfully', 'Close', { duration: 3000 });
      }
    });
  }

  openEditDialog(client: any) {
    const dialogRef = this.dialog.open(AddClientDialog, { data: client });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.allClients.indexOf(client);
        if (index !== -1) {
          this.allClients[index] = result;
          this.onSearch(); 
          this.snackBar.open('Client updated successfully', 'Close', { duration: 3000 });
        }
      }
    });
  }

  deleteClient(client: any) {
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      this.allClients = this.allClients.filter(c => c !== client);
      this.onSearch();
      this.snackBar.open('Client deleted successfully', 'Close', { duration: 3000 });
    }
  }
}