export default class SMSService {
  sendSMS(
    text: string,
    internationalCountryCode: number,
    areaCode: number,
    localCode: number
  ): void {
    console.log(
      `Sending SMS to +${internationalCountryCode} ${areaCode}-${localCode}: ${text}`
    );
  }
}
