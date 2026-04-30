"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import crypto from "crypto"

export async function login(formData: FormData) {
  const account = (formData.get("account") as string).trim()
  const password = (formData.get("password") as string).trim()
  
  // Hash the input password using SHA256 to match the DB
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  console.log('--- Login Attempt ---');
  console.log('Account:', account);
  console.log('Hashed Input:', hashedPassword);

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: user, error } = await supabase
    .from("account_user")
    .select("*")
    .eq("account", account)
    .eq("password", hashedPassword)
    .single()

  if (error) console.log('Supabase Error:', error.message);
  if (user) console.log('User found:', user.id);

  if (error || !user) {
    return { error: "Identifiants incorrects ou utilisateur inexistant." }
  }

  // Check if user is active
  if (!user.is_active) {
    return { error: "Votre compte est désactivé." }
  }

  // Set a session cookie
  cookieStore.set("admin_session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Redirect to the dashboard
  redirect("/admin/dashboard")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin/login")
}
