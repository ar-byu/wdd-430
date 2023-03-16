import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId()
   }

  getDocuments() {
    //return this.documents.slice();
    this.http.get("http://localhost:3000/documents")
    .subscribe(
      (documents: Document[] = []) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => +a.id - +b.id);
        this.documentListChangedEvent.next(this.documents.slice());
        this.documents = JSON.parse(JSON.stringify(this.documents));
      },
      (errors: any) => {
        console.error(errors)
      }
    )
  }

  getDocument(index: number) {
    return this.documents.slice()[index];
  }

 getMaxId(): number {
  let maxId = 0;
  for (let document of this.documents) {
    let currentId = +document.id
    if (currentId > maxId) {
      maxId = currentId
    }
  }
  return maxId;
 }

 addDocument(document: Document) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
    );
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  //newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );
}

deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
}

  storeDocument(documents: Document[]) {
    const documentsToString = JSON.stringify(documents);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.getDocuments();
    this.http
    .put("http://localhost:3000/documents", documentsToString, {headers})
    .subscribe(
      (res) => {
        this.documentListChangedEvent.next(this.documents.slice()), res;
      },
      (errors: any) => {
        console.error(errors)
      }
    )

  }

  sortAndSend(){
    this.documents.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice())
  }

}
