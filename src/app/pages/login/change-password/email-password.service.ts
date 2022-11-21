import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../models/change-password';
import { EmailValues } from '../models/email-values';

@Injectable({
  providedIn: 'root',
})
export class EmailPasswordService {
  changePasswordURL = environment.changePasswordUrl;
  sendEmailURL = environment.sendEmailURL;

  constructor(private httpClient: HttpClient) {}

  public sendEmail(emailValue: EmailValues): Observable<any> {
    return this.httpClient.post<any>(this.sendEmailURL, emailValue);
  }

  public changePassword(changePass: ChangePassword): Observable<any> {
    return this.httpClient.post<any>(this.changePasswordURL, changePass);
  }
}
