interface INotifierService {
  sendNotification(phoneNumber: string, message: string): void;
}

export default INotifierService;
