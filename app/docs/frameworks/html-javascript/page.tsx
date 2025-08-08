import type { Metadata } from "next"
import HTMLJavaScriptIntegrationPageClient from "./HTMLJavaScriptIntegrationPageClient"

export const metadata: Metadata = {
  title: "HTML/JavaScript Integration - BotHarbor",
  description:
    "Integrate BotHarbor chat widget into your HTML and JavaScript applications with vanilla JavaScript examples.",
}

export default function HTMLJavaScriptIntegrationPage() {
  return <HTMLJavaScriptIntegrationPageClient/>
}
