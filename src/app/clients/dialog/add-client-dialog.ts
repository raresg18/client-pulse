import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSelectModule, FormsModule],
  templateUrl: './add-client-dialog.html',
  styles: [`
    :host { display: block; background: white; font-family: 'Inter', sans-serif; }
    .dialog-header { padding: 30px 30px 10px 30px; }
    h2 { font-size: 1.8rem; font-weight: 800; color: #111827; margin: 0; letter-spacing: -0.5px; }
    .subtitle { color: #6b7280; margin: 5px 0 0 0; font-size: 0.9rem; }
    .modern-form { padding: 10px 30px 30px 30px; display: flex; flex-direction: column; gap: 20px; min-width: 400px; }
    .form-group label { display: block; font-size: 0.75rem; font-weight: 700; color: #9ca3af; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
    .input-wrapper { background-color: #f3f4f6; border-radius: 12px; padding: 4px; transition: all 0.3s ease; border: 2px solid transparent; }
    .input-wrapper:focus-within { background-color: white; border-color: #3b82f6; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15); transform: translateY(-1px); }
    input { width: 100%; border: none; background: transparent; padding: 12px 16px; font-size: 1rem; color: #1f2937; font-weight: 500; outline: none; }
    .select-wrapper { padding: 0 16px; height: 48px; display: flex; align-items: center; }
    mat-select { width: 100%; }
    .actions { padding: 20px 30px 30px 30px; display: flex; justify-content: flex-end; gap: 15px; background-color: #fff; }
    .cancel-btn { background: transparent; border: none; color: #6b7280; font-weight: 600; cursor: pointer; padding: 10px 20px; border-radius: 8px; transition: color 0.2s; }
    .cancel-btn:hover { color: #111827; background: #f9fafb; }
    .save-btn { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3); transition: all 0.2s; }
    .save-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4); }
  `]
})
export class AddClientDialog {
  newClient: any = {
    name: '',
    company: '',
    status: 'Active',
    lastMeeting: new Date().toISOString().split('T')[0]
  };

  isEditMode = false; 

  constructor(
    public dialogRef: MatDialogRef<AddClientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    if (data) {
      this.isEditMode = true;
      this.newClient = { ...data };
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.newClient);
  }
}