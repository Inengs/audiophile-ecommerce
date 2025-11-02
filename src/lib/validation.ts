// lib/validation.ts
import { z } from "zod";

export const shippingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(5, "Address is required"),
  zipCode: z.string().min(3, "ZIP code is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
});

export const paymentSchema = z.discriminatedUnion("paymentMethod", [
  z.object({
    paymentMethod: z.literal("eMoney"),
    eMoneyNumber: z
      .string()
      .regex(/^\d{9}$/, "e-Money Number must be 9 digits"),
    eMoneyPin: z.string().regex(/^\d{4}$/, "PIN must be 4 digits"),
  }),
  z.object({
    paymentMethod: z.literal("cash"),
  }),
]);

export const checkoutSchema = z.object({
  shipping: shippingSchema,
  payment: paymentSchema,
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
