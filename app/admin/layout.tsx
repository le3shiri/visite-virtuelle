import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  // Exclude login page from redirect loop
  // We can't check path here easily in server layout, 
  // but this layout will be inside /admin
  
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  )
}
