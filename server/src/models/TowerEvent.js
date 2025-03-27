import { Schema } from "mongoose";
import { TicketSchema } from "./Ticket.js";

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: `Account` },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required: true, minLength: 15, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 1000 },
    location: { type: String, required: true, minLength: 1, maxLength: 500 },
    capacity: { type: Number, required: true, minLength: 1, maxLength: 5000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true },
    type: { type: String, required: true, enum: [`concert`, `convention`, `sport`, `digital`] },


  },
  {
    timestamps: true,
    toJSON: { virtuals: true, }
  }
)
TowerEventSchema.virtual(`creator`, {
  localField: `creatorId`,
  foreignField: `_id`,
  ref: `Account`,
  justOne: true
})

TowerEventSchema.virtual(`ticketCount`, {
  localField: `_id`,
  ref: `Ticket`,
  foreignField: `eventId`,
  justOne: false,
  count: true
})
