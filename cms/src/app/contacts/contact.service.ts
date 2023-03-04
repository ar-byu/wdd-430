import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact [] = [];
  maxContactId: number;

  constructor(private http: HttpClient) { 
    this.contacts = this.getContacts()
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http.get<Contact[]>("https://wdd-430-cms-667fc-default-rtdb.firebaseio.com/contacts.json")
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (errors: any) => {
        console.error(errors)
      }
    )
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
    this.storeContacts(contactListClone);
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
    this.storeContacts(contactListClone);
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
    this.storeContacts(contactListClone);
  }

  storeContacts(contacts: Contact[]) {
    const contactsToString = JSON.stringify(contacts);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.getContacts();
    this.http
      .put("https://wdd-430-cms-667fc-default-rtdb.firebaseio.com/contacts.json", contactsToString, {headers})
      .subscribe(
        (res) => {
          this.contactListChangedEvent.next(this.contacts.slice()), res;
        },
        (errors) => {
          console.error(errors)
        }
      );
  }

}
