import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Brain, MessageSquare, TrendingUp, TrendingDown, AlertCircle, Zap } from 'lucide-react'
import ApiService from '../services/ApiService.js'

const SentimentAnalyzer = ({ onAnalysisComplete }) => {
  const [comments, setComments] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const analyzeComments = async () => {
    if (!comments.trim()) return

    setAnalyzing(true)
    setError(null)
    
    try {
      // Usar o serviço real de análise com Gemini
      const analysis = await ApiService.analyzeWithGemini(comments)
      
      setResults(analysis)
      if (onAnalysisComplete) {
        onAnalysisComplete(analysis)
      }
    } catch (error) {
      console.error('Erro na análise:', error)
      setError('Erro ao analisar comentários. Tente novamente.')
    } finally {
      setAnalyzing(false)
    }
  }

  const loadSampleComments = () => {
    const sampleComments = `Excelente aplicativo! Interface muito intuitiva e fácil de usar. Recomendo para todos que querem investir.

App muito bom, mas às vezes fica lento para carregar. Poderia melhorar a performance.

Péssimo suporte ao cliente. Já faz uma semana que estou tentando resolver um problema e ninguém me responde.

Gosto muito das funcionalidades, especialmente da análise de carteira. Muito útil para acompanhar os investimentos.

Interface confusa e difícil de navegar. Precisa de uma reformulação urgente no design.

Aplicativo seguro e confiável. Nunca tive problemas com transações.

Falta de tutoriais para iniciantes. Seria bom ter mais material educativo.

Performance excelente, carrega muito rápido. Parabéns aos desenvolvedores!`

    setComments(sampleComments)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Análise de Sentimentos com IA
          </CardTitle>
          <CardDescription>
            Cole comentários de usuários para análise automática usando Google Gemini
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button 
              variant="outline" 
              onClick={loadSampleComments}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Carregar Exemplo
            </Button>
          </div>
          
          <Textarea
            placeholder="Cole aqui os comentários dos usuários para análise..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={8}
            className="min-h-[200px]"
          />
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          <Button 
            onClick={analyzeComments}
            disabled={!comments.trim() || analyzing}
            className="w-full"
            size="lg"
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analisando com IA...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Analisar Sentimentos
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Processando com Google Gemini...</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Processando texto de entrada
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Identificando sentimentos
                </div>
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Extraindo temas e insights
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Gerando recomendações
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <div className="space-y-6">
          {/* Resultados da Análise */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados da Análise</CardTitle>
              <CardDescription>Análise automática usando Google Gemini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{results.sentiment.positive}%</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Positivo</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{results.sentiment.neutral}%</div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">Neutro</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{results.sentiment.negative}%</div>
                  <div className="text-sm text-red-700 dark:text-red-300">Negativo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temas Identificados */}
          <Card>
            <CardHeader>
              <CardTitle>Principais Temas</CardTitle>
              <CardDescription>Temas mais mencionados nos comentários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.themes.map((theme, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {theme}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Insights da IA</CardTitle>
              <CardDescription>Descobertas automáticas da análise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendações</CardTitle>
              <CardDescription>Sugestões de melhorias baseadas na análise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SentimentAnalyzer

