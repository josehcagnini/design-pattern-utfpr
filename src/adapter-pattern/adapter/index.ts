import SMSServiceAdapter from "./sms-service-adapter";
import { OrderModel, OrderService } from "./order-service";
import SMSService from "./sms-service";

async function main() {
  const notifierService = new SMSService();
  const notifierServiceAdapter = new SMSServiceAdapter(notifierService);
  const orderService = new OrderService(notifierServiceAdapter);

  const newOrderModel = new OrderModel("1", 100, "+11234567890");

  await orderService.saveOrder(newOrderModel);
}

main();
