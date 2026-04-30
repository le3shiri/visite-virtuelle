"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Users, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Search, 
  Plus,
  ArrowUpRight,
  MoreVertical,
  LayoutGrid,
  MessageSquare,
  FileText,
  Clock,
  Ban,
  Mail,
  ExternalLink,
  CheckCircle2 as CheckCircleIcon,
  XCircle,
  Eye,
  ArrowLeft,
  Save,
  Trash2,
  ChevronUp,
  ChevronDown,
  Globe,
  ImageIcon,
  BarChart3,
  Quote,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  List as ListIcon,
  FilterX,
  MapPin,
  User,
  HelpCircle,
  RotateCcw,
  Pin,
  Edit3,
  X,
  Building2,
  Contact,
  Share2,
  Languages,
  ShieldCheck,
  Check,
  AlertCircle,
  Briefcase,
  CreditCard,
  CalendarCheck,
  Loader2
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type TabType = "dashboard" | "portfolio" | "testimonials" | "blog" | "bookings" | "blocked-dates" | "time-slots" | "contact" | "pricing" | "settings"

export default function AdminDashboard({ initialStats }: { initialStats?: any }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Fallback to static if not provided
  const stats = initialStats || {
    kpis: {
      projectsCount: 0,
      bookingsCount: 0,
      inquiriesCount: 0,
      blogPostsCount: 0,
      pricingPlansCount: 0
    },
    recentBookings: [],
    recentInquiries: []
  }

  const navItems = [
    { id: "dashboard", label: "Tableau de bord", icon: TrendingUp },
    { id: "portfolio", label: "Portfolio Matterport", icon: LayoutGrid },
    { id: "testimonials", label: "Témoignages", icon: MessageSquare },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "pricing", label: "Packs & Tarifs", icon: Layers },
    { id: "bookings", label: "Gestion Réservations", icon: CalendarIcon },
    { id: "blocked-dates", label: "Dates Bloquées", icon: Ban },
    { id: "time-slots", label: "Créneaux Horaires", icon: Clock },
    { id: "contact", label: "Demandes Contact", icon: Mail },
    { id: "settings", label: "Paramètres Site", icon: Settings },
  ]

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setIsEditing(null)
    setIsCreating(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-8">
          <h2 className="text-xl font-black tracking-tighter">Ladrissi <span className="text-primary">Com</span></h2>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 mt-1">Admin Control Center</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 mt-4">Général</p>
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as TabType)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}

          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 mt-8">Réservations & Booking</p>
          {navItems.slice(5, 9).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as TabType)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}

          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 mt-8">Configuration</p>
          {navItems.slice(9).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as TabType)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => router.push("/admin/login")}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl font-bold transition-all text-sm"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h2 className="font-black text-xl text-slate-900 tracking-tight capitalize">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
            {(isEditing || isCreating) && (
              <div className="flex items-center gap-2 ml-4">
                <ArrowRight className="w-4 h-4 text-slate-300" />
                <span className="text-sm font-bold text-slate-400">{isCreating ? "Nouveau" : "Édition"}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-64 pl-12 pr-4 py-2 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none text-sm"
              />
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 leading-none">Admin Ladrissi</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-primary">
                AL
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          {activeTab === "dashboard" && <DashboardView stats={stats} />}
          {activeTab === "portfolio" && <PortfolioView isEditing={isEditing} isCreating={isCreating} onEdit={setIsEditing} onCreate={() => setIsCreating(true)} onCancel={() => { setIsEditing(null); setIsCreating(false); }} />}
          {activeTab === "testimonials" && <TestimonialsView />}
          {activeTab === "blog" && <BlogView isEditing={isEditing} isCreating={isCreating} onEdit={setIsEditing} onCreate={() => setIsCreating(true)} onCancel={() => { setIsEditing(null); setIsCreating(false); }} />}
          {activeTab === "pricing" && <PricingView />}
          {activeTab === "bookings" && <BookingsView />}
          {activeTab === "blocked-dates" && <BlockedDatesView />}
          {activeTab === "time-slots" && <TimeSlotsView />}
          {activeTab === "contact" && <ContactRequestsView />}
          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  )
}

/* --- SUB-VIEWS --- */

function DashboardView({ stats }: { stats: any }) {
  const kpis = [
    { label: "Projets Publiés", value: stats.kpis.projectsCount, icon: LayoutGrid, color: "text-slate-900" },
    { label: "Packs Actifs", value: stats.kpis.pricingPlansCount, icon: CreditCard, color: "text-slate-900" },
    { label: "Réservations", value: stats.kpis.bookingsCount, icon: CalendarCheck, color: "text-amber-500" },
    { label: "Demandes Contact", value: stats.kpis.inquiriesCount, icon: MessageSquare, color: "text-primary" },
    { label: "Articles Blog", value: stats.kpis.blogPostsCount, icon: FileText, color: "text-slate-900" },
  ]

  const monthlyActivity = [
    { month: "Mois en cours", bookings: stats.kpis.bookingsCount, contacts: stats.kpis.inquiriesCount },
  ]

  const recentBookings = stats.recentBookings || []
  const recentInquiries = stats.recentInquiries || []
  
  // Basic mapping of booking statuses if available
  const pendingCount = stats.bookingsStatusGroup?.find((b: any) => b.status === "PENDING")?._count.id || 0
  const confirmedCount = stats.bookingsStatusGroup?.find((b: any) => b.status === "CONFIRMED")?._count.id || 0
  const completedCount = stats.bookingsStatusGroup?.find((b: any) => b.status === "COMPLETED")?._count.id || 0
  const cancelledCount = stats.bookingsStatusGroup?.find((b: any) => b.status === "CANCELLED")?._count.id || 0

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-slate-100 shadow-sm group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <kpi.icon className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{kpi.label}</span>
                  </div>
                  <div className={cn("text-4xl font-black tracking-tighter", kpi.color)}>{kpi.value}</div>
                </div>
                <Button variant="secondary" size="icon" className="rounded-full h-8 w-8 bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-black text-slate-900 tracking-tight uppercase text-sm">Activité Mensuelle</h3>
          </div>
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mois</TableHead>
                  <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Réservations</TableHead>
                  <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Inquiries</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyActivity.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell className="px-6 py-4 font-bold text-slate-700">{item.month}</TableCell>
                    <TableCell className="px-6 py-4 text-right font-black tabular-nums text-slate-900">{item.bookings}</TableCell>
                    <TableCell className="px-6 py-4 text-right font-black tabular-nums text-slate-900">{item.contacts}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Booking Distribution */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-primary" />
            <h3 className="font-black text-slate-900 tracking-tight uppercase text-sm">Distribution Bookings</h3>
          </div>
          <Card className="border-slate-100 shadow-sm">
            <CardContent className="p-6 space-y-4">
              {[
                { label: "En attente", value: pendingCount, color: "bg-amber-500", icon: Clock },
                { label: "Confirmé", value: confirmedCount, color: "bg-primary", icon: CheckCircleIcon },
                { label: "Annulé", value: cancelledCount, color: "bg-rose-500", icon: XCircle },
                { label: "Terminé", value: completedCount, color: "bg-emerald-500", icon: CheckCircleIcon },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("w-5 h-5", item.color.replace('bg-', 'text-'))} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                  </div>
                  <span className="text-xl font-black text-slate-900 tabular-nums">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 tracking-tight uppercase text-sm">Réservations Récentes</h3>
            <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-primary p-0 h-auto">Voir tout</Button>
          </div>
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Réf</TableHead>
                  <TableHead className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</TableHead>
                  <TableHead className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((b: any) => (
                  <TableRow key={b.id} className="group hover:bg-slate-50 transition-colors">
                    <TableCell className="px-6 py-3 font-mono text-xs text-primary font-bold">{b.reference}</TableCell>
                    <TableCell className="px-6 py-3 font-bold text-slate-700">{b.clientName}</TableCell>
                    <TableCell className="px-6 py-3">
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter">
                        {b.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Recent Inquiries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 tracking-tight uppercase text-sm">Dernières Demandes</h3>
            <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-primary p-0 h-auto">Gérer l'inbox</Button>
          </div>
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</TableHead>
                  <TableHead className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom</TableHead>
                  <TableHead className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sujet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInquiries.map((i: any) => (
                  <TableRow key={i.id} className="group hover:bg-slate-50 transition-colors">
                    <TableCell className="px-6 py-3 text-xs font-bold text-slate-400">{new Date(i.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="px-6 py-3 font-bold text-slate-700">{i.name}</TableCell>
                    <TableCell className="px-6 py-3 text-xs truncate max-w-[150px]">{i.subject}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PortfolioView({ isEditing, isCreating, onEdit, onCreate, onCancel }: any) {
  const [activeLang, setActiveLang] = useState("FR")
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getProjects }) => {
      getProjects().then(data => {
        setProjects(data)
        setLoading(false)
      })
    })
  }, [])

  if (isEditing || isCreating) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </button>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-2" onClick={onCancel}>Annuler</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-8 flex items-center gap-2">
              <Save className="w-4 h-4" />
              {isCreating ? "Publier" : "Sauvegarder"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-black text-slate-900">Informations Multilingues</h3>
                </div>
                <Tabs value={activeLang} onValueChange={setActiveLang} className="w-auto">
                  <TabsList className="bg-white border p-1 rounded-xl">
                    <TabsTrigger value="FR" className="rounded-lg font-bold text-[10px] uppercase tracking-widest px-4">FR</TabsTrigger>
                    <TabsTrigger value="EN" className="rounded-lg font-bold text-[10px] uppercase tracking-widest px-4">EN</TabsTrigger>
                    <TabsTrigger value="AR" className="rounded-lg font-bold text-[10px] uppercase tracking-widest px-4">AR</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Titre du Projet ({activeLang})</Label>
                  <Input placeholder="Ex: Hôtel Continental Luxury Suite" className="h-12 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Résumé Court</Label>
                  <Textarea placeholder="Une brève description pour les cartes du portfolio..." rows={2} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Le Défi</Label>
                    <Textarea placeholder="Quels étaient les besoins du client ?" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">La Solution</Label>
                    <Textarea placeholder="Comment Matterport a résolu le problème ?" rows={4} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-black text-slate-900">Médias & 3D</h3>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lien Matterport (Embed URL)</Label>
                    <Input placeholder="https://my.matterport.com/show/?m=..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vidéo de présentation (URL)</Label>
                    <Input placeholder="Lien YouTube ou Vimeo" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-slate-100 shadow-sm">
              <div className="p-6 bg-slate-50 border-b border-slate-100">
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">Classification</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Catégorie</Label>
                  <Select defaultValue="hospitality">
                    <SelectTrigger className="font-bold h-11"><SelectValue placeholder="Choisir" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospitality">Hôtellerie</SelectItem>
                      <SelectItem value="dining">Restauration</SelectItem>
                      <SelectItem value="real-estate">Immobilier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Surface (m²)</Label>
                  <Input type="number" placeholder="450" className="h-11" />
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-slate-700">Publier le projet</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-slate-700">Mettre en avant</Label>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Projets Matterport</h3>
          <p className="text-sm text-slate-500">Gérez vos visites virtuelles 360°</p>
        </div>
        <Button onClick={onCreate} className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center gap-2 shadow-xl shadow-primary/20">
          <Plus className="h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-slate-500 font-bold">Aucun projet trouvé.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-slate-100 shadow-sm group overflow-hidden hover:shadow-xl transition-all duration-500">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary hover:text-white transition-all scale-75 group-hover:scale-100 duration-500"><Eye className="w-5 h-5" /></button>
                <button onClick={() => onEdit(project.id)} className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary hover:text-white transition-all scale-75 group-hover:scale-100 duration-500"><Settings className="w-5 h-5" /></button>
              </div>
              <div className="absolute top-4 left-4">
                <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg", project.status === "PUBLISHED" ? "bg-emerald-500 text-white" : "bg-slate-500 text-white")}>
                  {project.status === "PUBLISHED" ? "Publié" : "Brouillon"}
                </span>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-black text-lg text-slate-900">{project.title}</h4>
                <Badge variant="outline" className="text-[10px] uppercase font-black">{project.category}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">
                <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {project.surface ? `${project.surface}m²` : "N/A"}</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}
    </div>
  )
}

function BlogView({ isEditing, isCreating, onEdit, onCreate, onCancel }: any) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getBlogPosts }) => {
      getBlogPosts().then(data => {
        setPosts(data)
        setLoading(false)
      })
    })
  }, [])

  if (isEditing || isCreating) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </button>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-2" onClick={onCancel}>Annuler</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-8 flex items-center gap-2">
              <Save className="w-4 h-4" />
              {isCreating ? "Publier" : "Sauvegarder"}
            </Button>
          </div>
        </div>

        <Card className="border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-black text-slate-900">Rédiger un Article</h3>
          </div>
          <CardContent className="p-8 space-y-6">
             <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Titre de l'Article</Label>
              <Input placeholder="Entrez un titre captivant..." className="h-12 font-bold" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Catégorie</Label>
                <Select><SelectTrigger className="h-11"><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent><SelectItem value="immo">Immobilier</SelectItem><SelectItem value="tech">Technologie</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slug URL</Label>
                <Input placeholder="comment-booster-vos-ventes" className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contenu de l'Article</Label>
              <Textarea placeholder="Commencez à écrire..." rows={10} className="resize-none" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Blog Management</h3>
          <p className="text-sm text-slate-500">Partagez votre expertise</p>
        </div>
        <Button onClick={onCreate} className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center gap-2 shadow-xl shadow-primary/20">
          <Plus className="h-4 w-4" />
          Ajouter un Post
        </Button>
      </div>

      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Détails de l'Article</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Catégorie</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date de Publication</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500 font-bold">
                  Aucun article trouvé.
                </TableCell>
              </TableRow>
            ) : posts.map(post => (
              <TableRow key={post.id} className="group hover:bg-slate-50 transition-colors">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-slate-100 shrink-0" />
                    <span className="font-bold text-slate-900 truncate max-w-[250px]">{post.title}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 font-medium">{post.category}</TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest", post.status === 'PUBLISHED' ? "border-emerald-500 text-emerald-500 bg-emerald-50" : "border-slate-300 text-slate-400 bg-slate-100")}>{post.status}</Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm font-medium text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(post.id)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Edit3 className="w-4 h-4 text-slate-400" /></button>
                    <button className="p-2 hover:bg-rose-50 rounded-lg transition-colors text-rose-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function PricingView() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getPricingPlans }) => {
      getPricingPlans().then(data => {
        setPlans(data)
        setLoading(false)
      })
    })
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Packs & Tarifs</h3>
          <p className="text-sm text-slate-500">Configurez vos offres commerciales</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center gap-2 shadow-xl shadow-primary/20">
          <Plus className="h-4 w-4" />
          Ajouter un Pack
        </Button>
      </div>

      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Ordre</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom du Pack</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prix de Base</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Recommandé</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                </TableCell>
              </TableRow>
            ) : plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500 font-bold">
                  Aucun pack trouvé.
                </TableCell>
              </TableRow>
            ) : plans.map((plan, index) => (
              <TableRow key={plan.id} className="hover:bg-slate-50 transition-colors group">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled={index === 0}><ChevronUp className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled={index === plans.length - 1}><ChevronDown className="w-4 h-4" /></button>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <p className="font-black text-slate-900">{plan.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: {plan.id}</p>
                </TableCell>
                <TableCell className="px-6 py-4"><span className="text-sm font-black text-primary tabular-nums">{plan.price}</span></TableCell>
                <TableCell className="px-6 py-4"><div className="flex justify-center"><Switch checked={plan.highlighted} /></div></TableCell>
                <TableCell className="px-6 py-4 text-center"><Badge className={cn("text-[10px] font-black uppercase tracking-wider", plan.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400")}>{plan.status}</Badge></TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><Settings className="w-4 h-4 text-slate-400" /></button>
                    <button className="p-2 hover:bg-rose-50 rounded-xl transition-colors text-rose-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function TestimonialsView() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getTestimonials }) => {
      getTestimonials().then(data => {
        setTestimonials(data)
        setLoading(false)
      })
    })
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Témoignages Clients</h3>
          <p className="text-sm text-slate-500">Modérez les avis de vos clients</p>
        </div>
      </div>

      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avis</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Note</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                </TableCell>
              </TableRow>
            ) : testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500 font-bold">
                  Aucun témoignage trouvé.
                </TableCell>
              </TableRow>
            ) : testimonials.map((t) => (
              <TableRow key={t.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{t.client}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{t.role || 'Client'}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-600 font-medium max-w-md italic">"{t.content}"</TableCell>
                <TableCell className="px-6 py-4 text-center text-primary font-black">{t.rating.toFixed(1)}</TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest", t.status === 'APPROVED' ? "border-emerald-500 text-emerald-500 bg-emerald-50" : t.status === 'REJECTED' ? "border-rose-500 text-rose-500 bg-rose-50" : "border-amber-500 text-amber-500 bg-amber-50")}>{t.status}</Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircleIcon className="w-5 h-5" /></button>
                    <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><XCircle className="w-5 h-5" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function BookingsView() {
  const [viewMode, setViewMode] = useState<"calendar" | "list" | "split">("split")
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getBookings }) => {
      getBookings().then(data => {
        setBookings(data)
        setLoading(false)
      })
    })
  }, [])

  const statsData = { 
    total: bookings.length, 
    pending: bookings.filter(b => b.status === 'PENDING').length, 
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length, 
    completed: bookings.filter(b => b.status === 'COMPLETED').length, 
    cancelled: bookings.filter(b => b.status === 'CANCELLED').length 
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[{ label: 'Total', value: statsData.total, color: 'border-slate-200' }, { label: 'En attente', value: statsData.pending, color: 'border-amber-400' }, { label: 'Confirmé', value: statsData.confirmed, color: 'border-primary' }, { label: 'Terminé', value: statsData.completed, color: 'border-emerald-500' }, { label: 'Annulé', value: statsData.cancelled, color: 'border-rose-500' }].map((stat) => (
          <Card key={stat.label} className={cn("shadow-sm border-l-4", stat.color)}><CardContent className="p-4"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p><p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p></CardContent></Card>
        ))}
      </div>

      <Card className="border-slate-100 shadow-sm"><CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[280px]"><div className="relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="Rechercher..." className="pl-12 h-11 bg-slate-50 border-transparent" /></div></div>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <Button variant={viewMode === 'split' ? 'secondary' : 'ghost'} size="sm" className="h-9 w-9 p-0 rounded-lg" onClick={() => setViewMode('split')}><LayoutGrid className="h-4 w-4" /></Button>
            <Button variant={viewMode === 'calendar' ? 'secondary' : 'ghost'} size="sm" className="h-9 w-9 p-0 rounded-lg" onClick={() => setViewMode('calendar')}><CalendarIcon className="h-4 w-4" /></Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="h-9 w-9 p-0 rounded-lg" onClick={() => setViewMode('list')}><ListIcon className="h-4 w-4" /></Button>
          </div>
          <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold flex items-center gap-2"><Download className="w-4 h-4" />Exporter</Button>
        </div>
      </CardContent></Card>

      <div className={cn("grid gap-8", viewMode === "split" ? "grid-cols-1 xl:grid-cols-12" : "grid-cols-1")}>
        {(viewMode === "split" || viewMode === "calendar") && (
          <div className={cn(viewMode === "split" ? "xl:col-span-5" : "w-full")}>
            <Card className="border-slate-100 shadow-sm overflow-hidden h-full">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white"><h3 className="font-black text-lg text-slate-900 tracking-tight">Mai 2026</h3><div className="flex items-center gap-1"><Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button></div></div>
              <CardContent className="p-0">
                <Table className="border-collapse table-fixed w-full">
                  <TableHeader><TableRow className="bg-slate-50/50">{['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (<TableHead key={day} className="text-center h-12 text-[10px] font-black uppercase tracking-widest text-slate-400">{day}</TableHead>))}</TableRow></TableHeader>
                  <TableBody>{[1, 2, 3, 4, 5].map(week => (<TableRow key={week} className="hover:bg-transparent">{[0,1,2,3,4,5,6].map(day => (<TableCell key={day} className="h-24 border border-slate-50 p-2 align-top group cursor-pointer hover:bg-slate-50/50 transition-colors"><span className="text-xs font-bold text-slate-900">{(week - 1) * 7 + day - 4 > 0 ? (week - 1) * 7 + day - 4 : ''}</span></TableCell>))}</TableRow>))}</TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
        {(viewMode === "split" || viewMode === "list") && (
          <div className={cn(viewMode === "split" ? "xl:col-span-7" : "w-full")}>
            <Card className="border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b bg-white"><h3 className="font-black text-lg text-slate-900 tracking-tight">Liste des Réservations</h3></div>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50"><TableRow><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client / Ref</TableHead><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Planification</TableHead><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</TableHead><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-8"><div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div></TableCell></TableRow>
                    ) : bookings.length === 0 ? (
                      <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500 font-bold">Aucune réservation trouvée.</TableCell></TableRow>
                    ) : bookings.map(row => (
                      <TableRow key={row.id} className="group hover:bg-slate-50">
                        <TableCell className="px-6 py-4"><div className="flex flex-col"><span className="font-black text-slate-900 text-sm">{row.clientName}</span><span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">#{row.reference}</span></div></TableCell>
                        <TableCell className="px-6 py-4"><div className="flex flex-col"><span className="text-sm font-bold text-slate-700">{new Date(row.date).toLocaleDateString()}</span><span className="text-[10px] text-slate-400 font-bold uppercase mt-1">{row.timeSlot}</span></div></TableCell>
                        <TableCell className="px-6 py-4"><Badge className={cn("text-[10px] font-black uppercase", row.status === 'CONFIRMED' ? "bg-emerald-500" : row.status === 'COMPLETED' ? "bg-blue-500" : row.status === 'CANCELLED' ? "bg-rose-500" : "bg-amber-500")}>{row.status}</Badge></TableCell>
                        <TableCell className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="h-9 px-4 font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-xl border border-transparent hover:border-primary">Gérer</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function BlockedDatesView() {
  const [blockedDates, setBlockedDates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getBlockedDates }) => {
      getBlockedDates().then(data => {
        setBlockedDates(data)
        setLoading(false)
      })
    })
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-8 space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Exclusions</h3>
          <p className="text-sm text-slate-500 font-bold">Total: {blockedDates.length} Dates</p>
        </div>
        <Card className="border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Bloquée</TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Raison</TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Créée le</TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8"><div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div></TableCell></TableRow>
              ) : blockedDates.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500 font-bold">Aucune date bloquée trouvée.</TableCell></TableRow>
              ) : blockedDates.map(item => (
                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="px-6 py-4 font-black text-slate-900">{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-slate-500 font-medium italic">{item.reason || "Aucune raison"}</TableCell>
                  <TableCell className="px-6 py-4 text-xs font-bold text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="lg:col-span-4 lg:sticky lg:top-28">
        <Card className="border-slate-100 shadow-xl overflow-hidden">
          <div className="p-6 bg-primary text-white"><h4 className="font-black uppercase tracking-widest text-sm">Block New Date</h4></div>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Date</Label>
              <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full h-12 justify-start px-4 font-bold border-2"><CalendarIcon className="mr-3 h-4 w-4" />Choose date</Button></PopoverTrigger>
              <PopoverContent className="w-auto p-0"><Calendar mode="single" /></PopoverContent></Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reason (Optional)</Label>
              <Textarea placeholder="Facility Maintenance..." rows={4} className="resize-none" />
            </div>
            <Button className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20">Block Calendar Date</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TimeSlotsView() {
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getTimeSlots }) => {
      getTimeSlots().then(data => {
        setSlots(data)
        setLoading(false)
      })
    })
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Shooting Slots</h3>
          <p className="text-sm text-slate-500">Enable or disable available hours</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center gap-2"><Plus className="h-4 w-4" />Add Slot</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : slots.length === 0 ? (
        <div className="text-center py-12 text-slate-500 font-bold">Aucun créneau horaire trouvé.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {slots.map((slot) => (
            <Card key={slot.id} className="border-slate-100 hover:border-primary transition-all group">
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <span className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{slot.time}</span>
                <Separator />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">Active</span>
                  <Switch checked={slot.isActive} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function ContactRequestsView() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('./actions').then(({ getInquiries }) => {
      getInquiries().then(data => {
        setRequests(data)
        setLoading(false)
      })
    })
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Inquiries Inbox</h3>
      <Card className="border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50"><TableRow><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expéditeur</TableHead><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sujet</TableHead><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reçu le</TableHead><TableHead className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8"><div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div></TableCell></TableRow>
            ) : requests.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500 font-bold">Aucune demande de contact.</TableCell></TableRow>
            ) : requests.map(req => (
            <TableRow key={req.id} className={cn("group hover:bg-slate-50", !req.isRead ? "bg-primary/5" : "")}>
              <TableCell className="px-6 py-4"><div className="flex flex-col"><span className="font-bold text-slate-900">{req.name}</span><span className="text-xs text-slate-400">{req.email}</span></div></TableCell>
              <TableCell className="px-6 py-4 font-medium text-slate-700">{req.subject}</TableCell>
              <TableCell className="px-6 py-4 text-sm font-bold text-slate-400">{new Date(req.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="px-6 py-4 text-right"><Button variant="outline" size="sm" className="h-9 px-4 font-black text-[10px] uppercase border-slate-200">Lire le message</Button></TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function SettingsView() {
  const [activeCat, setActiveCat] = useState("profile")
  const categories = [
    { id: "profile", label: "Company Profile", icon: Building2 },
    { id: "contact", label: "Contact Details", icon: Contact },
    { id: "social", label: "Social & Messaging", icon: Share2 },
    { id: "faqs", label: "FAQs & Stats", icon: HelpCircle },
  ]

  return (
    <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <aside className="col-span-3 space-y-2">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all", activeCat === cat.id ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:bg-slate-100")}>
            <cat.icon className="w-4 h-4" /> {cat.label}
          </button>
        ))}
      </aside>
      <main className="col-span-9">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
            <div><CardTitle className="font-black text-xl tracking-tight capitalize">{activeCat}</CardTitle><CardDescription>Configure your site parameters</CardDescription></div>
            <Button className="bg-primary text-white font-black uppercase tracking-widest"><Save className="w-4 h-4 mr-2" />Sauvegarder</Button>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {activeCat === "profile" && (
              <div className="space-y-6">
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-slate-400">Company Name</Label><Input defaultValue="Ladrissi Com Agency" className="h-11 font-bold" /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-slate-400">Agency Description</Label><Textarea rows={4} defaultValue="Spécialiste de la visite virtuelle Matterport au Maroc..." /></div>
              </div>
            )}
            {activeCat === "contact" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-slate-400">Email Address</Label><Input defaultValue="contact@ladrissi.ma" /></div>
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase text-slate-400">Phone</Label><Input defaultValue="+212 600 000 000" /></div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
