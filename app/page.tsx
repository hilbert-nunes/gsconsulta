import Index from "./pages/index"
import Footer from "@/components/_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Index />
      <Footer />
    </div>
  )
}
