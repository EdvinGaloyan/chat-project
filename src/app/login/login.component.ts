import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from "../services/data.service";
import {CommunicationService} from "../services/communication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnChanges {

  public validationMessage: string;

  public form = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
  });

  constructor(private dataService: DataService,
              private router: Router,
              private communicationService: CommunicationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changed')
  }

  onSubmit() {
    if (this.form.invalid) {
      this.validationMessage = "First Name and Last Name are required Fields";
      return;
    } else {
      this.validationMessage = '';
      const user = this.dataService.getUserByFirstAndLastName(this.form.get('firstName').value, this.form.get('lastName').value);
      if (user) {
        this.router.navigate(['/chat'])
        this.communicationService.subject.next(user.id);
      } else this.validationMessage = 'User not found';
    }
  }
}
