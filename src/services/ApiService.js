// Serviço para integração com APIs
class ApiService {
  constructor() {
    this.baseUrl = 'https://bff-analyse.vercel.app/api'
    this.geminiApiKey = 'AIzaSyA_dmMQb9pOglYE-O5325CdIqmoCloVSLI'
  }

  // Buscar lista de aplicativos
  async getApps() {
    try {
      const response = await fetch(`${this.baseUrl}/apps`)
      if (!response.ok) {
        throw new Error('Erro ao buscar aplicativos')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API getApps:', error)
      throw error
    }
  }

  // Buscar detalhes de um aplicativo específico
  async getAppDetails(appId) {
    try {
      const response = await fetch(`${this.baseUrl}/apps/${appId}`)
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do aplicativo')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API getAppDetails:', error)
      throw error
    }
  }

  // Buscar reviews de um aplicativo
  async getAppReviews(appId) {
    try {
      const response = await fetch(`${this.baseUrl}/apps/${appId}/reviews`)
      if (!response.ok) {
        throw new Error('Erro ao buscar reviews do aplicativo')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API getAppReviews:', error)
      throw error
    }
  }

  // Fazer scraping do Google Play
  async scrapeGooglePlay(appId) {
    try {
      const response = await fetch(`${this.baseUrl}/scraping/google-play/${appId}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Erro no scraping do Google Play')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API scrapeGooglePlay:', error)
      throw error
    }
  }

  // Fazer scraping da Apple Store
  async scrapeAppleStore(appId) {
    try {
      const response = await fetch(`${this.baseUrl}/scraping/apple-store/${appId}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Erro no scraping da Apple Store')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API scrapeAppleStore:', error)
      throw error
    }
  }

  // Analisar sentimentos usando o backend
  async analyzeSentiment(comments) {
    try {
      const response = await fetch(`${this.baseUrl}/sentiment/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comments })
      })
      if (!response.ok) {
        throw new Error('Erro na análise de sentimentos')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API analyzeSentiment:', error)
      throw error
    }
  }

  // Simular criação de issue no GitHub
  async simulateGitHubIssue(appId) {
    try {
      const response = await fetch(`${this.baseUrl}/github/simulate-issue/${appId}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Erro ao simular issue do GitHub')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API simulateGitHubIssue:', error)
      throw error
    }
  }

  // Verificar status da API
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl.replace('/api', '')}/health`)
      if (!response.ok) {
        throw new Error('API não está respondendo')
      }
      return await response.json()
    } catch (error) {
      console.error('Erro na API checkHealth:', error)
      throw error
    }
  }

  // Análise de sentimentos com Gemini (simulada)
  async analyzeWithGemini(text) {
    // Simulação da análise com Gemini
    // Em produção, isso seria uma chamada real para a API do Gemini
    return new Promise((resolve) => {
      setTimeout(() => {
        const words = text.toLowerCase().split(' ')
        
        // Palavras positivas e negativas para análise simples
        const positiveWords = ['excelente', 'ótimo', 'bom', 'gosto', 'recomendo', 'fácil', 'útil', 'intuitivo']
        const negativeWords = ['péssimo', 'ruim', 'problema', 'lento', 'confuso', 'difícil', 'bug', 'erro']
        
        let positiveCount = 0
        let negativeCount = 0
        
        words.forEach(word => {
          if (positiveWords.some(pw => word.includes(pw))) positiveCount++
          if (negativeWords.some(nw => word.includes(nw))) negativeCount++
        })
        
        const total = positiveCount + negativeCount
        const positive = total > 0 ? Math.round((positiveCount / total) * 100) : 50
        const negative = total > 0 ? Math.round((negativeCount / total) * 100) : 20
        const neutral = 100 - positive - negative
        
        resolve({
          sentiment: {
            positive: Math.max(positive, 30),
            neutral: Math.max(neutral, 15),
            negative: Math.max(negative, 10)
          },
          themes: this.extractThemes(text),
          insights: this.generateInsights(text),
          recommendations: this.generateRecommendations(text)
        })
      }, 2000)
    })
  }

  // Extrair temas do texto
  extractThemes(text) {
    const themes = []
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('interface') || lowerText.includes('design')) {
      themes.push('Interface do usuário')
    }
    if (lowerText.includes('lento') || lowerText.includes('performance') || lowerText.includes('carregar')) {
      themes.push('Performance')
    }
    if (lowerText.includes('suporte') || lowerText.includes('atendimento')) {
      themes.push('Suporte ao cliente')
    }
    if (lowerText.includes('funcionalidade') || lowerText.includes('recurso')) {
      themes.push('Funcionalidades')
    }
    if (lowerText.includes('segurança') || lowerText.includes('seguro')) {
      themes.push('Segurança')
    }
    
    return themes.length > 0 ? themes : ['Interface do usuário', 'Performance', 'Funcionalidades']
  }

  // Gerar insights baseados no texto
  generateInsights(text) {
    const insights = []
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('fácil') || lowerText.includes('intuitiv')) {
      insights.push('Usuários elogiam a facilidade de uso')
    }
    if (lowerText.includes('lento') || lowerText.includes('carregar')) {
      insights.push('Reclamações sobre lentidão são recorrentes')
    }
    if (lowerText.includes('suporte')) {
      insights.push('Suporte precisa de melhorias')
    }
    if (lowerText.includes('segur')) {
      insights.push('Segurança é um ponto forte')
    }
    
    return insights.length > 0 ? insights : [
      'Usuários valorizam a facilidade de uso',
      'Performance pode ser melhorada',
      'Funcionalidades são bem avaliadas'
    ]
  }

  // Gerar recomendações baseadas no texto
  generateRecommendations(text) {
    const recommendations = []
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('lento') || lowerText.includes('performance')) {
      recommendations.push('Otimizar performance da aplicação')
    }
    if (lowerText.includes('suporte')) {
      recommendations.push('Melhorar tempo de resposta do suporte')
    }
    if (lowerText.includes('confus') || lowerText.includes('difícil')) {
      recommendations.push('Simplificar interface do usuário')
    }
    if (lowerText.includes('tutorial') || lowerText.includes('ajuda')) {
      recommendations.push('Adicionar mais tutoriais')
    }
    
    return recommendations.length > 0 ? recommendations : [
      'Continuar melhorando a experiência do usuário',
      'Implementar feedback dos usuários',
      'Monitorar performance continuamente'
    ]
  }

  // Gerar backlog baseado na análise
  generateBacklog(sentimentData) {
    const backlogItems = []
    
    if (sentimentData && sentimentData.insights) {
      sentimentData.insights.forEach((insight, index) => {
        if (insight.includes('lentidão') || insight.includes('performance')) {
          backlogItems.push({
            id: backlogItems.length + 1,
            title: 'Otimizar Performance',
            description: 'Melhorar velocidade de carregamento e responsividade',
            priority: 'Alta',
            category: 'Performance',
            effort: 'Médio',
            impact: 'Alto',
            estimatedHours: 40,
            aiReasoning: 'Baseado em feedback sobre lentidão'
          })
        }
        
        if (insight.includes('suporte')) {
          backlogItems.push({
            id: backlogItems.length + 1,
            title: 'Melhorar Suporte',
            description: 'Implementar chatbot e reduzir tempo de resposta',
            priority: 'Alta',
            category: 'Atendimento',
            effort: 'Alto',
            impact: 'Alto',
            estimatedHours: 60,
            aiReasoning: 'Identificadas reclamações sobre suporte'
          })
        }
      })
    }
    
    // Itens padrão se não houver dados específicos
    if (backlogItems.length === 0) {
      backlogItems.push(
        {
          id: 1,
          title: 'Implementar Cache Inteligente',
          description: 'Sistema de cache para melhorar performance',
          priority: 'Alta',
          category: 'Performance',
          effort: 'Médio',
          impact: 'Alto',
          estimatedHours: 40,
          aiReasoning: 'Melhoria geral de performance'
        },
        {
          id: 2,
          title: 'Dashboard de Analytics',
          description: 'Painel para acompanhar métricas de uso',
          priority: 'Média',
          category: 'Funcionalidade',
          effort: 'Alto',
          impact: 'Médio',
          estimatedHours: 80,
          aiReasoning: 'Necessidade de insights de uso'
        }
      )
    }
    
    return backlogItems
  }
}

export default new ApiService()

