import { Injectable } from '@angular/core';
import { HttpClient ,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Folder } from './folder';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
	
  loginURL = "http://patient-api-dev.medsolace.com/api/v1/login";
	folder:Folder[] = [];
	userid;
	selectedFolder: Folder;
	selectedfolderChild:Folder[] = [];
	SelectedFolderName=''
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string)  {
	  var httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),

		withCredentials: true, 
		observe: 'response' as 'response'
	}; 
	  this.httpClient.post(this.loginURL,{ username, password},httpOptions).subscribe((response:HttpResponse<any>) => {
		if(response["body"]["data"]["id"]!=null)
		{
				this.userid=response["body"]["data"]["id"]
				this.router.navigate(['/files'])
				console.log("RetrieveDataAfter:",response)
		}
		else
		{
			console.log("Failed")
		}
		console.log("RetrieveDataAfter:",response)
	  }, error =>{console.log("error")})		
  }
  
  getRequest()
  {
	   var httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
		withCredentials: true, 
		observe: 'response' as 'response'
	}; 
	this.folder=[]
	  this.httpClient.get('http://patient-api-dev.medsolace.com/api/v1/users/'+this.userid+'/cloud_categories',httpOptions).subscribe((response) => {
		   console.log("RetrieveDataAfter:",response)
		   for(var i=0;i<response["body"]["data"].length;i++){
			   (this.folder).push({
				  id: response["body"]["data"][i]["id"],
				  name: response["body"]["data"][i]["name"],
				  parent_folder: response["body"]["data"][i]["parent_folder"],
				  display_name: response["body"]["data"][i]["display_name"]
			   })
		   }
	  })		  
  }
  /*uploadFile(img)
  {
	  var parameter={}
	  parameter["folder_id"]=5066
	  parameter["image"]=img
	  parameter["category"]="UNCATEGORIZED"
	 
	  var httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
		withCredentials: true, 
		observe: 'response' as 'response'
	}; 
	  this.httpClient.post('http://patient-api-dev.medsolace.com/api/v1/users/'+this.userid+'/files',parameter,httpOptions).subscribe((response) => {
		   console.log("RetrieveDataAfter:",response)
	  })
  }*/
	AddNewFolder(folderName){
	  var parameter={}
	  parameter["folder_name"]=folderName
	  parameter["parent_id"]=this.selectedFolder["id"]
		var httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
			withCredentials: true, 
			observe: 'response' as 'response'
		}; 
		this.httpClient.post('http://patient-api-dev.medsolace.com/api/v1/users/'+this.userid+'/folders',parameter,httpOptions).subscribe((response) => {
		   console.log("AddNewFolder:",response)
			this.getSelectedFolder()

		})
	}
	getSelectedFolder(){
		var httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
			withCredentials: true, 
			observe: 'response' as 'response'
		}; 
		this.selectedfolderChild=[]
		this.httpClient.get('http://patient-api-dev.medsolace.com/api/v1/users/'+this.userid+'/cloud/categories/'+this.selectedFolder["name"],httpOptions).subscribe((response) => {
			   console.log("selectedfolderChild:",response)
			   for(var i=0;i<response["body"]["data"]["folders"].length;i++){
				   (this.selectedfolderChild).push({
					  id: response["body"]["data"]["folders"][i]["id"],
					  name: response["body"]["data"]["folders"][i]["name"],
					  parent_folder: response["body"]["data"]["folders"][i]["parent_folder"],
						display_name: response["body"]["data"]["folders"][i]["display_name"]
				   })
			   }
		})
	}

	DeleteFolder(folderid){
			var httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
			withCredentials: true, 
			observe: 'response' as 'response'
			};
			this.httpClient.delete('http://patient-api-dev.medsolace.com/api/v1/users/'+this.userid+'/files/delete?folder_ids[]='+folderid,httpOptions).subscribe((response) => {
				console.log("deleteFile:",response)
			})
			this.getSelectedFolder()

	}
}
