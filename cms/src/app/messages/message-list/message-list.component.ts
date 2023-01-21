import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, "Grading Request", "Hi, is it possible to round up my grade to 98? I had an issue submitting so I couldn't get it in on time.", "Anna"),
    new Message(2, "Re: Grading Request", "I will round it up this time, but I won't be able to do it again.", "Bro. Thompson"),
    new Message(3, "Re: Grading Request", "Thank you very much! I won't miss any more assignments after this.", "Anna")
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
