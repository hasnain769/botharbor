import "../widget/widget.css"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "BotHarbor Chat Widget",
  description: "AI-powered chat widget for websites",
}

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}
