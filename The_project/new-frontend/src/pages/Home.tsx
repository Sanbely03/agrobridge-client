import { Header } from "@/components/shared/Header"
// import { Header } from "../components/shared/Header"; // Note the '../' to go up one level from 'pages'
import { Hero } from "@/components/shared/Hero"

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  )
}
