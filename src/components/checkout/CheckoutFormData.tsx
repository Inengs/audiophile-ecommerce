// components/checkout/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Validation Schema
const checkoutSchema = z
  .object({
    // Billing Details
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),
    email: z.string().email("Invalid email address").toLowerCase(),
    phone: z
      .string()
      .regex(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Invalid phone number"
      ),

    // Shipping Info
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address is too long"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
    city: z
      .string()
      .min(2, "City name is required")
      .max(50, "City name is too long"),
    country: z.string().min(2, "Country is required"),

    // Payment Method
    paymentMethod: z.enum(["e-money", "cash"], {
      required_error: "Please select a payment method",
    }),

    // E-Money Details (conditional)
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .refine(
    (data) => {
      // If payment method is e-money, require e-money fields
      if (data.paymentMethod === "e-money") {
        return data.eMoneyNumber && data.eMoneyPin;
      }
      return true;
    },
    {
      message: "E-Money details are required",
      path: ["eMoneyNumber"],
    }
  );

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  onSuccess: (orderId: string) => void;
}

export default function CheckoutForm({
  cartItems,
  onSuccess,
}: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // 1. Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: {
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
          shippingAddress: {
            address: data.address,
            zipCode: data.zipCode,
            city: data.city,
            country: data.country,
          },
          items: cartItems,
          paymentMethod: data.paymentMethod,
          totals: { subtotal, shipping, vat, grandTotal },
        }),
      });

      if (!orderRes.ok) throw new Error("Order failed");

      const { orderId } = await orderRes.json();

      // 2. Send confirmation email
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          email: data.email,
          name: data.name,
        }),
      });

      // 3. Redirect to confirmation
      router.push(`/confirmation/${orderId}`);
      onSuccess(orderId);
    } catch (error) {
      console.error(error);
      setSubmitError("Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50; // Fixed shipping cost
  const vat = subtotal * 0.2; // 20% VAT
  const grandTotal = subtotal + shipping + vat;

  const onSubmit = async (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Save order to Convex
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: {
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
          shippingAddress: {
            address: data.address,
            zipCode: data.zipCode,
            city: data.city,
            country: data.country,
          },
          items: cartItems,
          paymentMethod: data.paymentMethod,
          totals: {
            subtotal,
            shipping,
            vat,
            grandTotal,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const { orderId } = await response.json();

      // Send confirmation email
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          email: data.email,
          name: data.name,
        }),
      });

      // Clear cart (you'd implement this in your cart hook)
      // clearCart();

      // Redirect to confirmation page
      router.push(`/confirmation/${orderId}`);
      onSuccess(orderId);
    } catch (error) {
      console.error("Checkout error:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Billing Details */}
      <section className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-orange-500">
          Billing Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Alexei Ward"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="alexei@mail.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+1 202-555-0136"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-orange-500">
          Shipping Info
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="address" className="block text-sm font-bold mb-2">
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="1137 Williams Avenue"
              aria-invalid={errors.address ? "true" : "false"}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
              <p
                id="address-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-bold mb-2">
                ZIP Code
              </label>
              <input
                id="zipCode"
                type="text"
                {...register("zipCode")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.zipCode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="10001"
                aria-invalid={errors.zipCode ? "true" : "false"}
                aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
              />
              {errors.zipCode && (
                <p
                  id="zipCode-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-bold mb-2">
                City
              </label>
              <input
                id="city"
                type="text"
                {...register("city")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="New York"
                aria-invalid={errors.city ? "true" : "false"}
                aria-describedby={errors.city ? "city-error" : undefined}
              />
              {errors.city && (
                <p
                  id="city-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-bold mb-2">
              Country
            </label>
            <input
              id="country"
              type="text"
              {...register("country")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="United States"
              aria-invalid={errors.country ? "true" : "false"}
              aria-describedby={errors.country ? "country-error" : undefined}
            />
            {errors.country && (
              <p
                id="country-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.country.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Payment Details */}
      <section className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-orange-500">
          Payment Details
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-bold mb-3">Payment Method</p>
            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === "e-money"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value="e-money"
                  {...register("paymentMethod")}
                  className="mr-3"
                />
                <span>e-Money</span>
              </label>

              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === "cash"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value="cash"
                  {...register("paymentMethod")}
                  className="mr-3"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {paymentMethod === "e-money" && (
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="eMoneyNumber"
                  className="block text-sm font-bold mb-2"
                >
                  e-Money Number
                </label>
                <input
                  id="eMoneyNumber"
                  type="text"
                  {...register("eMoneyNumber")}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.eMoneyNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="238521993"
                />
                {errors.eMoneyNumber && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.eMoneyNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="eMoneyPin"
                  className="block text-sm font-bold mb-2"
                >
                  e-Money PIN
                </label>
                <input
                  id="eMoneyPin"
                  type="password"
                  {...register("eMoneyPin")}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.eMoneyPin ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="6891"
                />
                {errors.eMoneyPin && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.eMoneyPin.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Submit Error */}
      {submitError && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || cartItems.length === 0}
        className="w-full bg-orange-500 text-white font-bold py-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting
          ? "Processing..."
          : `Continue & Pay $${grandTotal.toFixed(2)}`}
      </button>
    </form>
  );
}
