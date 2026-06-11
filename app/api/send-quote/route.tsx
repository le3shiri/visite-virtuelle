import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build")

const DESTINATION_EMAIL = "anasahaddad788@gmail.com"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const {
      nom,
      email,
      telephone,
      entreprise,
      typeLocal,
      dateTournage,
      heureTournage,
      message,
      surface,
      points,
      price,
    } = data

    let emailContent = `
      <h2>Nouvelle demande de réservation</h2>
      
      <h3>Informations du client</h3>
      <ul>
        <li><strong>Nom :</strong> ${nom}</li>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Téléphone :</strong> ${telephone}</li>
        <li><strong>Entreprise :</strong> ${entreprise || 'Non spécifiée'}</li>
        <li><strong>Type de local :</strong> ${typeLocal}</li>
        <li><strong>Date souhaitée :</strong> ${dateTournage ? new Date(dateTournage).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Non spécifiée'}</li>
        <li><strong>Heure :</strong> ${heureTournage || 'Non spécifiée'}</li>
      </ul>
    `

    if (surface || points || price) {
      emailContent += `
        <h3>Détails du calculateur de tarif</h3>
        <ul>
          ${surface ? `<li><strong>Superficie :</strong> ${surface} m²</li>` : ""}
          ${points ? `<li><strong>Points d'information :</strong> ${points}</li>` : ""}
          ${price ? `<li><strong>Tarif estimé :</strong> ${Number(price).toLocaleString("fr-FR")} DH</li>` : ""}
        </ul>
      `
    }

    if (message) {
      emailContent += `
        <h3>Message complémentaire</h3>
        <p>${message}</p>
      `
    }

    await resend.emails.send({
      from: "Ladrissi Com <onboarding@resend.dev>",
      to: DESTINATION_EMAIL,
      subject: `Nouvelle Réservation - ${nom}`,
      html: emailContent,
      replyTo: email,
    })

    return NextResponse.json({ success: true, message: "Email envoyé avec succès" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}
