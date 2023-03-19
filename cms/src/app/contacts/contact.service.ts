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

   addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      {headers: headers})
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      )
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend;
        }
      )
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(d => d.id === contact.id);
    if (pos < 0) {
      return;
    }
    this.http.delete('http://localhost:3000/contacts' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend;
        }
      )
  }

  storeContacts(contacts: Contact[]) {
    const contactsToString = JSON.stringify(contacts);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.getContacts();
    this.http
      .put("http://localhost:3000/contacts", contactsToString, {headers})
      .subscribe(
        (res) => {
          this.contactListChangedEvent.next(this.contacts.slice()), res;
        },
        (errors) => {
          console.error(errors)
        }
      );
  }

  sortAndSend(){
    this.contacts.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice())
  }

}
