import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import ClassicEditorWithAutosave from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-xml0',
  templateUrl: './xml0.component.html',
  styleUrls: ['./xml0.component.css']
})
export class Xml0Component {

  constructor(private _http: HttpClient) { this.retrieveFile(); }
  retrieveFile() {
    this._http.get('/assets/users.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe(data => {
    console.log(data);
})
  }
  public Editor = ClassicEditorWithAutosave;
  public editorData: any
  public config = {
    allowedContent: true,
    forcePasteAsPlainText: true,
		autosave: {
			waitingTime: 5000,
			save: Editor => this.saveData( Editor.getData() )
		},
	}
	public saveData(data) {
    console.log(data);
    const filename = '/assets/users.xml';
    saveAs(data, filename);
  }

}