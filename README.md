# Finanças Pro - Gerenciador Financeiro Completo

Um aplicativo completo de gerenciamento financeiro desenvolvido em React com Vite, Firebase e design mobile-first inspirado no Android 16 Expressive 3.

## 🚀 Funcionalidades

### 💰 Gestão Financeira
- **Dashboard Inteligente**: Visão geral completa das finanças
- **Múltiplas Fontes de Renda**: Gerencie diferentes fontes de receita
- **Controle de Gastos**: Categorização inteligente de despesas
- **Metas Financeiras**: Defina e acompanhe objetivos
- **Relatórios Avançados**: Análises detalhadas com gráficos interativos

### 📅 Organização
- **Calendário Integrado**: Agende compromissos financeiros
- **Lembretes Inteligentes**: Notificações de vencimentos
- **Histórico Completo**: Acompanhe todas as transações

### 🔐 Segurança e Sincronização
- **Autenticação Google**: Login seguro e rápido
- **Sincronização em Tempo Real**: Dados salvos no Firebase
- **Backup Automático**: Seus dados sempre seguros
- **Modo Offline**: Funciona mesmo sem internet

## 🛠 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Firebase (Firestore + Authentication)
- **Charts**: Recharts
- **State Management**: Zustand
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Conta no Firebase

### Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative Authentication e Firestore Database
3. Configure o Google como provedor de autenticação
4. Copie as configurações do Firebase

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd financial-manager-pro
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações do Firebase:
```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 📱 Funcionalidades Principais

### Dashboard
- Resumo visual das finanças
- Gráficos de distribuição de gastos
- Timeline de transações recentes
- Ações rápidas

### Receitas
- Múltiplas fontes de renda
- Status de recebimento
- Calendário de recebimentos
- Histórico mensal

### Gastos
- Categorização automática
- Controle por categoria
- Gastos recorrentes
- Análise de tendências

### Metas
- Definição de objetivos
- Acompanhamento visual
- Sugestões de economia
- Sistema de conquistas

### Relatórios
- Gráficos interativos
- Análises de tendências
- Insights inteligentes
- Exportação de dados

### Agenda
- Calendário visual
- Agendamento de compromissos
- Estimativa de custos
- Integração com gastos

### Configurações
- Perfil do usuário
- Preferências de tema
- Configurações de notificação
- Backup e restauração

## 🎨 Design System

O aplicativo utiliza um design system baseado no Android 16 Expressive 3:

- **Cores**: Paleta dinâmica adaptável
- **Animações**: Transições que simulam física real
- **Typography**: Hierarquia clara com fonts expressivas
- **Componentes**: Reutilizáveis e acessíveis
- **Mobile-first**: Interface otimizada para dispositivos móveis

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── auth/           # Componentes de autenticação
│   ├── layout/         # Layout e navegação
│   ├── ui/            # Componentes reutilizáveis
│   └── views/         # Telas principais
├── config/            # Configurações (Firebase)
├── services/          # Serviços (Firebase)
├── store/             # Estado global (Zustand)
├── types/             # Tipos TypeScript
└── utils/             # Utilitários
```

## 📊 Dados de Exemplo

O aplicativo vem com dados de exemplo pré-carregados:

- **Receitas**: Jorge (R$ 1.500), Igreja (R$ 400), Hotel (R$ 100)
- **Categorias**: Transporte, Casa, Compras, Contas Fixas, Saúde, Alimentação
- **Metas**: Viagem de Férias, Reserva de Emergência

## 🚀 Deploy

Para fazer o deploy da aplicação:

1. Build do projeto:
```bash
npm run build
```

2. Deploy no Firebase Hosting:
```bash
firebase deploy
```

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas:
- Abra uma issue no GitHub
- Entre em contato via email

---

Desenvolvido com ❤️ para ajudar você a ter controle total das suas finanças.# money
