import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') textInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = '4';

  constructor(private messageService: MessagesService) {}

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.textInputRef.nativeElement.value;

    const newMessage = new Message("6", subject, message, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.textInputRef.nativeElement.value = "";
  }
}
