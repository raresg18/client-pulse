import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Clients } from './clients/clients';
import { AiAgents } from './ai-agents/ai-agents';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'clients', component: Clients },
  {path: 'ai-agents', component: AiAgents },
];