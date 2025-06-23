// Paleta de cores do Íon Investimentos
export const ionColors = {
  // Cores principais do Íon
  primary: '#133134',      // Verde escuro (R19 G49 B52)
  secondary: '#A7CE2E',    // Verde claro (R167 G206 B46)
  
  // Variações das cores principais
  primaryLight: '#1a4145',
  primaryDark: '#0d2426',
  secondaryLight: '#b8d94a',
  secondaryDark: '#8fb525',
  
  // Cores de apoio
  accent: '#EC7000',       // Laranja Itaú
  accentLight: '#ff8533',
  accentDark: '#cc5c00',
  
  // Cores neutras
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Cores de status
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Cores para sentimentos
  positive: '#10b981',
  neutral: '#f59e0b',
  negative: '#ef4444',
}

// Configuração do Tailwind CSS customizada
export const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        ion: {
          primary: ionColors.primary,
          secondary: ionColors.secondary,
          'primary-light': ionColors.primaryLight,
          'primary-dark': ionColors.primaryDark,
          'secondary-light': ionColors.secondaryLight,
          'secondary-dark': ionColors.secondaryDark,
          accent: ionColors.accent,
          'accent-light': ionColors.accentLight,
          'accent-dark': ionColors.accentDark,
        }
      }
    }
  }
}

export default ionColors

