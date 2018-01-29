import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    console.log(user);
    if (!this.validateService.validateRegister(user)) {
      this.flashMessages.show("Please fill in all fields", flashAlertSettings);
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show("Please use a valid email address", flashAlertSettings);
      return false;
    }
  }
}

var flashAlertSettings = {
  cssClass: 'alert-danger',
  timeOut: 3000
}
