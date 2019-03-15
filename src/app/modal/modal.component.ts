import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }
  display: boolean = false;

    showDialog() {
        this.display = true;
    }
	getFolderName(text){
this.apiService.SelectedFolderName=text
		this.apiService.AddNewFolder(text);
		this.display = false;
	}
}
