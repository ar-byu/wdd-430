import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') textInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Anna';

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.textInputRef.nativeElement.value;

    const newMessage = new Message(15, subject, message, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.textInputRef.nativeElement.value = "";
  }
}
