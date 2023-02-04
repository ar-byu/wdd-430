import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent {

  documents: Document[];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
