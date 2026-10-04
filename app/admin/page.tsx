import type { Metadata } from "next"

import { AdminDashboard } from "@/components/secure-admin-dashboard"

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false, noarchive: true },
}

export default function AdminPage() {
  return <AdminDashboard />
}
