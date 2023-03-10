import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router) {

    }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          if (!this.id || this.id === null) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentService.getDocument(this.id)
          if (!this.originalDocument || this.originalDocument === null) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
          
        }
      )
  }

  onCancel() {
    this.router.navigate(['/documents'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    const value = form.value
    let newDocument = new Document(value.id, value.name, value.description, value.url, value.children)
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents'], {relativeTo: this.route});
  }
}
