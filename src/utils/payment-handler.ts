import { Razorpay } from "razorpay-typescript";
import { IRazorOrderId } from "razorpay-typescript/dist/resources/order";
import { randomBytes } from "crypto";
import { IRazorPaymentId } from "razorpay-typescript/dist/resources/payments";
import { TransactionTypes } from "../enums/transaction-types";

class PaymentHandler {
  private razorpay?: Razorpay;
  init(razorpayId: string, razorpaySecret: string) {
    this.razorpay = new Razorpay({
      authKey: {
        key_id: razorpayId,
        key_secret: razorpaySecret,
      },
    });
  }
  async createOrder(amount: number): Promise<IRazorOrderId | undefined> {
    const receipt = randomBytes(4).toString("hex").substr(0, 7);
    return this.razorpay?.orders.create({
      amount,
      currency: "INR",
      payment_capture: 1,
      receipt,
    });
  }

  async verifyTransaction(
    paymentId: string,
    orderId: string
  ): Promise<boolean> {
    const payment:
      | IRazorPaymentId
      | undefined = await this.razorpay?.payments.fetch(paymentId);
    const order: IRazorOrderId | undefined = await this.razorpay?.orders.fetch(
      orderId
    );

    if (!payment) return false;
    if (order?.id !== orderId) return false;
    if (order.status !== "paid") return false;
    if (payment.status !== TransactionTypes.Captured) return false;

    return true;
  }
}

export const paymentHandler = new PaymentHandler();
