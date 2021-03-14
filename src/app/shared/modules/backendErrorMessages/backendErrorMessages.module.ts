import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesComponent } from './components/backendErrorMessages/backendErrorMessages.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent], // чтобы компонент можно было использовать не только в данном модуле, но и в других модулях
})
export class BackendErrorMessagesModule {}
