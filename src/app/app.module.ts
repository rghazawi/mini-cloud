import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FilesComponent } from './files/files.component';
import { Folder } from './folder';
import { ModalComponent } from './modal/modal.component';
import { FolderContentComponent } from './folder-content/folder-content.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'files',
    component: FilesComponent
  },
{
    path: 'folder-content',
    component: FolderContentComponent
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilesComponent,
    ModalComponent,
    FolderContentComponent,
  ],
  imports: [
    BrowserModule,
	 RouterModule.forRoot(routes),
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	AngularFontAwesomeModule,
	BrowserAnimationsModule,
	DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
