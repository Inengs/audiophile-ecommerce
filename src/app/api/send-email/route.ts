// ============================================
// STEP 2: src/app/api/send-email/route.ts
// ============================================
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const resend = new Resend(process.env.RESEND_API_KEY);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const { orderId, email, name } = await request.json();

    if (!orderId || !email || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Fetch order from Convex
    const order = await convex.query(api.orders.getOrder, {
      orderId: orderId as any,
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Format date
    const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f6f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; max-width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #191919; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: 2px; text-transform: lowercase;">audiophile</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #191919; font-size: 24px; text-align: center;">Thank You For Your Order!</h2>
              
              <p style="margin: 0 0 15px; color: #525252; font-size: 16px; line-height: 24px;">Hi ${name},</p>
              
              <p style="margin: 0 0 20px; color: #525252; font-size: 16px; line-height: 24px;">
                We've received your order and it's being processed. You'll receive a shipping confirmation email soon.
              </p>
              
              <!-- Order Summary Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0; background-color: #f9f9f9; border: 1px solid #e5e5e5; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%">
                      <tr>
                        <td width="50%">
                          <p style="margin: 0 0 5px; color: #7d7d7d; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
                          <p style="margin: 0; color: #191919; font-size: 15px; font-weight: bold;">#${orderId.slice(0, 12).toUpperCase()}</p>
                        </td>
                        <td width="50%" style="text-align: right;">
                          <p style="margin: 0 0 5px; color: #7d7d7d; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Order Date</p>
                          <p style="margin: 0; color: #191919; font-size: 15px; font-weight: bold;">${orderDate}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Order Items -->
              <h3 style="margin: 25px 0 15px; color: #191919; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Order Details</h3>
              
              ${order.items
                .map(
                  (item) => `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                  <tr>
                    <td width="65%">
                      <p style="margin: 0 0 3px; color: #191919; font-size: 14px; font-weight: 600;">${item.name}</p>
                      <p style="margin: 0; color: #7d7d7d; font-size: 13px;">Quantity: ${item.quantity}</p>
                    </td>
                    <td width="35%" style="text-align: right; vertical-align: middle;">
                      <p style="margin: 0; color: #191919; font-size: 14px; font-weight: 600;">$${(item.price * item.quantity).toLocaleString()}</p>
                    </td>
                  </tr>
                </table>
              `
                )
                .join("")}
              
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;">
              
              <!-- Totals -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 10px 0;">
                <tr>
                  <td><p style="margin: 0 0 6px; color: #7d7d7d; font-size: 14px;">Subtotal</p></td>
                  <td style="text-align: right;"><p style="margin: 0 0 6px; color: #191919; font-size: 14px; font-weight: 600;">$${order.subtotal.toLocaleString()}</p></td>
                </tr>
                <tr>
                  <td><p style="margin: 0 0 6px; color: #7d7d7d; font-size: 14px;">Shipping</p></td>
                  <td style="text-align: right;"><p style="margin: 0 0 6px; color: #191919; font-size: 14px; font-weight: 600;">$${order.shipping}</p></td>
                </tr>
                <tr>
                  <td><p style="margin: 0 0 6px; color: #7d7d7d; font-size: 14px;">VAT (Included)</p></td>
                  <td style="text-align: right;"><p style="margin: 0 0 6px; color: #191919; font-size: 14px; font-weight: 600;">$${order.vat.toLocaleString()}</p></td>
                </tr>
              </table>
              
              <hr style="border: none; border-top: 2px solid #191919; margin: 15px 0;">
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td><p style="margin: 0; color: #191919; font-size: 15px; font-weight: bold; text-transform: uppercase;">Grand Total</p></td>
                  <td style="text-align: right;"><p style="margin: 0; color: #d87d4a; font-size: 17px; font-weight: bold;">$${order.grandTotal.toLocaleString()}</p></td>
                </tr>
              </table>
              
              <!-- Shipping Address -->
              <h3 style="margin: 25px 0 10px; color: #191919; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Shipping Address</h3>
              <p style="margin: 0; color: #525252; font-size: 14px; line-height: 20px;">
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.zipCode}<br>
                ${order.shippingAddress.country}
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0 20px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/confirmation/${orderId}" 
                       style="display: inline-block; background-color: #d87d4a; color: #ffffff; text-decoration: none; padding: 12px 35px; border-radius: 0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                      View Order Details
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Support Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0 0; background-color: #f9f9f9; border-radius: 8px;">
                <tr>
                  <td style="padding: 18px;">
                    <p style="margin: 0 0 8px; color: #191919; font-size: 13px; font-weight: bold;">Need Help?</p>
                    <p style="margin: 0; color: #525252; font-size: 13px; line-height: 19px;">
                      Contact us at <a href="mailto:support@audiophile.com" style="color: #d87d4a; text-decoration: none; font-weight: 600;">support@audiophile.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f1f1; padding: 20px; text-align: center;">
              <p style="margin: 0 0 4px; color: #7d7d7d; font-size: 11px;">© 2025 Audiophile. All rights reserved.</p>
              <p style="margin: 0; color: #7d7d7d; font-size: 11px;">This email was sent because you placed an order.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>", // Use test domain
      to: [email],
      subject: `Order #${orderId.slice(0, 12).toUpperCase()} Confirmed`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Resend API error");
    }

    return NextResponse.json({
      success: true,
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

// ============================================
// STEP 3: Use in your checkout form
// ============================================
/*
// In src/components/checkout/CheckoutForm.tsx

const onSubmit = async (data: CheckoutFormData) => {
  setIsSubmitting(true);
  
  try {
    // 1. Create order
    const orderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerDetails: {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        shippingAddress: {
          address: data.address,
          zipCode: data.zipCode,
          city: data.city,
          country: data.country
        },
        items: cartItems,
        paymentMethod: data.paymentMethod,
        totals: { subtotal, shipping, vat, grandTotal }
      })
    });

    if (!orderRes.ok) throw new Error('Order failed');
    
    const { orderId } = await orderRes.json();

    // 2. Send confirmation email
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        email: data.email,
        name: data.name
      })
    });

    // 3. Redirect to confirmation
    router.push(`/confirmation/${orderId}`);
    onSuccess(orderId);
    
  } catch (error) {
    console.error(error);
    setSubmitError('Checkout failed. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
*/
