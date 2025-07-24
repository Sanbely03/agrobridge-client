import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1 className="text-xl font-bold text-slate-800">AgroBridge</h1>
      <nav className="flex gap-6">
        <a href="#" className="text-slate-600 hover:text-slate-900">Home</a>
        <a href="#" className="text-slate-600 hover:text-slate-900">Marketplace</a>
        <a href="#" className="text-slate-600 hover:text-slate-900">About</a>
      </nav>
      <div className="flex gap-3">
        <Button variant="outline">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  )
}
