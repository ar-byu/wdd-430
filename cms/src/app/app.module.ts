import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { FormsModule } from '@angular/forms';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsStartComponent } from './contacts/contacts-start/contacts-start.component';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentStartComponent,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsStartComponent,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
