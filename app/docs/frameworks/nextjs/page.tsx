import type { Metadata } from "next"
import NextJSIntegrationPageClient from "./NextJSIntegrationPageClient"

export const metadata: Metadata = {
  title: "Next.js Integration - BotHarbor",
  description:
    "Integrate BotHarbor chat widget into your Next.js applications with support for both App Router and Pages Router.",
}

export default function NextJSIntegrationPage() {
  return <NextJSIntegrationPageClient theme="dark" />
}
