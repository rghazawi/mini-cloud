import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files/files.component';
import { FolderContentComponent } from './folder-content/folder-content.component';
const routes: Routes = [{ path: '', component: LoginComponent },{ path: 'login', component: LoginComponent , pathMatch: 'full'}];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
