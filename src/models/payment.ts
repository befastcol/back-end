// import mongoose, { Schema } from "mongoose";
// import { PaymentInterface } from "../interfaces/payment";

// const PaymentSchema: Schema = new Schema<PaymentInterface>({
//   user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   totalAmount: { type: Number, required: true },
//   paymentDate: { type: Date },
//   status: {
//     type: String,
//     required: true,
//     default: "pending",
//     enum: ["pending", "completed"],
//   },
// });

// export const Payment = mongoose.model<PaymentInterface>(
//   "Payment",
//   PaymentSchema
// );
