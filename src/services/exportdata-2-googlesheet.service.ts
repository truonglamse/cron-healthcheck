import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import { GoogleapisService } from './googleapis.service';
import { TelegramService } from './telegram.service';

@injectable({scope: BindingScope.TRANSIENT})
export class Exportdata2GooglesheetService {
  constructor(
    @inject('services.TelegramService') private telegramService: TelegramService,
    @inject('services.GoogleapisService') private googleapisService: GoogleapisService,
  ) {}

  async exportData() {
    
  }
  
}



