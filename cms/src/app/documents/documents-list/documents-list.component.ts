import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'Grocery List', 'A list of groceries', '/document-items/groceries.txt', null),
    new Document(2, 'Weekly To-Do', 'Tasks this week', '/document-items/todo.txt', null),
    new Document(3, 'Semester Schedule', 'Schedule for this semester', '/document-items/semestersched.txt', null),
    new Document(4, 'Budget and Savings', 'Money management plan', '/document-items/budget.txt', null)
  ]

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
