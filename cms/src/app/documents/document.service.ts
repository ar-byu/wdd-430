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
    this.http.get("https://wdd-430-cms-667fc-default-rtdb.firebaseio.com/documents.json")
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

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument)
    let documentsListClone = this.documents.slice();
    this.storeDocument(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.storeDocument(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    let pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.storeDocument(documentsListClone);
  }

  storeDocument(documents: Document[]) {
    const documentsToString = JSON.stringify(documents);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.getDocuments();
    this.http
    .put("https://wdd-430-cms-667fc-default-rtdb.firebaseio.com/documents.json", documentsToString, {headers})
    .subscribe(
      (res) => {
        this.documentListChangedEvent.next(this.documents.slice()), res;
      },
      (errors: any) => {
        console.error(errors)
      }
    )

  }
}
