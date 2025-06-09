import { OrderModel, OrderService } from "./order-service";

async function main() {
  const orderService = new OrderService();
  const newOrderModel = new OrderModel("1", 100, "+11234567890");

  await orderService.saveOrder(newOrderModel);
}

main();
