/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (dbError) {
      if (dbError.code === "23505") { // Unique violation
        return NextResponse.json(
          { message: "Already on the waitlist" },
          { status: 200 }
        );
      }
      console.error("Supabase Error:", dbError);
      throw new Error("DB Error: " + (dbError.message || "Unknown DB error"));
    }

    // Supabase Storage URLs for brand assets
    const logoHeader = "https://nxwilezrlztzgwnlljud.supabase.co/storage/v1/object/public/brand-assets/ANCIENTIKA%20MAIN%20LOGO%20Small.png";
    const logoFooter = "https://nxwilezrlztzgwnlljud.supabase.co/storage/v1/object/public/brand-assets/ancientika%20logo%20and%20name%20horizontal%202.png";
    const brandFont = "https://nxwilezrlztzgwnlljud.supabase.co/storage/v1/object/public/brand-assets/PorshaRichela.ttf";

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Ancientika <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Ancientika",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @font-face {
      font-family: 'PorshaRichela';
      src: url('${brandFont}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .brand-font {
      font-family: 'PorshaRichela', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#fcf9f8; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#171717;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fcf9f8;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%;">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${logoHeader}" alt="Ancientika" width="60" style="display:block; border:0;" />
            </td>
          </tr>

          <!-- Accent Divider -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="width:60px; height:2px; background-color:#af6e4d;"></div>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding-bottom:24px;">
              <h2 class="brand-font" style="margin:0 0 16px; font-size:24px; font-weight:400; color:#583e37; text-align:center;">
                Welcome to the Waitlist
              </h2>
              <p style="margin:0 0 16px; font-size:15px; line-height:1.7; color:#444; text-align:center;">
                Thank you for joining <span class="brand-font">Ancientika</span>. You are now part of an exclusive circle — the first to experience what we are building.
              </p>
              <p style="margin:0; font-size:15px; line-height:1.7; color:#444; text-align:center;">
                We are crafting contemporary minimal wear with intention and restraint. Every piece is designed to move with you, last beyond seasons, and embody quiet confidence.
              </p>
            </td>
          </tr>

          <!-- Accent Divider -->
          <tr>
            <td align="center" style="padding:16px 0 24px;">
              <div style="width:40px; height:1px; background-color:#af6e4d;"></div>
            </td>
          </tr>

          <!-- Brand Quote -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0; font-size:14px; font-style:italic; color:#af6e4d; letter-spacing:1px;">
                "Premium, defined by less."
              </p>
            </td>
          </tr>

          <!-- Social Icons -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0 0 16px; font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#999;">
                Follow the Journey
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 15px;">
                    <a href="https://instagram.com/ancientika" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="24" style="display:block; border:0;" />
                    </a>
                  </td>
                  <td style="padding: 0 15px;">
                    <a href="https://tiktok.com/@ancientika" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" width="24" style="display:block; border:0;" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Logo -->
          <tr>
            <td align="center" style="background-color:#583e37; padding:32px 20px; border-radius:4px;">
              <img src="${logoFooter}" alt="Ancientika" width="200" style="display:block; margin-bottom:12px; border:0;" />
              <p style="margin:0; font-size:11px; color:#af6e4d; letter-spacing:1px;">
                Where contemporary minimalism meets modern elegance.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
              `,
    });

    if (emailError) {
      console.error("Resend Error:", emailError);
      throw new Error("Email Error: " + (emailError.message || "Failed to send email"));
    }

    console.log("Email sent successfully:", emailData);

    return NextResponse.json(
      { message: "Thank you for joining our waitlist" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("WAITLIST API ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

