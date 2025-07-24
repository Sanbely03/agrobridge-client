import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-slate-50 text-center py-20 px-6">
      <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
        Empowering Farmers, Elevating Agriculture
      </h2>
      <p className="text-slate-600 max-w-xl mx-auto mb-6">
        AgroBridge connects farmers with tools, resources, and opportunities to boost productivity and maximize profit.
      </p>
      <Button className="text-lg px-6 py-4">Get Started</Button>
    </section>
  )
}
