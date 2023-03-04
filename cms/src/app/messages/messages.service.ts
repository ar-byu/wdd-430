import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxID: number;
  maxMessageID: number;

  constructor(private http: HttpClient) {
    this.messages = [];
   }

  getMessages() {
    this.http
      .get("https://wdd-430-cms-667fc-default-rtdb.firebaseio.com/messages.json")
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxID = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
          this.messages = JSON.parse(JSON.stringify(this.messages));
        },
        (errors: any) => {
          console.error(errors)
        }
      )
  }

  storeMessages(messages: Message[]) {
    const messagesToString = JSON.stringify(messages);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.getMessages();
    this.http
      .put("https://wdd-430-cms-667fc-default-rtdb.firebaseio.com/messages.json", messagesToString, {headers})
      .subscribe(
        (res) => {
          this.messageChangedEvent.next(this.messages.slice()), res;
        },
        (errors) => {
          console.error(errors)
        }
      );
  }

  getMessage(id: string) {
    this.messages.forEach(message => {
      if (message.id === id) {
        return message;
      }
    })
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = +message.id
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
   }

  addMessage(message: Message) {
    this.maxID++;
    this.messages.push(message);
    this.storeMessages(this.messages)
  }

}
