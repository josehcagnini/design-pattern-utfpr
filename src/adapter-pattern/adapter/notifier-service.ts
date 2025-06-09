export default class NotifierService {
  public sendNotification(phoneNumber: string, message: string): void {
    console.log(`Notification to ${phoneNumber}: ${message}`);
  }
}
