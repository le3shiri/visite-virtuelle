import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, fileName } = body

    const recipientEmail = "anasahaddad788@gmail.com"

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #f472b6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #14b8a6; margin-bottom: 5px; }
            .value { background: white; padding: 12px; border-radius: 5px; border-left: 3px solid #14b8a6; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📚 Nouvelle Candidature Formation</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Ladrissi Com - Espace Formation</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nom complet</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">📱 Téléphone</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">📄 CV / Portfolio</div>
                <div class="value">${fileName || "Non fourni"}</div>
              </div>
              
              <div class="footer">
                <p>Cette candidature a été envoyée depuis le formulaire de formation sur ladrissi.com</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: "Ladrissi Com <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `Nouvelle candidature formation - ${name}`,
      html: emailHtml,
    })

    return NextResponse.json({ success: true, message: "Candidature envoyée avec succès" })
  } catch (error) {
    console.error("Error sending formation email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de la candidature" }, { status: 500 })
  }
}
