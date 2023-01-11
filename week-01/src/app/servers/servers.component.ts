import { Component } from '@angular/core';

@Component({
  selector: '[app-servers]',
  templateUrl: 'servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';
  username = '';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000)
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Server Name: ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }

  onResetUsername() {
    this.username = '';
  }



}
