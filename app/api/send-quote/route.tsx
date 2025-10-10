import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const DESTINATION_EMAIL = "satayman41@gmail.com"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const {
      selectedPack,
      nom,
      email,
      telephone,
      entreprise,
      adresse,
      secteur,
      typeEspace,
      surface,
      objectifs,
      options,
      delai,
      message,
    } = data

    const isCustomPack = selectedPack === "sur-mesure"
    const packNames = {
      decouverte: "Pack Découverte (2 500 DH)",
      professionnel: "Pack Professionnel (5 500 DH)",
      "sur-mesure": "Pack Sur Mesure (Sur devis)",
    }

    let emailContent = `
      <h2>Nouvelle demande de devis - ${packNames[selectedPack as keyof typeof packNames]}</h2>
      
      <h3>Informations personnelles</h3>
      <ul>
        <li><strong>Nom :</strong> ${nom}</li>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Téléphone :</strong> ${telephone}</li>
        <li><strong>Entreprise :</strong> ${entreprise}</li>
        <li><strong>Adresse du lieu :</strong> ${adresse}</li>
      </ul>
    `

    if (isCustomPack) {
      emailContent += `
        <h3>Détails du projet</h3>
        <ul>
          <li><strong>Secteur d'activité :</strong> ${secteur || "Non spécifié"}</li>
          <li><strong>Type d'espace :</strong> ${typeEspace || "Non spécifié"}</li>
          <li><strong>Surface :</strong> ${surface ? `${surface} m²` : "Non spécifié"}</li>
          <li><strong>Objectifs :</strong> ${objectifs || "Non spécifié"}</li>
          <li><strong>Options spéciales :</strong> ${options || "Aucune"}</li>
          <li><strong>Délai souhaité :</strong> ${delai || "Non spécifié"}</li>
        </ul>
      `
    } else if (message) {
      emailContent += `
        <h3>Message complémentaire</h3>
        <p>${message}</p>
      `
    }

    await resend.emails.send({
      from: "Ladrissi Com <onboarding@resend.dev>", // You'll need to configure your domain
      to: DESTINATION_EMAIL,
      subject: `Nouvelle demande de devis - ${packNames[selectedPack as keyof typeof packNames]} - ${nom}`,
      html: emailContent,
      replyTo: email,
    })

    return NextResponse.json({ success: true, message: "Email envoyé avec succès" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}
