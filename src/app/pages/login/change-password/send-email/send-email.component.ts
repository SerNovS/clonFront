import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EmailValues } from '../../models/email-values';
import { EmailPasswordService } from '../email-password.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
})
export class SendEmailComponent implements OnInit {
  mailTo: string;
  emailValues: EmailValues;

  constructor(private emailPasswordService: EmailPasswordService) {}

  ngOnInit(): void {}

  onSendEmail(): void {
    this.emailValues = new EmailValues(this.mailTo);
    this.emailPasswordService.sendEmail(this.emailValues).subscribe(
      (data) => {
        Swal.fire(data.mensaje,'Revisa tu bandeja de entrada','success');
      },
      (err) => {
        Swal.fire('Error',err.error.mensaje,'error');
      }
    );
  }
}
