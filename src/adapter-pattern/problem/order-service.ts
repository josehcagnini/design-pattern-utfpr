import NotifierService from "./notifier-service";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class OrderModel {
  id: string;
  amount: number;
  phoneNumber: string;

  constructor(id: string, amount: number, phoneNumber: string) {
    this.id = id;
    this.amount = amount;
    this.phoneNumber = phoneNumber;
  }
}

export class OrderService {
  private validateOrder(order: OrderModel): boolean {
    console.log("Validating order...");

    // Verifica se o pedido tem um id e um valor
    if (!order.id || !order.amount) {
      return false;
    }
    // Verifica se o valor é maior do que zero
    if (order.amount <= 0) {
      return false;
    }
    return true;
  }

  private async processPayment(order: OrderModel): Promise<void> {
    // Simula o processamento do pagamento
    console.log(
      `Processing payment for order ${order.id} of amount ${order.amount}`
    );
    await delay(1000);
    console.log("Payment processed");
  }

  private async createOrder(order: OrderModel): Promise<void> {
    // Simula a cria o do pedido no banco de dados
    console.log("Creating order...");
    await delay(1000);
    console.log("Order created");
  }

  private sendNotification(order: OrderModel): void {
    // Simula o envio de uma notificação

    const notifier: NotifierService = new NotifierService();
    notifier.sendNotification(
      order.phoneNumber,
      `Order ${order.id} created successfully!`
    );
  }

  async saveOrder(order: OrderModel): Promise<Promise<void>> {
    // 1. Verifica se o pedido é válido
    if (!this.validateOrder(order)) {
      throw new Error("Invalid order");
    }
    // 2. prossegue para o pagamento
    await this.processPayment(order);

    // 3. Salva o pedido no banco de dados
    await this.createOrder(order);

    // 4. Envia uma notificação
    this.sendNotification(order);
  }
}
