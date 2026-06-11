# Venda Me 🛍️

Uma plataforma moderna de marketplace para compra e venda de produtos. Desenvolvida com as mais recentes tecnologias web, oferecendo uma experiência de usuário fluida e intuitiva.

---

## 📋 Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Rodando a Aplicação](#rodando-a-aplicação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura de Rotas](#estrutura-de-rotas)

---

## 💡 Sobre

**Venda Me** é uma aplicação web que permite usuários a anunciar, visualizar e gerenciar produtos para venda. O sistema oferece funcionalidades completas de:

- Autenticação e controle de acesso
- Gerenciamento de anúncios de produtos
- Visualização detalhada de produtos
- Sistema de categorias
- Interface responsiva e moderna
- Validação de formulários com feedback em tempo real

---

## 🛠️ Tecnologias

### Frontend Framework

- **React** - Biblioteca JavaScript para construir interfaces de usuário com componentes reutilizáveis e gerenciamento eficiente de estado
- **TypeScript** - Adiciona tipagem estática ao JavaScript, melhorando a qualidade do código e detectando erros em tempo de desenvolvimento

### Estilização

- **Tailwind CSS** - Framework CSS utilitário que permite criar designs responsivos rapidamente usando classes predefinidas
- **@tailwindcss/vite** - Plugin do Vite para otimizar o Tailwind CSS durante o desenvolvimento e build

### Roteamento

- **React Router DOM** - Biblioteca para gerenciar navegação entre páginas na SPA (Single Page Application)

### Gerenciamento de Estado

- **Zustand** - Biblioteca leve e minimalista para gerenciamento global de estado, mais simples que Redux

### Formulários

- **React Hook Form** - Biblioteca para gerenciar formulários com validação, performance otimizada e sem re-renders desnecessários
- **@hookform/resolvers** - Pacote que permite usar diferentes bibliotecas de validação com React Hook Form

### Validação

- **Zod** - Biblioteca TypeScript-first para validação de dados com schemas declarativos

### Ícones

- **React Icons** - Biblioteca com centenas de ícones SVG populares prontos para usar em React

### Máscara de Entrada

- **React Input Mask** - Componente para aplicar máscaras em campos de entrada (ex: telefone, CPF)
- **React IMask** - Alternativa robusta para máscaras de entrada

### Requisições HTTP

- **Axios** - Cliente HTTP para fazer requisições ao backend de forma simples e confiável

### Notificações

- **React Hot Toast** - Biblioteca para exibir notificações (toasts) elegantes em tempo real

### Manipulação de Datas

- **Dayjs** - Biblioteca leve para parsing, validação e manipulação de datas

### Drag and Drop

- **@dnd-kit/core** - Biblioteca principal para implementar funcionalidades de drag and drop
- **@dnd-kit/sortable** - Extensão do dnd-kit para tornar itens ordenáveis
- **@dnd-kit/utilities** - Utilitários auxiliares para dnd-kit

### Carrossel

- **Swiper** - Biblioteca para criar carrosséis e sliders responsivos com muitas funcionalidades

### Tooltips

- **React Tooltip** - Componente para exibir tooltips informativos ao passar o mouse

### Build e Development

- **Vite** - Build tool moderno extremamente rápido para desenvolvimento e produção
- **@vitejs/plugin-react** - Plugin do Vite que usa Oxc para compilação otimizada

### Linting

- **ESLint** - Ferramenta de linting para identificar e corrigir problemas no código
- **TypeScript ESLint** - Plugin de ESLint com suporte para TypeScript
- **eslint-plugin-react-hooks** - Plugin ESLint para validar regras de React Hooks
- **eslint-plugin-react-refresh** - Plugin ESLint para React Fast Refresh

### Desenvolvimento

- **json-server** - Servidor fake para desenvolvimento e testes, usa um arquivo JSON como banco de dados

---

## 📁 Estrutura de Pastas

```
venda-me/
├── src/
│   ├── assets/                 # Recursos estáticos (imagens, ícones)
│   │   ├── logo.png           # Logo da aplicação
│   │   ├── favicon.svg        # Ícone da aba do navegador
│   │   └── empty.svg          # Ícone para estados vazios
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Avatar.tsx          # Componente de avatar de usuário
│   │   ├── Badge.tsx           # Componente para badges/tags
│   │   ├── Button.tsx          # Componente de botão personalizado
│   │   ├── Dropdown.tsx        # Componente de menu dropdown
│   │   ├── EmptyContent.tsx    # Componente para estado vazio
│   │   ├── FormField.tsx       # Campo de formulário reutilizável
│   │   ├── KpiCard.tsx         # Card para exibir KPIs/estatísticas
│   │   ├── Loader.tsx          # Componente de carregamento
│   │   ├── Menu.tsx            # Componente de menu navegação
│   │   ├── Modal.tsx           # Componente de modal/diálogo
│   │   ├── PrivateRoute.tsx    # HOC para proteger rotas autenticadas
│   │   ├── ProductCard.tsx     # Card de produto
│   │   ├── SelectInput.tsx     # Input seletor customizado
│   │   ├── SortableItem.tsx    # Item ordernável (drag & drop)
│   │   └── UserForm.tsx        # Formulário de edição de usuário
│   │
│   ├── layouts/                # Layouts principais
│   │   └── Layout.tsx          # Layout padrão com header/footer
│   │
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Home.tsx            # Página inicial com listagem de produtos
│   │   ├── Login.tsx           # Página de autenticação
│   │   ├── ProductForm.tsx     # Formulário para criar/editar produto
│   │   ├── ProductDetails.tsx  # Detalhes de um produto
│   │   ├── MyListings.tsx      # Listagem dos produtos do usuário
│   │   └── NotFound.tsx        # Página 404 customizada
│   │
│   ├── services/               # Chamadas à API
│   │   ├── api.ts              # Instância do axios configurada
│   │   ├── users.ts            # Serviço de usuários
│   │   ├── products.ts         # Serviço de produtos
│   │   ├── categories.ts       # Serviço de categorias
│   │   └── login.ts            # Serviço de autenticação
│   │
│   ├── store/                  # Estado global (Zustand)
│   │   └── authStore.ts        # Store de autenticação
│   │
│   ├── types/                  # Tipos TypeScript
│   │   ├── productType.ts      # Interface de Produto
│   │   └── userType.ts         # Interface de Usuário
│   │
│   ├── utils/                  # Funções utilitárias
│   │   └── compressImage.ts    # Função para compressão de imagens
│   │
│   ├── App.tsx                 # Componente raiz com rotas
│   ├── main.tsx                # Ponto de entrada da aplicação
│   └── index.css               # Estilos globais
│
├── public/                     # Arquivos públicos estáticos
├── db.json                     # Banco de dados fake para json-server
├── package.json                # Dependências e scripts do projeto
├── tsconfig.json               # Configuração TypeScript
├── vite.config.ts              # Configuração do Vite
├── eslint.config.js            # Configuração do ESLint
└── README.md                   # Este arquivo
```

---

## ✅ Requisitos

Antes de começar, certifique-se de que tem instalado:

- **Node.js** 18.0.0 ou superior ([Download](https://nodejs.org/))
- **npm** 9.0.0 ou superior (incluído com Node.js) ou **yarn**

Verifique as versões instaladas:

```bash
node --version
npm --version
```

---

## 📦 Instalação

1. **Clone o repositório** (se ainda não tiver):

```bash
git clone <url-do-repositorio>
cd venda-me
```

2. **Instale as dependências**:

```bash
npm install
```

Ou se usar yarn:

```bash
yarn install
```

3. **Verifique a instalação**:

```bash
npm list react
```

---

## 🚀 Rodando a Aplicação

A aplicação pode ser rodada de duas formas:

### Opção 1: Sem Docker (Desenvolvimento Local)

A aplicação requer dois servidores rodando em paralelo:

#### 1.1. Servidor de Desenvolvimento (Frontend)

Em um terminal, execute:

```bash
npm run dev
```

Isso iniciará o Vite em `http://localhost:5173` com:

- ✨ Hot Module Replacement (HMR) para recarregamento automático
- 🔍 ESLint para verificação de código
- 📱 Acesso em qualquer dispositivo da rede usando o IP local

#### 1.2. Servidor de API (Backend Fake)

Em outro terminal, execute:

```bash
npm run api
```

Isso iniciará o json-server em `http://localhost:3000` com:

- 📝 CRUD operations automáticas baseadas em `db.json`
- 📊 RESTful API completa
- 🔄 Reload automático ao modificar `db.json`

#### 1.3. Acesse a Aplicação

Abra seu navegador em:

```
http://localhost:5173
```

---

### Opção 2: Com Docker (Recomendado para Produção)

Se você tiver Docker e Docker Compose instalados:

#### 2.1. Inicie os Containers

```bash
docker-compose up -d
```

Isso criará e iniciará os contêineres em background.

#### 2.2. Acesse o Container

```bash
docker-compose exec app bash
```

Isso abre um terminal interativo dentro do container.

#### 2.3. Inicie o Frontend

Dentro do container, em um terminal execute:

```bash
npm run dev
```

#### 2.4. Inicie o Backend (API)

Em outro terminal, execute novamente:

```bash
docker-compose exec app bash
```

E rode a API:

```bash
npm run api
```

#### 2.5. Acesse a Aplicação

Abra seu navegador em:

```
http://localhost:5173
```

#### Gerenciar os Containers

**Parar os contêineres:**

```bash
docker-compose down
```

**Reconstruir as imagens (se houver mudanças):**

```bash
docker-compose up -d --build
```

**Ver logs dos containers:**

```bash
docker-compose logs -f
```

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação

- Sistema de login/logout
- Proteção de rotas privadas
- Persistência de sessão via localStorage
- Estado global com Zustand

### 📦 Gerenciamento de Produtos

- Criar novo anúncio
- Editar anúncio existente
- Deletar anúncio
- Pausar anúncio
- Reativar anúncio
- Marcar anúncio como vendido
- Visualizar detalhes completos
- Filtrar por categorias
- Busca de produtos

### 👤 Perfil de Usuário

- Editar informações pessoais
- Visualizar anúncios do usuário
- Avatar personalizado

### 🎨 Interface

- Design responsivo
- Animações fluidas
- Estados de carregamento
- Notificações em tempo real
- Componentes reutilizáveis

### ✅ Validação

- Validação de formulários com Zod
- Mensagens de erro em tempo real
- Máscaras de entrada para dados especiais

---

## 🗺️ Estrutura de Rotas

```
/                          → Home (listagem de produtos)
/login                     → Página de autenticação
/anuncio/:id              → Detalhes do produto
/anuncio/:id/editar       → Editar produto (privado)
/anunciar                 → Criar novo produto (privado)
/meus-anuncios            → Meus produtos (privado)
/*                        → 404 Página não encontrada
```

---

## 👨‍💻 Desenvolvido por

Dayane Santos - [GitHub](https://github.com/dayaneglsantos)

---

**Última atualização**: Junho de 2026
