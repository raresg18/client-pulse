import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients implements OnInit {
  private http = inject(HttpClient);
  
  clientList: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('/clients.json').subscribe(data => {
      this.clientList = data;
      console.log('Am încărcat clienții:', this.clientList);
    });
  }
}