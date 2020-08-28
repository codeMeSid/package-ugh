import { Razorpay } from "razorpay-typescript";
import { IRazorOrderId } from "razorpay-typescript/dist/resources/order";
import { randomBytes } from "crypto";
import { IRazorPaymentId } from "razorpay-typescript/dist/resources/payments";
import { TransactionTypes } from "../enums/transaction-types";
import { successlog } from "./logger";
import { BadRequestError } from "../errors/bad-request-error";

class PaymentHandler {
  private razorpay?: Razorpay;
  init(razorpayId: string, razorpaySecret: string) {
    this.razorpay = new Razorpay({
      authKey: {
        key_id: razorpayId,
        key_secret: razorpaySecret,
      },
    });
    if (this.razorpay) successlog("Payment Handler is running");
  }
  async createOrder(amount: number): Promise<IRazorOrderId | undefined> {
    if (!this.razorpay)
      throw new BadRequestError("Initialising Transaction Failed");
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
  ): Promise<string | undefined> {
    if (!this.razorpay)
      throw new BadRequestError("Initialising Transaction Failed");
    const payment:
      | IRazorPaymentId
      | undefined = await this.razorpay?.payments.fetch(paymentId);
    const order: IRazorOrderId | undefined = await this.razorpay?.orders.fetch(
      orderId
    );

    if (!payment) throw new BadRequestError("Invalid Transaction");
    if (order?.id !== orderId) throw new BadRequestError("Invalid Transaction");
    if (order.status !== "paid")
      throw new BadRequestError("Invalid Transaction");
    if (payment.status !== TransactionTypes.Captured)
      throw new BadRequestError("Invalid Transaction");

    return order.receipt;
  }
}

export const paymentHandler = new PaymentHandler();
