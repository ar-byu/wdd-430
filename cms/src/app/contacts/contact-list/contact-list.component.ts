import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { DndModule } from 'ng2-dnd/src/dnd.module';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})


export class ContactListComponent {
  contacts: Contact[];
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  search(value: string) {
    this.term = value;
  }

}
