import INotifierService from "./notifier-service-interface";
import SMSService from "./sms-service";

interface PhoneNumberParts {
  internationalCountryCode: number;
  areaCode: number;
  localCode: number;
}

export default class SMSServiceAdapter implements INotifierService {
  private smsService: SMSService;

  constructor(smsService: SMSService) {
    this.smsService = smsService;
  }

  parseUSPhoneNumber(phoneNumber: string): PhoneNumberParts | null {
    // Remove espaços, hífens, parênteses e outros caracteres não numéricos, exceto o +
    const cleanedNumber = phoneNumber.replace(/[\s-()]/g, "");

    // Regex para capturar: (+1)(XXX)(XXXXXXX)
    // Onde: +1 é o código internacional dos EUA, XXX é o código de área (3 dígitos), e XXXXXXX é o número local (7 dígitos)
    const regex = /^\+1(\d{3})(\d{7})$/;

    const match = cleanedNumber.match(regex);

    if (!match) {
      return null; // Retorna null se o formato não corresponder
    }

    const phoneNumberParts: PhoneNumberParts = {
      internationalCountryCode: parseInt(match[1], 10),
      areaCode: parseInt(match[2], 10),
      localCode: parseInt(match[3], 10),
    };

    return phoneNumberParts;
  }

  sendNotification(phoneNumber: string, message: string): void {
    const phoneNumberParts = this.parseUSPhoneNumber(phoneNumber);

    if (!phoneNumberParts) {
      console.log(
        "Invalid phone number format. Expected format: +1(XXX)(XXXXXXX)"
      );
      return;
    }

    this.smsService.sendSMS(
      message,
      phoneNumberParts.internationalCountryCode,
      phoneNumberParts.areaCode,
      phoneNumberParts.localCode
    );
  }
}
