# 📊 Dashboard de Análise de Apps de Investimento

> Análise inteligente de sentimentos e insights executivos com IA para aplicativos de investimento

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4.svg)](https://ai.google.dev/)

## 🎯 Visão Geral

O Dashboard de Análise de Apps de Investimento é uma aplicação web moderna que utiliza inteligência artificial para analisar aplicativos de investimento através de:

- **Análise de Sentimentos** com Google Gemini
- **Dashboards Interativos** com métricas em tempo real
- **Geração Automática de Backlog** baseada em IA
- **Ranking Competitivo** destacando o Íon Investimentos
- **Insights Executivos** para tomada de decisão

## 🚀 Funcionalidades Principais

### 📈 Dashboard Executivo
- Visão consolidada de métricas de performance
- Comparação competitiva entre aplicativos
- Destaque especial para o Íon Investimentos
- Gráficos interativos e responsivos

### 🧠 Análise de Sentimentos com IA
- Processamento automático de comentários
- Classificação em positivo, neutro e negativo
- Extração de temas recorrentes
- Insights automáticos gerados por IA

### 🏆 Ranking de Aplicativos
- Classificação baseada em múltiplos critérios
- Análise comparativa detalhada
- Identificação de líderes de mercado
- Oportunidades de posicionamento

### 💬 Análise de Comentários
- Categorização automática de feedback
- Identificação de elogios e reclamações
- Análise qualitativa profunda
- Tendências de satisfação

### ⚡ Geração Inteligente de Backlog
- Criação automática de itens priorizados
- Estimativas de esforço baseadas em IA
- Identificação de dependências
- Raciocínio explicável da IA

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **shadcn/ui** - Componentes de interface
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones modernos

### Backend & APIs
- **Flask** - API REST (Python)
- **Google Gemini** - Análise de IA
- **Vercel** - Hospedagem do backend
- **GitHub Pages** - Hospedagem do frontend

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Git** - Controle de versão

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/cledsonborges/frontapps.git
cd frontapps
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 4. Execute em modo de desenvolvimento
```bash
npm run dev
```

### 5. Acesse a aplicação
```
http://localhost:5173
```

## 🏗️ Arquitetura

![Arquitetura da Aplicação](./docs/arquitetura.png)

A aplicação segue uma arquitetura moderna de frontend separado do backend:

- **Frontend React** hospedado no GitHub Pages
- **Backend Flask** hospedado na Vercel
- **APIs REST** para comunicação
- **Google Gemini** para análise de IA
- **Scraping automatizado** das lojas de apps

## 📊 Estrutura do Projeto

```
investment-dashboard/
├── src/
│   ├── components/          # Componentes React
│   │   ├── SentimentAnalyzer.jsx
│   │   └── BacklogGenerator.jsx
│   ├── services/           # Serviços e APIs
│   │   └── ApiService.js
│   ├── lib/               # Utilitários
│   └── App.jsx            # Componente principal
├── docs/                  # Documentação
│   ├── documentacao-tecnica.md
│   └── arquitetura.png
├── public/               # Assets estáticos
└── package.json         # Dependências
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Deploy
npm run deploy
```

## 🌐 Deploy

### GitHub Pages (Automático)
O deploy é realizado automaticamente via GitHub Pages quando há push na branch main.

### Manual
```bash
npm run build
npm run deploy
```

## 📈 Uso da Aplicação

### 1. Dashboard Principal
- Acesse a visão geral com métricas consolidadas
- Visualize o destaque do Íon Investimentos
- Analise gráficos comparativos

### 2. Análise de Sentimentos
- Cole comentários na área de texto
- Clique em "Analisar Sentimentos"
- Visualize resultados detalhados com insights

### 3. Geração de Backlog
- Acesse a aba "Backlog IA"
- Clique em "Gerar Backlog Inteligente"
- Analise itens priorizados com estimativas

## 🔐 Segurança

- Comunicação HTTPS obrigatória
- Variáveis de ambiente para dados sensíveis
- Validação de entrada de dados
- Tratamento seguro de APIs

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe

- **Desenvolvimento:** Manus AI
- **Backend API:** [BFF-Analyse](https://github.com/cledsonborges/bff-analyse)
- **Análise de IA:** Google Gemini

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma [issue](https://github.com/cledsonborges/frontapps/issues)
- Consulte a [documentação técnica](./docs/documentacao-tecnica.md)

## 🔗 Links Úteis

- [Aplicação em Produção](https://cledsonborges.github.io/frontapps/)
- [Backend API](https://bff-analyse.vercel.app/)
- [Documentação Técnica](./docs/documentacao-tecnica.md)
- [Google Gemini](https://ai.google.dev/)

---

**Desenvolvido com ❤️ por Manus AI**

