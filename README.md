<div align="center">
  <img src="./public/logo.png" alt="Pergunta da Igreja SUD" width="250" />
  
  # 📖 Pergunta da Igreja SUD

**Uma plataforma interativa de quizzes baseada em IA para aprender sobre as escrituras sagradas da Igreja de Jesus Cristo dos Santos dos Últimos Dias**

</div>

---

## 📋 Descricao

O **Pergunta da Igreja SUD** é uma aplicação web moderna que utiliza inteligência artificial (Google Gemini) para gerar perguntas dinâmicas e educativas sobre as escrituras e doutrinas da Igreja SUD. Os usuários podem testar seus conhecimentos em diferentes categorias de estudo, rastrear seu desempenho e competir em rankings por tema.

---

## 🎯 Objetivo

- **Educação Interativa**: Proporcionar uma forma divertida e engajante de aprender sobre as escrituras sagradas
- **Personalização**: Permitir que os usuários selecionem categorias de estudo específicas
- **Gamificação**: Implementar sistema de pontuação e rankings para motivar o aprendizado
- **IA Generativa**: Utilizar modelos de linguagem para gerar perguntas variadas e desafiadoras
- **Acompanhamento de Progresso**: Armazenar histórico de pontuações e melhor desempenho por categoria

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **[Next.js 14](https://nextjs.org)** - Framework React com SSR e App Router
- **[React 18](https://react.dev)** - Biblioteca de UI componentes
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitário para estilização
- **[Context API](https://react.dev/reference/react/useContext)** - Gerenciamento de estado
- **[Redux](https://redux.js.org)** - Gerenciador de estado centralizado (reducers)

### Backend & Dados

- **[Firebase Authentication](https://firebase.google.com/docs/auth)** - Autenticação de usuários
- **[Firestore Database](https://firebase.google.com/docs/firestore)** - Banco de dados NoSQL
- **[Google Gemini API](https://ai.google.dev)** - Geração de perguntas com IA

### Desenvolvimento

- **[ESLint](https://eslint.org)** - Linting de código
- **[PostCSS](https://postcss.org)** - Processador CSS
- **[pnpm](https://pnpm.io)** - Package manager eficiente

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação

- Registro e login de usuários
- Autenticação com Firebase
- Persistência de sessão

### 📚 Categorias de Estudo

- Livro de Mórmon
- Doutrina e Convênios (D&C)
- Pérola de Grande Valor
- Velho Testamento
- Novo Testamento
- Outros tópicos

### 🧠 Sistema de Quiz

- Geração automática de perguntas via IA
- 4 opções de resposta (A, B, C, D)
- Feedback imediato sobre respostas
- Barra de progresso visual

### 📊 Estatísticas e Rankings

- Pontuação por categoria
- Histórico de desempenho
- Armazenamento da melhor pontuação por tema
- Rankings globais por categoria

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** 18+ ou **Bun**
- **pnpm** (recomendado) ou npm/yarn
- Conta no [Firebase](https://firebase.google.com)
- Chave API do [Google Gemini](https://ai.google.dev)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/projeto-quiz-sud.git
   cd projeto-quiz-sud
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:

   ```
   GEMINI_API_KEY=sua_chave_gemini
   ```

4. **Execute o servidor de desenvolvimento**

   ```bash
   pnpm run dev
   # ou
   npm run dev
   ```

5. **Abra no navegador**
   ```
   http://localhost:3000
   ```

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.js              # Layout principal com Context Provider
│   ├── (public)/              # Rotas públicas
│   │   ├── login/
│   │   └── register/
│   ├── (private)/             # Rotas protegidas (requer autenticação)
│   │   ├── (home)/            # Dashboard principal
│   │   └── lesson/            # Página de quiz
│   └── api/                   # Rotas API
│       └── gemini/            # Endpoint para gerar perguntas
├── components/                # Componentes reutilizáveis
│   ├── Header.js
│   ├── Lessons.js             # Componente do quiz
│   ├── FinishResult.js        # Tela de resultados
│   ├── Table.js               # Ranking de usuários
│   └── ModalAlert.js          # Modais
├── libs/
│   ├── firebase/              # Configurações Firebase
│   │   ├── firebase.config.js
│   │   ├── firebase.auth.js   # Funções de autenticação
│   │   └── firebase.db.js     # Funções de banco de dados
│   ├── mockData.js            # Dados de exemplo
│   └── helpers/               # Funções utilitárias
│       └── validation/        # Validações de formulário
├── reducers/                  # Redux reducers
│   ├── questionsReducer/      # Estado das perguntas
│   └── userReducer/           # Estado do usuário
└── styles/                    # CSS modules
```

---

## 🔄 Fluxo da Aplicação

```
1. Usuário não autenticado → Tela de Login/Registro
   ↓
2. Autenticação com Firebase
   ↓
3. Dashboard → Selecionar categorias
   ↓
4. API Gemini gera perguntas
   ↓
5. Quiz → Responder perguntas
   ↓
6. Resultado → Visualizar pontuação
   ↓
7. Firebase salva melhor score por categoria
   ↓
8. Rankings atualizados
```

---

## 📈 Próximas Melhorias (Roadmap)

- [ ] Sistema de medalhas e badges
- [ ] Modo offline com fallback de perguntas
- [ ] Sistema de comunidade e comentários
- [ ] Modo escuro completo
- [ ] App mobile (React Native)
- [ ] Multiplayer em tempo real
- [ ] Análise detalhada de performance

---

## 🤝 Contribuindo

Sugestões e pull requests são bem-vindos! Para mudanças maiores, abra uma issue primeiro para discutir as alterações propostas.

---

## 📞 Contato

- **Desenvolvedor**: Tiago Silva
- **Email**: xlzthyago@gmail.com

---

<div align="center">
  <p><strong>Desenvolvido com ❤️ para a comunidade SUD</strong></p>
  <p>© 2026 Projeto Quiz SUD. Todos os direitos reservados.</p>
</div>
