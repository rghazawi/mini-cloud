import { Component, OnInit ,Input } from '@angular/core';
import { Folder } from '../folder';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.less']
})
export class FolderContentComponent implements OnInit {
  folderInfo: Folder;
	folders
  constructor(private apiService: ApiService) { }

  ngOnInit() {
	this.folderInfo = this.apiService.selectedFolder
	this.apiService.getSelectedFolder()
	this.folders = this.apiService.selectedfolderChild
  }
	deletefolder(folderid){
		this.apiService.DeleteFolder(folderid);
	}
}
