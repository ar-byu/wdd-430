import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact [] = [];
  maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(index: number): Contact {
    return this.contacts[index]
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = +contact.id
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
   }

   addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact)
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

}
