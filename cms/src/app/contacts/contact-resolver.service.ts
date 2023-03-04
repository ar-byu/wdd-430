import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Contact } from "./contact.model";
import { ContactService } from "./contact.service";

@Injectable({
    providedIn: "root"
})
export class ContactResolverService implements Resolve<Contact[]> {
    constructor(private contactService: ContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Contact[] {
        const contacts = this.contactService.getContacts();
        return contacts;
    }
}