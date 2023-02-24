import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { DndModule } from 'ng2-dnd/src/dnd.module';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(private ContactService: ContactService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id || this.id === null) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.ContactService.getContact(+this.id)
        if (!this.originalContact || this.originalContact === null) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact))
        if (this.contact.group) {
          this.groupContacts = this.contact.group.slice()
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group)
    if (this.editMode === true) {
      this.ContactService.updateContact(this.originalContact, newContact)
    } else {
      this.ContactService.addContact(newContact)
    }
    this.router.navigate(['/contacts'], {relativeTo: this.route})
  }

  onCancel() {
    this.router.navigate(['/contacts'], {relativeTo: this.route})
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
