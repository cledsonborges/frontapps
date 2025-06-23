import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Lightbulb, Target, Clock, TrendingUp, AlertTriangle, CheckCircle, Brain, Zap } from 'lucide-react'
import ApiService from '../services/ApiService.js'

const BacklogGenerator = ({ sentimentData }) => {
  const [generating, setGenerating] = useState(false)
  const [backlog, setBacklog] = useState([])
  const [progress, setProgress] = useState(0)

  const generateBacklog = async () => {
    setGenerating(true)
    setProgress(0)
    
    try {
      // Simular progresso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Gerar backlog usando o serviço
      const generatedBacklog = ApiService.generateBacklog(sentimentData)
      
      // Adicionar mais itens baseados em análise de apps de investimento
      const investmentSpecificItems = [
        {
          id: generatedBacklog.length + 1,
          title: 'Análise Técnica Avançada',
          description: 'Implementar gráficos candlestick e indicadores técnicos',
          priority: 'Média',
          category: 'Funcionalidade',
          effort: 'Alto',
          impact: 'Alto',
          status: 'Novo',
          aiReasoning: 'Usuários de investimento valorizam análise técnica',
          estimatedHours: 120,
          dependencies: ['API de dados financeiros', 'Biblioteca de gráficos'],
          tags: ['análise', 'gráficos', 'investimentos']
        },
        {
          id: generatedBacklog.length + 2,
          title: 'Alertas de Preço Inteligentes',
          description: 'Sistema de notificações baseado em IA para oportunidades',
          priority: 'Alta',
          category: 'IA',
          effort: 'Alto',
          impact: 'Alto',
          status: 'Novo',
          aiReasoning: 'IA pode identificar padrões e oportunidades automaticamente',
          estimatedHours: 80,
          dependencies: ['API Gemini', 'Serviço de notificações'],
          tags: ['ia', 'alertas', 'notificações']
        },
        {
          id: generatedBacklog.length + 3,
          title: 'Simulador de Carteira',
          description: 'Ferramenta para simular estratégias de investimento',
          priority: 'Média',
          category: 'Educação',
          effort: 'Médio',
          impact: 'Médio',
          status: 'Novo',
          aiReasoning: 'Educação financeira aumenta engajamento dos usuários',
          estimatedHours: 60,
          dependencies: ['Dados históricos'],
          tags: ['simulação', 'educação', 'carteira']
        },
        {
          id: generatedBacklog.length + 4,
          title: 'Relatórios Automatizados',
          description: 'Geração automática de relatórios de performance',
          priority: 'Baixa',
          category: 'Automação',
          effort: 'Médio',
          impact: 'Médio',
          status: 'Novo',
          aiReasoning: 'Relatórios automáticos economizam tempo dos usuários',
          estimatedHours: 40,
          dependencies: ['Templates de relatório'],
          tags: ['relatórios', 'automação', 'pdf']
        }
      ]

      const finalBacklog = [...generatedBacklog, ...investmentSpecificItems]
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      clearInterval(progressInterval)
      setProgress(100)
      
      setTimeout(() => {
        setBacklog(finalBacklog)
        setGenerating(false)
      }, 500)
      
    } catch (error) {
      console.error('Erro na geração do backlog:', error)
      setGenerating(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'destructive'
      case 'Média': return 'default'
      case 'Baixa': return 'secondary'
      default: return 'secondary'
    }
  }

  const getEffortIcon = (effort) => {
    switch (effort) {
      case 'Alto': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'Médio': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'Baixo': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'IA': return <Brain className="w-4 h-4 text-purple-500" />
      case 'Performance': return <Zap className="w-4 h-4 text-blue-500" />
      case 'Funcionalidade': return <Target className="w-4 h-4 text-green-500" />
      default: return <Lightbulb className="w-4 h-4 text-orange-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Gerador de Backlog com IA
          </CardTitle>
          <CardDescription>
            Gere automaticamente itens de backlog baseados na análise de sentimentos e melhores práticas para apps de investimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentData && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  ✓ Dados de análise de sentimentos detectados. O backlog será personalizado com base nos insights.
                </p>
              </div>
            )}
            
            <Button 
              onClick={generateBacklog}
              disabled={generating}
              className="w-full"
              size="lg"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Gerando Backlog com IA...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Gerar Backlog Inteligente
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {generating && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Analisando e gerando backlog...</div>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{progress}% concluído</p>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div className={`flex items-center gap-2 ${progress > 20 ? 'text-green-600' : ''}`}>
                  {progress > 20 ? '✓' : '⏳'} Processando dados de sentimentos
                </div>
                <div className={`flex items-center gap-2 ${progress > 40 ? 'text-green-600' : ''}`}>
                  {progress > 40 ? '✓' : '⏳'} Identificando oportunidades de melhoria
                </div>
                <div className={`flex items-center gap-2 ${progress > 60 ? 'text-green-600' : ''}`}>
                  {progress > 60 ? '✓' : '⏳'} Priorizando itens por impacto
                </div>
                <div className={`flex items-center gap-2 ${progress > 80 ? 'text-green-600' : ''}`}>
                  {progress > 80 ? '✓' : '⏳'} Estimando esforços e dependências
                </div>
                <div className={`flex items-center gap-2 ${progress >= 100 ? 'text-green-600' : ''}`}>
                  {progress >= 100 ? '✓' : '⏳'} Finalizando backlog
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {backlog.length > 0 && (
        <div className="space-y-6">
          {/* Resumo do Backlog */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Backlog Gerado</CardTitle>
              <CardDescription>Análise automática dos itens gerados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{backlog.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total de Itens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {backlog.filter(item => item.priority === 'Alta').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Alta Prioridade</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {backlog.reduce((acc, item) => acc + item.estimatedHours, 0)}h
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Esforço Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(backlog.map(item => item.category)).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Categorias</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Itens do Backlog */}
          <div className="space-y-4">
            {backlog.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(item.category)}
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getEffortIcon(item.effort)}
                          <span className="text-sm">{item.effort}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {item.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{item.estimatedHours}h</div>
                      <div className="text-xs text-gray-500">estimado</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Raciocínio da IA */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-blue-800 dark:text-blue-300">
                            Raciocínio da IA
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-400">
                            {item.aiReasoning}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Impacto vs Esforço */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span>Impacto: <strong>{item.impact}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span>Esforço: <strong>{item.effort}</strong></span>
                      </div>
                    </div>

                    {/* Tags */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Dependências */}
                    {item.dependencies && item.dependencies.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-1">Dependências:</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.dependencies.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BacklogGenerator

