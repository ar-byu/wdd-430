import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact: Contact;
  @Input() index: number;

  constructor(private contactService: ContactService) {}

}
