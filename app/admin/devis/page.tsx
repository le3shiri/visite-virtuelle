"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

// ─── Secret access key ────────────────────────────────────────────────────────
const ACCESS_KEY = "VV360DEVIS2026"

// ─── Pricing (must stay in sync with price-calculator.tsx) ────────────────────
const FORFAITS: Record<string, number> = {
  immobilier: 1500,
  commerce:   2000,
  hôtellerie: 3000,
  hotellerie: 3000,
  éducation:  2000,
  education:  2000,
  industrie:  3000,
}

const BASE_500  = 100 * 25 + 150 * 18 + 250 * 14 // 8 700 DH
const BASE_1000 = BASE_500 + 500 * 8              // 12 700 DH

function getAreaCost(s: number): number {
  if (s <= 100)  return s * 25
  if (s <= 250)  return 100 * 25 + (s - 100) * 18
  if (s <= 500)  return 100 * 25 + 150 * 18 + (s - 250) * 14
  if (s <= 1000) return BASE_500 + (s - 500) * 8
  return BASE_1000 + (s - 1000) * 4
}

const INFO_POINT_RATE = 120
const TVA_RATE = 0.20

// ─── Number → French words ────────────────────────────────────────────────────
const UNITS = ["","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix",
  "onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf"]
const TENS  = ["","","vingt","trente","quarante","cinquante","soixante","soixante","quatre-vingt","quatre-vingt"]

function numberToFrench(n: number): string {
  if (n === 0) return "zéro"
  if (n < 0)   return "moins " + numberToFrench(-n)
  let result = ""
  if (n >= 1000) {
    const m = Math.floor(n / 1000)
    result += (m === 1 ? "mille" : numberToFrench(m) + " mille")
    n %= 1000
    if (n > 0) result += " "
  }
  if (n >= 100) {
    const h = Math.floor(n / 100)
    result += (h === 1 ? "cent" : UNITS[h] + " cent")
    n %= 100
    if (n > 0) result += " "
  }
  if (n >= 20) {
    const t = Math.floor(n / 10)
    const u = n % 10
    if (t === 7 || t === 9) {
      result += TENS[t] + (u === 1 && t === 7 ? "-et-" : "-") + UNITS[10 + u]
    } else {
      result += TENS[t] + (u === 1 && t !== 8 ? "-et-" : u > 0 ? "-" : "") + (u > 0 ? UNITS[u] : "")
    }
  } else if (n > 0) {
    result += UNITS[n]
  }
  return result
}

function amountInWords(total: number): string {
  const integer  = Math.floor(total)
  const cents    = Math.round((total - integer) * 100)
  let result     = numberToFrench(integer) + " dirham" + (integer > 1 ? "s" : "")
  if (cents > 0) result += " et " + numberToFrench(cents) + " centime" + (cents > 1 ? "s" : "")
  return result.charAt(0).toUpperCase() + result.slice(1) + " TTC"
}

// ─── Parser ───────────────────────────────────────────────────────────────────
interface DevisData {
  nom:        string
  email:      string
  tel:        string
  entreprise: string
  typeLocal:  string
  superficie: number
  points:     number
  tarif:      number
  date:       string
  heure:      string
  message:    string
}

function parseMessage(raw: string): DevisData | null {
  const get = (key: string) => {
    const regex = new RegExp(`${key}\\s*:\\s*(.+)`, "i")
    const m = raw.match(regex)
    return m ? m[1].trim() : ""
  }
  const nom  = get("Nom")
  const tarif = parseInt((get("Tarif estimé") || get("Tarif estime")).replace(/\s|DH/gi, ""), 10)
  if (!nom) return null
  return {
    nom,
    email:      get("Email"),
    tel:        get("Tél") || get("Tel"),
    entreprise: get("Entreprise") || nom,
    typeLocal:  get("Type de local"),
    superficie: parseInt(get("Superficie").replace(/\s|m²/gi, ""), 10) || 0,
    points:     parseInt(get("Points d.info"), 10) || 0,
    tarif:      isNaN(tarif) ? 0 : tarif,
    date:       get("Date souhaitée") || get("Date souhaitee"),
    heure:      get("Heure"),
    message:    get("Message"),
  }
}

// ─── Devis number generator ───────────────────────────────────────────────────
function generateDevisNum() {
  const now  = new Date()
  const year = now.getFullYear()
  const seq  = String(Math.floor(Math.random() * 900) + 100)
  return `${seq}/${year}`
}

// ─── Signature with transparent background (canvas pixel processing) ──────────
function SignatureImage({ width = 180, height = 120 }: { width?: number; height?: number }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
      // Zero alpha on any near-black pixel (R,G,B all < 60)
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] < 60 && data[i + 1] < 60 && data[i + 2] < 60) {
          data[i + 3] = 0
        }
      }
      const processed = ctx.createImageData(canvas.width, canvas.height)
      processed.data.set(data)
      ctx.putImageData(processed, 0, 0)
      setSrc(canvas.toDataURL("image/png"))
    }
    img.src = "/WhatsApp Image 2026-06-24 at 14.41.18.jpeg"
  }, [])

  if (!src) return <div style={{ width, height }} />
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt="Cachet et signature Ladrissi"
      style={{ width, height, objectFit: "contain" }}
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DevisPage() {
  const [key,         setKey]         = useState("")
  const [unlocked,    setUnlocked]    = useState(false)
  const [raw,         setRaw]         = useState("")
  const [data,        setData]        = useState<DevisData | null>(null)
  const [devisNum,    setDevisNum]    = useState("")
  const [error,       setError]       = useState("")
  const printRef = useRef<HTMLDivElement>(null)

  // Access check
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm space-y-4 shadow-2xl">
          <h1 className="text-white font-black text-xl text-center">🔐 Accès Devis</h1>
          <input
            type="password"
            placeholder="Clé d'accès"
            value={key}
            onChange={e => setKey(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && key === ACCESS_KEY) setUnlocked(true) }}
            className="w-full rounded-xl border border-slate-600 bg-slate-800 text-white px-4 py-3 text-sm outline-none focus:border-teal-400"
          />
          <button
            onClick={() => { if (key === ACCESS_KEY) setUnlocked(true); else setError("Clé incorrecte") }}
            className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 rounded-xl transition-all"
          >
            Accéder
          </button>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
        </div>
      </div>
    )
  }

  const handleGenerate = () => {
    setError("")
    const parsed = parseMessage(raw)
    if (!parsed) { setError("Format de message invalide. Vérifiez le texte collé."); return }
    setData(parsed)
    setDevisNum(generateDevisNum())
  }

  const handlePrint = () => {
    window.print()
  }

  // Recalculate line items from parsed data
  const forfait      = data ? (FORFAITS[data.typeLocal.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] 
                               ?? FORFAITS[data.typeLocal.toLowerCase()] 
                               ?? 2000) : 0
  const areaCost     = data ? getAreaCost(data.superficie) : 0
  const pointsCost   = data ? data.points * INFO_POINT_RATE : 0
  const totalHT      = forfait + areaCost + pointsCost
  const tva          = Math.round(totalHT * TVA_RATE)
  const totalTTC     = totalHT + tva
  const todayStr     = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })

  const fmtDH = (n: number) => n.toLocaleString("fr-FR") + ",00"

  return (
    <>
      {/* ── Print-only styles ── */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          #no-print { display: none !important; }

          /* ← Force background colors & images to print (teal table headers etc.) */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
        @page { size: A4; margin: 12mm 15mm 20mm 15mm; }
      `}</style>

      {/* ── Control panel (no-print) ── */}
      <div id="no-print" className="min-h-screen bg-slate-950 p-6 flex flex-col items-center gap-6">
        <div className="w-full max-w-2xl space-y-4">
          <h1 className="text-white font-black text-2xl text-center">📄 Générateur de Devis VV360</h1>

          <textarea
            value={raw}
            onChange={e => setRaw(e.target.value)}
            placeholder={"Collez ici le message de réservation reçu :\n\nNouvelle demande de réservation :\n🏢 Nom: ...\n📧 Email: ...\n..."}
            className="w-full h-64 rounded-2xl border border-slate-600 bg-slate-900 text-slate-200 px-4 py-3 text-sm font-mono outline-none focus:border-teal-400 resize-none"
          />

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              className="flex-1 bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 rounded-xl transition-all"
            >
              ⚡ Générer le Devis
            </button>
            {data && (
              <button
                onClick={handlePrint}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
              >
                🖨️ Imprimer / Sauvegarder PDF
              </button>
            )}
          </div>
          {error && <p className="text-red-400 text-sm text-center bg-red-950/40 border border-red-800 rounded-xl p-3">{error}</p>}
        </div>

        {/* ── Devis preview ── */}
        {data && (
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden" id="print-area" ref={printRef}>
            <DevisDocument
              data={data}
              devisNum={devisNum}
              todayStr={todayStr}
              forfait={forfait}
              areaCost={areaCost}
              pointsCost={pointsCost}
              totalHT={totalHT}
              tva={tva}
              totalTTC={totalTTC}
              fmtDH={fmtDH}
            />
          </div>
        )}
      </div>

      {/* ── Print-only output (hidden until print) ── */}
      {data && (
        <div className="hidden print:block" id="print-area">
          <DevisDocument
            data={data}
            devisNum={devisNum}
            todayStr={todayStr}
            forfait={forfait}
            areaCost={areaCost}
            pointsCost={pointsCost}
            totalHT={totalHT}
            tva={tva}
            totalTTC={totalTTC}
            fmtDH={fmtDH}
          />
        </div>
      )}
    </>
  )
}

// ─── Devis Document ───────────────────────────────────────────────────────────
function DevisDocument({
  data, devisNum, todayStr,
  forfait, areaCost, pointsCost,
  totalHT, tva, totalTTC, fmtDH
}: {
  data: DevisData; devisNum: string; todayStr: string
  forfait: number; areaCost: number; pointsCost: number
  totalHT: number; tva: number; totalTTC: number
  fmtDH: (n: number) => string
}) {
  const typeLabel = data.typeLocal || "Visite virtuelle"
  
  // Describe area pricing tier for the designation cell
  let areaDesc = ""
  const s = data.superficie
  if (s > 0) {
    if      (s <= 100)  areaDesc = `${s} m² × 25 DH/m²`
    else if (s <= 250)  areaDesc = `Tranches cumulées jusqu'à ${s} m²`
    else if (s <= 500)  areaDesc = `Tranches cumulées jusqu'à ${s} m²`
    else if (s <= 1000) areaDesc = `Tranches cumulées jusqu'à ${s} m²`
    else                areaDesc = `Tranches cumulées jusqu'à ${s} m²`
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#000", padding: "24px", background: "#fff" }}>

      {/* Header */}
      <table style={{ width: "100%", marginBottom: "24px" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", width: "50%" }}>
              <Image
                src="/Logo-Ladrissi-com-Black.png"
                alt="Ladrissi Communication Agency"
                width={160}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </td>
            <td style={{ verticalAlign: "top", textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Tanger, le {todayStr}</p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ paddingTop: "12px" }}>
              <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                Devis Num : &nbsp;&nbsp;{devisNum}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Spacer */}
      <div style={{ height: "24px" }} />

      {/* Client info */}
      <p style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>
        To the attention of : {data.entreprise || data.nom}
      </p>
      <p style={{ margin: "0 0 4px 0" }}>
        <strong>Client :</strong> {data.nom}
      </p>
      <p style={{ margin: "0 0 4px 0" }}>
        <strong>Tél :</strong> {data.tel}
      </p>
      <p style={{ margin: "0 0 4px 0" }}>
        <strong>Email :</strong> {data.email}
      </p>
      {data.date && (
        <p style={{ margin: "0 0 4px 0" }}>
          <strong>Date souhaitée :</strong> {data.date} à {data.heure}
        </p>
      )}

      {/* Spacer */}
      <div style={{ height: "20px" }} />

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "0" }}>
        <thead>
          <tr style={{ background: "#00b5ad", color: "#fff" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "left",   width: "55%" }}>Désignation</th>
            <th style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center", width: "15%" }}>Quantité</th>
            <th style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center", width: "15%" }}>Prix unitaire</th>
            <th style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center", width: "15%" }}>Total en HT</th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 – Forfait */}
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px 10px" }}>
              Visite virtuelle 360° – Forfait {typeLabel}
              <br /><span style={{ fontSize: "10px", color: "#555" }}>Prise de vue, traitement & hébergement 1 an</span>
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>Forfait</td>
            <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>{fmtDH(forfait)}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>{fmtDH(forfait)}</td>
          </tr>

          {/* Row 2 – Superficie */}
          {data.superficie > 0 && (
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px" }}>
                Rendu superficie – {data.superficie.toLocaleString("fr-FR")} m²
                <br /><span style={{ fontSize: "10px", color: "#555" }}>Tarification dégressive par tranches cumulées ({areaDesc})</span>
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>{data.superficie.toLocaleString("fr-FR")} m²</td>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>Dégressif</td>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>{fmtDH(areaCost)}</td>
            </tr>
          )}

          {/* Row 3 – Info points */}
          {data.points > 0 && (
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px" }}>
                Points d&apos;information interactifs
                <br /><span style={{ fontSize: "10px", color: "#555" }}>Hotspots cliquables : texte, images, vidéos, liens</span>
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>{data.points}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>120,00</td>
              <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center" }}>{fmtDH(pointsCost)}</td>
            </tr>
          )}

          {/* Totals */}
          <tr>
            <td colSpan={3} style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "right", background: "#00b5ad", color: "#fff", fontWeight: "bold" }}>
              Total HT
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center", fontWeight: "bold" }}>
              {fmtDH(totalHT)}
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "right", background: "#00b5ad", color: "#fff", fontWeight: "bold" }}>
              TVA 20%
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center", fontWeight: "bold" }}>
              {fmtDH(tva)}
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "right", background: "#00b5ad", color: "#fff", fontWeight: "bold" }}>
              Total TTC
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px 10px", textAlign: "center", fontWeight: "bold" }}>
              {fmtDH(totalTTC)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Amount in words */}
      <div style={{ marginTop: "16px", fontSize: "11px" }}>
        <p style={{ margin: 0 }}>
          Arrêté le présent devis à la somme de{" "}
          <em>{amountInWords(totalTTC)}</em>
        </p>
      </div>

      {/* Signature */}
      <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", paddingRight: "40px" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: "bold", margin: "0 0 4px 0", fontSize: "11px" }}>Cachet &amp; Signature</p>
          <SignatureImage width={180} height={120} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #ccc", marginTop: "32px", paddingTop: "10px", fontSize: "9px", color: "#444", textAlign: "center", lineHeight: "1.6" }}>
        <p style={{ margin: 0 }}>
          Sté. LADRISSI COM * - Adresse : Av. Moulay Ismail, Rés. Farah 2, Bloc B N°2 - 90060 - Tanger.
        </p>
        <p style={{ margin: 0 }}>
          E-mail : ladrissicom@gmail.com - Site web : www.ladrissi.com - GSM: +212669499987
        </p>
        <p style={{ margin: 0 }}>
          ICE : 002449858000074 - IF : 45878006 - Taxe Professionnelle N° : 57114465 - RC : 106351
        </p>
        <p style={{ margin: "4px 0 0 0" }}>
          RIB BMCE : 011 640 0000372100000583 28
        </p>
      </div>
    </div>
  )
}
