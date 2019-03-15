import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import { FolderContentComponent } from '../folder-content/folder-content.component';
import { Folder } from '../folder';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent implements OnInit {
	folders;
  constructor(private apiService: ApiService, private router: Router) 
  {if(apiService.userid==null)
	{
		this.router.navigate(['/'])
	}
	else
	{
		apiService.getRequest();
		this.folders = apiService.folder;
		
	}
}

  ngOnInit() {
  }
  /*uploadImage(event) {
	let reader = new FileReader();
    let file = reader.readAsDataURL(event.target.files[0]);
	reader.onload = (event) => {
		this.apiService.uploadFile(reader.result);
      }
	
  }*/
	onSelect(folder: Folder): void {
	  this.apiService.selectedFolder = folder;
	this.router.navigate(['/folder-content']);

	}

}