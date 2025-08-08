import type { Metadata } from "next"
import AngularIntegrationPageClient from "./AngularIntegrationPageClient"

export const metadata: Metadata = {
  title: "Angular Integration - BotHarbor",
  description:
    "Integrate BotHarbor chat widget into your Angular applications with comprehensive examples and best practices.",
}

export default function AngularIntegrationPage() {
  return <AngularIntegrationPageClient />
}
