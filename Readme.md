# Node Boilerplate

Baseado no [boilerplate-apps-router](https://github.com/React-Avancado/boilerplate-apps-router) do curso [React Avançado](https://reactavancado.com.br/)

## Tecnologias

### Core

- **[Node.js](https://nodejs.org/pt)** - Runtime JavaScript assíncrono orientado a eventos para desenvolvimento de aplicações server-side escaláveis e de alta performance.

### Gerenciador de Pacotes

- **[pnpm](https://pnpm.io/)** - Gerenciador de pacotes rápido, eficiente e que economiza espaço em disco através de links simbólicos, garantindo instalações mais rápidas e consistência nas dependências.

### Linguagem e Tipagem

- **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript que adiciona tipagem estática, melhorando a experiência de desenvolvimento, detectando erros em tempo de compilação e facilitando a manutenção do código.

### Testes

- **[Jest](https://jestjs.io/pt-BR/)** - Framework de testes JavaScript com suporte a cobertura de código, mocks, snapshots e execução em paralelo, configurado com ambiente Node.js para testes de aplicações server-side.

### Qualidade de Código

- **[ESLint](https://eslint.org/)** - Linter configurado com regras para Node.js, TypeScript e Jest, incluindo plugin para ordenação automática de imports.
- **[Prettier](https://prettier.io/)** - Formatador de código que garante consistência visual no estilo de código, integrado com ESLint e configurado para executar automaticamente.

### Git Hooks e Workflow

- **[Husky](https://typicode.github.io/husky/)** - Gerencia Git hooks para automatizar tarefas como linting e validação de commits antes do push.
- **[Commitlint](https://commitlint.js.org/)** - Valida mensagens de commit seguindo convenções semânticas com emojis, garantindo padronização e clareza no histórico do projeto.
- **[lint-staged](https://www.npmjs.com/package/lint-staged)** - Executa linters apenas nos arquivos modificados durante o commit, otimizando performance e garantindo qualidade.

### Configuração e Ambiente

- **[Dotenv](https://www.npmjs.com/package/dotenv)** - Carrega variáveis de ambiente de arquivos `.env` para configuração segura da aplicação.
- **[tsc-alias](https://www.npmjs.com/package/tsc-alias)** - Resolve aliases de caminho TypeScript após a compilação, permitindo imports limpos e organizados.
- **[tsx](https://www.npmjs.com/package/tsx)** - Executor TypeScript rápido para desenvolvimento com hot reload e suporte completo ao ecossistema Node.js.

## Scripts

### Desenvolvimento

- **`dev`** - Inicia o servidor de desenvolvimento com hot reload usando tsx para execução direta de TypeScript.
- **`build`** - Compila o projeto TypeScript para JavaScript e resolve aliases de caminho para produção.
- **`start`** - Inicia o servidor de produção após o build, executando a versão compilada com suporte a aliases.

### Testes

- **`test`** - Executa todos os testes uma única vez usando Jest em modo sequencial.
- **`test:watch`** - Executa os testes em modo watch, reexecutando automaticamente quando arquivos são modificados.

### Qualidade de Código

- **`lint:check`** - Verifica problemas de linting no código sem fazer correções automáticas.
- **`lint:fix`** - Executa o ESLint e corrige automaticamente os problemas que podem ser resolvidos.
- **`prettier:check`** - Verifica se o código está formatado corretamente segundo as regras do Prettier.
- **`prettier:fix`** - Formata automaticamente todo o código usando Prettier.

### Configuração

- **`prepare`** - Script executado automaticamente após `pnpm install`, configura o Husky para os Git hooks.

## CI/CD (Continuous Integration/Continuous Deployment)

O projeto está configurado com um pipeline de CI/CD usando **GitHub Actions** que garante a qualidade e consistência do código antes de qualquer merge.

### Fluxo de Integração Contínua

O pipeline é executado automaticamente em **todos os Pull Requests** e inclui as seguintes etapas:

#### 🔄 **Configuração do Ambiente**

- **Sistema**: Ubuntu Latest
- **Node.js**: Versão LTS Iron (definida em `.nvmrc`)
- **Gerenciador de Pacotes**: pnpm
- **Cache**: Dependências pnpm são cacheadas para otimizar performance

#### 📦 **Instalação de Dependências**

```yaml
pnpm install --frozen-lockfile
```

- Instala dependências de forma limpa e determinística usando pnpm
- Usa cache para acelerar o processo
- `--frozen-lockfile` garante instalação exata conforme especificado no `pnpm-lock.yaml`

#### ✅ **Validações de Qualidade**

1. **Commitlint** - Valida mensagens de commit
   - Verifica se seguem o padrão semântico com emojis
   - Analisa todos os commits do PR

2. **Prettier** - Verificação de formatação

   ```bash
   pnpm run prettier:check
   ```

   - Garante consistência no estilo do código

3. **ESLint** - Análise de código

   ```bash
   pnpm run lint:check
   ```

   - Verifica problemas de linting
   - Aplica regras do Node.js, TypeScript e Jest

4. **Testes** - Execução automatizada

   ```bash
   pnpm run test
   ```

   - Executa todos os testes em modo sequencial
   - Configurado para ambiente de integração contínua

### 🚦 **Critérios de Aprovação**

Para que um Pull Request seja aprovado, **todas** as validações devem passar:

- ✅ Mensagens de commit seguem o padrão
- ✅ Código está formatado corretamente
- ✅ Não há problemas de linting
- ✅ Todos os testes passam

## Uso do pnpm

Este projeto utiliza o **pnpm** como gerenciador de pacotes. O pnpm oferece várias vantagens:

- **Performance**: Instalações mais rápidas através de links simbólicos
- **Eficiência**: Economiza espaço em disco reutilizando dependências
- **Segurança**: Estrutura de node_modules mais segura
- **Compatibilidade**: Totalmente compatível com npm e yarn

### Comandos Principais

```bash
# Instalar dependências
pnpm install

# Instalar dependência de produção
pnpm add <package>

# Instalar dependência de desenvolvimento
pnpm add -D <package>

# Executar scripts
pnpm run <script>

# Executar comandos
pnpm exec <command>
```

## Passo a passo

Escrevi [esse tutorial](https://www.tabnews.com.br/diasjoaovitor/tutorial-como-criar-um-boilerplate-para-projetos-node-js) incluindo todos os passos para a criação do boilerplate

Caso queira utilizar esse boilerplate:

```sh
pnpm dlx degit https://github.com/diasjoaovitor/node-boilerplate my-app
```
