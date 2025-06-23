import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Star, MessageSquare, Target, Lightbulb, AlertTriangle, Trophy, Brain, Zap } from 'lucide-react'
import SentimentAnalyzer from './components/SentimentAnalyzer.jsx'
import BacklogGenerator from './components/BacklogGenerator.jsx'
import './App.css'

// Componente Dashboard Principal
function Dashboard() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState(null)
  const [sentimentData, setSentimentData] = useState(null)

  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    try {
      const response = await fetch('https://bff-analyse.vercel.app/api/apps')
      const data = await response.json()
      setApps(data)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar apps:', error)
      setLoading(false)
    }
  }

  const investmentApps = apps.filter(app => 
    app.category === 'Finanças' || app.category === 'Finance'
  )

  const ionApp = investmentApps.find(app => 
    app.name.toLowerCase().includes('íon') || app.name.toLowerCase().includes('ion')
  )

  const competitorApps = investmentApps.filter(app => 
    !app.name.toLowerCase().includes('íon') && !app.name.toLowerCase().includes('ion')
  ).slice(0, 5)

  const handleAnalysisComplete = (analysis) => {
    setSentimentData(analysis)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Carregando dados dos aplicativos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ion-primary/5 via-gray-50 to-ion-secondary/10 dark:from-ion-primary dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-ion-primary rounded-xl flex items-center justify-center mr-4">
              <Trophy className="w-10 h-10 text-ion-secondary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-ion-primary dark:text-white mb-2">
                Dashboard de Análise de Apps de Investimento
              </h1>
              <p className="text-lg text-ion-primary/70 dark:text-gray-300">
                Análise inteligente de sentimentos e insights executivos com IA • <span className="text-ion-secondary font-semibold">Íon em Destaque</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-ion-secondary text-ion-primary font-semibold px-4 py-2">
              <Brain className="w-4 h-4 mr-2" />
              Powered by Google Gemini
            </Badge>
            <Badge className="bg-ion-accent text-white font-semibold px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Íon Investimentos
            </Badge>
          </div>
        </div>

        {/* Destaque do Íon Investimentos */}
        {ionApp && (
          <Card className="mb-8 border-2 border-ion-secondary bg-gradient-to-r from-ion-secondary/10 to-ion-primary/5 dark:from-ion-secondary/20 dark:to-ion-primary/20 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src={ionApp.icon_url || '/placeholder-icon.png'} 
                    alt={ionApp.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl text-ion-primary dark:text-ion-secondary">
                    <Trophy className="inline mr-2" />
                    {ionApp.name}
                  </CardTitle>
                  <CardDescription className="text-ion-primary/70 dark:text-ion-secondary/70">
                    Aplicativo em destaque - Análise detalhada com IA
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="ml-auto bg-ion-secondary text-ion-primary font-semibold">
                  <Star className="w-4 h-4 mr-1" />
                  {ionApp.rating ? ionApp.rating.toFixed(2) : 'N/A'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {ionApp.total_reviews || 'N/A'}
                  </div>
                  <div className="text-sm text-orange-600 dark:text-orange-400">Total de Avaliações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {ionApp.current_version || 'N/A'}
                  </div>
                  <div className="text-sm text-orange-600 dark:text-orange-400">Versão Atual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {ionApp.store === 'google_play' ? 'Google Play' : 'App Store'}
                  </div>
                  <div className="text-sm text-orange-600 dark:text-orange-400">Plataforma</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs principais */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="sentiment">Sentimentos</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="ai-analysis">Análise IA</TabsTrigger>
            <TabsTrigger value="backlog">Backlog IA</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Apps</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{investmentApps.length}</div>
                  <p className="text-xs text-muted-foreground">Apps de investimento</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(investmentApps.reduce((acc, app) => acc + (app.rating || 0), 0) / investmentApps.length).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">Média geral</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sentimento Positivo</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">68%</div>
                  <p className="text-xs text-muted-foreground">Análise de sentimentos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <p className="text-xs text-muted-foreground">Melhorias identificadas</p>
                </CardContent>
              </Card>
            </div>

             {/* Gráfico de Avaliações */}
            <Card>
              <CardHeader>
                <CardTitle className="text-ion-primary">Comparação de Avaliações</CardTitle>
                <CardDescription>Avaliações médias dos principais apps</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#A7CE2E" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise de Sentimentos */}
          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Sentimentos</CardTitle>
                  <CardDescription>Análise geral dos comentários</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Positivo', value: 68, fill: '#10b981' },
                          { name: 'Neutro', value: 20, fill: '#f59e0b' },
                          { name: 'Negativo', value: 12, fill: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Positivo', value: 68, fill: '#10b981' },
                          { name: 'Neutro', value: 20, fill: '#f59e0b' },
                          { name: 'Negativo', value: 12, fill: '#ef4444' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tendência de Sentimentos</CardTitle>
                  <CardDescription>Evolução ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { mes: 'Jan', positivo: 65, negativo: 15 },
                      { mes: 'Fev', positivo: 67, negativo: 14 },
                      { mes: 'Mar', positivo: 70, negativo: 12 },
                      { mes: 'Abr', positivo: 68, negativo: 13 },
                      { mes: 'Mai', positivo: 72, negativo: 11 },
                      { mes: 'Jun', positivo: 68, negativo: 12 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="positivo" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="negativo" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Insights Executivos */}
            <Card>
              <CardHeader>
                <CardTitle>Insights Executivos</CardTitle>
                <CardDescription>Principais descobertas da análise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Pontos Fortes</h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Interface intuitiva e facilidade de uso são os aspectos mais elogiados pelos usuários.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Oportunidades</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Melhorar a velocidade de carregamento e adicionar mais opções de investimento.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Riscos</h4>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Reclamações sobre suporte ao cliente e problemas técnicos esporádicos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ranking */}
          <TabsContent value="ranking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Apps de Investimento</CardTitle>
                <CardDescription>Classificação baseada em avaliações e análise de sentimentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investmentApps.slice(0, 10).map((app, index) => (
                    <div key={app.app_id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                      app.name.toLowerCase().includes('íon') || app.name.toLowerCase().includes('ion') 
                        ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' 
                        : 'bg-gray-50 dark:bg-gray-800'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img 
                          src={app.icon_url || '/placeholder-icon.png'} 
                          alt={app.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{app.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{app.category}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{app.rating ? app.rating.toFixed(2) : 'N/A'}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {app.total_reviews || 'N/A'} avaliações
                        </p>
                      </div>
                      
                      {(app.name.toLowerCase().includes('íon') || app.name.toLowerCase().includes('ion')) && (
                        <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                          <Trophy className="w-3 h-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comentários */}
          <TabsContent value="comments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Comentários</CardTitle>
                <CardDescription>Principais temas e reclamações identificados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4 text-green-700 dark:text-green-300">Elogios Mais Frequentes</h4>
                    <div className="space-y-3">
                      {[
                        'Interface intuitiva e fácil de usar',
                        'Taxas competitivas',
                        'Variedade de produtos de investimento',
                        'Suporte educacional',
                        'Segurança e confiabilidade'
                      ].map((elogio, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{elogio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-red-700 dark:text-red-300">Reclamações Recorrentes</h4>
                    <div className="space-y-3">
                      {[
                        'Lentidão no carregamento',
                        'Problemas de sincronização',
                        'Suporte ao cliente demorado',
                        'Bugs em atualizações',
                        'Falta de funcionalidades avançadas'
                      ].map((reclamacao, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-sm">{reclamacao}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comentários Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Comentários Recentes</CardTitle>
                <CardDescription>Últimas avaliações dos usuários</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      usuario: 'João Silva',
                      rating: 5,
                      comentario: 'Excelente app! Interface muito intuitiva e fácil de investir.',
                      data: '2 dias atrás',
                      sentimento: 'positivo'
                    },
                    {
                      usuario: 'Maria Santos',
                      rating: 3,
                      comentario: 'Bom app, mas poderia ser mais rápido no carregamento.',
                      data: '3 dias atrás',
                      sentimento: 'neutro'
                    },
                    {
                      usuario: 'Pedro Costa',
                      rating: 4,
                      comentario: 'Gosto das funcionalidades, mas o suporte demora para responder.',
                      data: '5 dias atrás',
                      sentimento: 'positivo'
                    }
                  ].map((comentario, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{comentario.usuario}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < comentario.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <Badge variant={
                          comentario.sentimento === 'positivo' ? 'default' :
                          comentario.sentimento === 'neutro' ? 'secondary' : 'destructive'
                        }>
                          {comentario.sentimento}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{comentario.comentario}</p>
                      <p className="text-xs text-gray-500">{comentario.data}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise IA */}
          <TabsContent value="ai-analysis" className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Análise Inteligente com IA</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Use o poder da inteligência artificial para analisar comentários e gerar insights automáticos.
              </p>
            </div>
            
            <SentimentAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          </TabsContent>

          {/* Backlog IA */}
          <TabsContent value="backlog" className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold">Backlog Inteligente</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Gere automaticamente itens de backlog priorizados baseados na análise de sentimentos.
              </p>
            </div>
            
            <BacklogGenerator sentimentData={sentimentData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router basename="/frontapps">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App

