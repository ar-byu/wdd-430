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
  serverCreated = false;
  servers = ['Test Server', 'Test Server 2'];
  showText = false;
  timesClicked: Date[] = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000)
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Server Name: ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }

  onResetUsername() {
    this.username = '';
  }

  onToggleDetails() {
    this.showText = !this.showText;
    // this.timesClicked.push(this.timesClicked.length + 1);
    this.timesClicked.push(new Date())
  }

}
