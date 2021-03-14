import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  // @Input() backendErrors: BackendErrorsInterface; // так в коде непонятно, что это пришло извне, поэтому есть риск перезаписать
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface; // тут мы сами задали имя и поэтому понимаем, что это извне

  errorMessages: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name) => {
      const messages = this.backendErrorsProps[name].join(', ');
      return `${name} ${messages}`;
    });
  }
}
