import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, Smartphone, Star, Activity, Target } from 'lucide-react'
import './App.css'

function App() {
  const [selectedApp, setSelectedApp] = useState(null)

  // Dados simulados dos apps de investimento
  const appsData = [
    {
      id: 1,
      name: 'InvestMax',
      rating: 4.8,
      users: 2500000,
      revenue: 15000000,
      growth: 23.5,
      category: 'Corretora',
      features: ['Ações', 'Fundos', 'Renda Fixa', 'Criptomoedas'],
      performance: 'Excelente'
    },
    {
      id: 2,
      name: 'TradePro',
      rating: 4.6,
      users: 1800000,
      revenue: 12000000,
      growth: 18.2,
      category: 'Trading',
      features: ['Day Trade', 'Análise Técnica', 'Robôs', 'Alertas'],
      performance: 'Muito Bom'
    },
    {
      id: 3,
      name: 'WealthBuilder',
      rating: 4.7,
      users: 3200000,
      revenue: 22000000,
      growth: 31.8,
      category: 'Gestão',
      features: ['Carteiras', 'Consultoria', 'Planejamento', 'Educação'],
      performance: 'Excelente'
    },
    {
      id: 4,
      name: 'CryptoVault',
      rating: 4.4,
      users: 950000,
      revenue: 8500000,
      growth: 45.2,
      category: 'Cripto',
      features: ['Bitcoin', 'Ethereum', 'DeFi', 'Staking'],
      performance: 'Bom'
    },
    {
      id: 5,
      name: 'SmartInvest',
      rating: 4.5,
      users: 1600000,
      revenue: 9800000,
      growth: 15.7,
      category: 'Robo Advisor',
      features: ['IA', 'Automação', 'Rebalanceamento', 'ETFs'],
      performance: 'Muito Bom'
    }
  ]

  // Dados para gráficos
  const monthlyData = [
    { month: 'Jan', InvestMax: 1200, TradePro: 800, WealthBuilder: 1500, CryptoVault: 600, SmartInvest: 900 },
    { month: 'Fev', InvestMax: 1350, TradePro: 920, WealthBuilder: 1680, CryptoVault: 750, SmartInvest: 980 },
    { month: 'Mar', InvestMax: 1480, TradePro: 1050, WealthBuilder: 1820, CryptoVault: 890, SmartInvest: 1100 },
    { month: 'Abr', InvestMax: 1620, TradePro: 1180, WealthBuilder: 1950, CryptoVault: 1020, SmartInvest: 1200 },
    { month: 'Mai', InvestMax: 1750, TradePro: 1300, WealthBuilder: 2100, CryptoVault: 1180, SmartInvest: 1320 },
    { month: 'Jun', InvestMax: 1890, TradePro: 1420, WealthBuilder: 2280, CryptoVault: 1350, SmartInvest: 1450 }
  ]

  const categoryData = [
    { name: 'Corretora', value: 35, color: '#8884d8' },
    { name: 'Trading', value: 25, color: '#82ca9d' },
    { name: 'Gestão', value: 20, color: '#ffc658' },
    { name: 'Cripto', value: 12, color: '#ff7300' },
    { name: 'Robo Advisor', value: 8, color: '#00ff88' }
  ]

  const performanceData = [
    { metric: 'Downloads', value: 85, target: 90 },
    { metric: 'Retenção', value: 72, target: 75 },
    { metric: 'Receita', value: 94, target: 85 },
    { metric: 'Satisfação', value: 88, target: 90 }
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard de Análise de Apps de Investimento
          </h1>
          <p className="text-gray-600">
            Análise completa do mercado de aplicativos financeiros e de investimento
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(10050000)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12.5% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(67300000)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +18.2% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Apps Analisados</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Principais players do mercado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating Médio</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6</div>
              <p className="text-xs text-muted-foreground">
                Baseado em avaliações dos usuários
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crescimento Mensal de Usuários</CardTitle>
                  <CardDescription>
                    Evolução do número de usuários por app (em milhares)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="WealthBuilder" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="InvestMax" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="TradePro" stroke="#ffc658" strokeWidth={2} />
                      <Line type="monotone" dataKey="SmartInvest" stroke="#ff7300" strokeWidth={2} />
                      <Line type="monotone" dataKey="CryptoVault" stroke="#00ff88" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>
                    Participação de mercado por tipo de app
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="apps" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appsData.map((app) => (
                <Card key={app.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedApp(app)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription>{app.category}</CardDescription>
                      </div>
                      <Badge variant={app.performance === 'Excelente' ? 'default' : app.performance === 'Muito Bom' ? 'secondary' : 'outline'}>
                        {app.performance}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Rating</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{app.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Usuários</span>
                        <span className="font-medium">{formatNumber(app.users)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Receita</span>
                        <span className="font-medium">{formatCurrency(app.revenue)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Crescimento</span>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="font-medium text-green-600">+{app.growth}%</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1">
                          {app.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {app.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{app.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Receita por App (Últimos 6 Meses)</CardTitle>
                <CardDescription>
                  Comparativo de receita mensal em milhares de reais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="WealthBuilder" fill="#8884d8" />
                    <Bar dataKey="InvestMax" fill="#82ca9d" />
                    <Bar dataKey="TradePro" fill="#ffc658" />
                    <Bar dataKey="SmartInvest" fill="#ff7300" />
                    <Bar dataKey="CryptoVault" fill="#00ff88" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceData.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {item.metric}
                      <Target className="h-5 w-5 text-gray-400" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Atual: {item.value}%</span>
                        <span>Meta: {item.target}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                      <div className="text-xs text-gray-600">
                        {item.value >= item.target ? (
                          <span className="text-green-600">✓ Meta atingida</span>
                        ) : (
                          <span className="text-orange-600">
                            Faltam {item.target - item.value}% para a meta
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de detalhes do app */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedApp.name}</CardTitle>
                    <CardDescription className="text-lg">{selectedApp.category}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedApp(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedApp.rating}</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+{selectedApp.growth}%</div>
                      <div className="text-sm text-gray-600">Crescimento</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Estatísticas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Usuários Ativos:</span>
                        <span className="font-medium">{formatNumber(selectedApp.users)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Receita Anual:</span>
                        <span className="font-medium">{formatCurrency(selectedApp.revenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Performance:</span>
                        <Badge variant={selectedApp.performance === 'Excelente' ? 'default' : 'secondary'}>
                          {selectedApp.performance}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Principais Funcionalidades</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

