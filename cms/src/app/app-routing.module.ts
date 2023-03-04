import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsStartComponent } from './contacts/contacts-start/contacts-start.component';
import { ContactResolverService } from './contacts/contact-resolver.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full'},
    { path: 'documents', component: DocumentsComponent, children: [
        {path: '', component: DocumentStartComponent},
        {path: 'new', component: DocumentEditComponent},
        {path: ':id', component: DocumentDetailComponent},
        {path: ':id/edit', component: DocumentEditComponent},
    ] },
    { path: 'contacts', component: ContactsComponent, children: [
        {path: '', component: ContactsStartComponent},
        {path: 'new', component: ContactEditComponent},
        {path: ':id', component: ContactDetailComponent},
        {path: ':id/edit', component: ContactEditComponent}
    ] },
    { path: 'messages', component: MessageListComponent, resolve: [ContactResolverService]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}