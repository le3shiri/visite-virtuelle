import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import DashboardView from "./DashboardView"
import { getDashboardStats } from "./actions"

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session) {
    redirect("/admin/login")
  }

  const initialStats = await getDashboardStats()

  return <DashboardView initialStats={initialStats} />
}
