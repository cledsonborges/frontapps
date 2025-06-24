import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Star, Users, TriangleAlert, Clock, BarChart3, MessageSquare, Target, Lightbulb, AlertTriangle, Trophy, Brain, Zap } from 'lucide-react'
import SentimentAnalyzer from './components/SentimentAnalyzer.jsx'
import BacklogGenerator from './components/BacklogGenerator.jsx'
import './App.css'

function App() {
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
  ) || { name: 'íon Itaú', rating: 7.61, current_version: '2.80.0' }

  const competitorApps = investmentApps.filter(app => 
    !app.name.toLowerCase().includes('íon') && !app.name.toLowerCase().includes('ion')
  ).slice(0, 5)

  // Dados específicos do gráfico baseados no site de exemplo
  const chartData = [
    { name: 'íon Invest com Itaú', rating: 7.61 },
    { name: 'XP Investimentos', rating: 6.8 },
    { name: 'Pactual Investimentos', rating: 6.7 },
    { name: 'Vortuga pro Investir', rating: 6.2 },
    { name: 'Nova Clear', rating: 5.1 }
  ]

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Dashboard de Análise de Aplicativos de Investimento
                </h1>
                <p className="text-muted-foreground">
                  Análise competitiva com IA • Google Play Store Brasil • Atualizado em tempo real
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Dados Atualizados
            </Badge>
          </div>
        </header>

        {/* Tabs principais */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
            <TabsTrigger value="sentiments">Sentimentos</TabsTrigger>
            <TabsTrigger value="comments">Comentários íon</TabsTrigger>
            <TabsTrigger value="backlog">Backlog</TabsTrigger>
            <TabsTrigger value="ai-backlog">IA Backlog</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Líder do Ranking</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">íon Itaú</div>
                  <p className="text-xs text-muted-foreground">
                    Score: 7.61/10 • Versão: 2.80.0
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Apps Analisados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Incluindo XP Investimentos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Comentários Analisados</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">750</div>
                  <p className="text-xs text-muted-foreground">150 por aplicativo</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maior Concorrente</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">XP Invest.</div>
                  <p className="text-xs text-muted-foreground">305K avaliações • 5M+ downloads</p>
                </CardContent>
              </Card>
            </div>

            {/* Ranking Geral dos Aplicativos */}
            <Card>
              <CardHeader>
                <CardTitle>Ranking Geral dos Aplicativos</CardTitle>
                <CardDescription>Score final baseado em nota do Play Store (60%) + análise de sentimentos (40%)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 8]} />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pontos Fortes e Áreas de Melhoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Pontos Fortes do íon Itaú</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">1º Lugar</Badge>
                    <span className="text-sm">Melhor score geral (7.61/10)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">4.68★</Badge>
                    <span className="text-sm">Excelente avaliação no Play Store</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">v2.80.0</Badge>
                    <span className="text-sm">Versão mais recente capturada</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TriangleAlert className="h-5 w-5 text-red-600" />
                    <span>Áreas de Melhoria</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <TriangleAlert className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Bugs e Estabilidade</div>
                      <div className="text-sm text-muted-foreground">11 menções de problemas técnicos - Prioridade ALTA</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Novas Funcionalidades</div>
                      <div className="text-sm text-muted-foreground">7 solicitações de features - Oportunidade de diferenciação</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ranking */}
          <TabsContent value="ranking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Apps de Investimento</CardTitle>
                <CardDescription>Classificação baseada em avaliações e análise de mercado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chartData.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-blue-600">#{index + 1}</span>
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200">
                          <div className="w-full h-full flex items-center justify-center text-xs">
                            {app.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-gray-600">Finanças</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">{app.rating.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise de Sentimentos */}
          <TabsContent value="sentiments" className="space-y-6">
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

          {/* Comentários íon */}
          <TabsContent value="comments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Comentários do íon</CardTitle>
                <CardDescription>Visualize e analise os comentários dos usuários</CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentAnalyzer onAnalysisComplete={handleAnalysisComplete} />
                {sentimentData && (
                  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">Resultado da Análise de Sentimentos:</h4>
                    <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(sentimentData, null, 2)}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backlog */}
          <TabsContent value="backlog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backlog de Melhorias</CardTitle>
                <CardDescription>Itens identificados para melhoria do produto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Melhorias de UX</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Simplificar fluxo de cadastro e melhorar onboarding para novos usuários.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">Performance</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-400">
                        Otimizar tempo de carregamento das telas principais e reduzir consumo de dados.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IA Backlog */}
          <TabsContent value="ai-backlog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Geração de Backlog com IA</CardTitle>
                <CardDescription>Sugestões de itens para o backlog do produto</CardDescription>
              </CardHeader>
              <CardContent>
                <BacklogGenerator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

