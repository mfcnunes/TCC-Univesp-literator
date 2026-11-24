# Literator — Sistema Web + Mobile

Projeto multiplataforma baseado no relatório técnico **Literator: Gestão Inteligente de Acervos Literários**. O repositório contém uma aplicação web React + TypeScript + Firebase e um aplicativo Android/iOS com Expo React Native, usando o mesmo projeto Firebase.

## Funcionalidades incluídas

- Autenticação com conta Google via Firebase Authentication (com persistência local de sessão no app mobile).
- Cadastro inicial de perfil de usuário no Firestore.
- Pesquisa de livros pela Google Books API (título, autor ou assunto).
- Exibição de capas, autores e informações básicas dos livros.
- Inclusão e remoção de livros favoritos, sincronizados no Firestore.
- Redirecionamento para pesquisa do livro na Amazon Brasil.
- Registro de cliques externos para lojas no histórico administrativo.
- Painel de histórico de vendas com registros, totais e cliques.
- Lançamento manual de vendas pelo administrador.
- Layout responsivo na Web e interface nativa para Android/iOS.

## Estrutura

```text
literator-suite/
├── apps/
│   ├── web/                 # React + TypeScript + Vite
│   │   ├── public/hero.png   # ilustração extraída da tela inicial de referência
│   │   └── src/
│   └── mobile/              # Expo + React Native
│       ├── app/              # telas e navegação Expo Router
│       └── src/              # Firebase e pesquisa de livros
├── firestore.rules          # regras iniciais de segurança
├── firebase.json            # configuração de Hosting/Firestore
└── README.md
```

## Início rápido no Windows (sem configurar Firebase)

1. Extraia o ZIP inteiro para uma pasta local.
2. Instale Node.js 20 LTS ou superior: https://nodejs.org/.
3. Dê dois cliques em `INICIAR_WEB_WINDOWS.bat`.
4. Na primeira execução, aguarde `npm install` concluir.
5. Acesse `http://localhost:5173` e clique em **Entrar no modo demonstração**.

O modo demonstração permite testar pesquisa de livros, favoritos e painel administrativo. Os dados ficam no armazenamento local do navegador e não são sincronizados com outros dispositivos. Para login Google e sincronização real, configure o Firebase conforme abaixo.

## 1. Pré-requisitos

- Node.js 20 LTS ou superior e npm.
- Projeto no [Firebase Console](https://console.firebase.google.com/).
- Google Books API (a pesquisa pública funciona sem chave em uso moderado; para produção configure uma chave e limites).
- Para compilar o aplicativo: Expo CLI via `npx expo`, Android Studio para emulador Android ou Xcode em macOS para iOS.

## 2. Configurar Firebase

1. Crie um projeto Firebase.
2. Em **Authentication → Sign-in method**, habilite o provedor **Google**.
3. Em **Firestore Database**, crie o banco em modo de produção.
4. Registre um app Web e copie as credenciais.
5. Copie `apps/web/.env.example` para `apps/web/.env` e preencha os valores `VITE_FIREBASE_*`.
6. Copie `apps/mobile/.env.example` para `apps/mobile/.env` e preencha `EXPO_PUBLIC_FIREBASE_*`.
7. Em **Authentication → Settings → Authorized domains**, adicione o domínio de desenvolvimento e o domínio publicado.
8. Publique as regras com `firebase deploy --only firestore:rules`.

**Importante:** as credenciais de Firebase são específicas do projeto de vocês. Não incluí chaves reais nem credenciais privadas no ZIP. Sem elas, a versão Web inicia em modo demonstração local.

## 3. Executar o sistema Web

Na pasta raiz:

```bash
npm install
npm run dev:web
```

Abra `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build:web
```

A saída estará em `apps/web/dist`. Para publicar no Firebase Hosting, instale/configure o Firebase CLI, faça `firebase login` e execute `firebase deploy --only hosting`.

## 4. Executar o aplicativo Mobile

```bash
cd apps/mobile
npm install
npx expo start
```

Leia o QR Code com Expo Go ou execute `npx expo run:android` para compilar localmente. Configure os OAuth Client IDs Web/Android/iOS no arquivo `.env` e os respectivos pacotes/domínios no Google Cloud Console. O fluxo Google nativo exige os Client IDs adequados para cada plataforma.

Para gerar APK/AAB de distribuição, configure o EAS Build e execute `npx eas build -p android`.

## 5. Habilitar o administrador

O primeiro login cria o documento `users/{UID}` com `role: "user"`. Para habilitar o painel administrativo:

1. Faça login pelo menos uma vez com a conta que será administradora.
2. No Firebase Console → Firestore → coleção `users`, localize o documento cujo ID é o UID dessa conta.
3. Altere o campo `role` para `admin`.
4. Saia e entre novamente no sistema Web.

As regras impedem que o próprio usuário altere seu papel para administrador. Somente um administrador já autorizado pode alterar perfis.

## 6. Sobre o histórico de vendas e afiliados

O sistema registra automaticamente os cliques de saída para a Amazon. **Um clique não comprova uma venda nem informa o valor de uma comissão.** A Amazon não fornece esses dados automaticamente por um simples link. Por isso, o painel permite lançar manualmente os dados de venda/valor pago; uma integração real de conversões dependerá de credenciais e relatórios/API do programa de associados, além da aprovação da conta. Não há credenciais ou integração comercial simulada neste projeto.

Os registros de venda manual devem ser feitos por um administrador. O campo de preço/valor não é estimado pelo aplicativo.

## 7. Correspondência com o TCC

- **Tela inicial:** mantém a identidade do Literator e a ilustração da tela inicial que consta no documento.
- **Figura 4 — Página de acervo e barra de pesquisa:** implementada como página Meu acervo, busca e favoritos com título, autor, capa e link externo de compra.
- **Figura 6 — Histórico de vendas:** implementada como painel administrativo com histórico, valores informados e registros de cliques externos.
- O protótipo descrito no relatório utiliza React, TypeScript e Firebase. O mobile foi acrescentado como uma segunda interface, compartilhando o Firebase.

As imagens de referência das Figuras 4 e 6 estão incluídas na raiz como `docs-figura4.png` e `docs-figura6.png`, apenas para consulta visual.

## 8. Limites conhecidos / evolução

- O sistema está pronto para configuração com um projeto Firebase real; não contém dados de acesso de terceiros.
- A pesquisa usa a API pública Google Books e depende de conectividade.
- A integração Amazon abre resultados de busca do produto; links afiliados personalizados podem ser configurados por `VITE_AMAZON_ASSOCIATE_TAG` (Web) e `EXPO_PUBLIC_AMAZON_ASSOCIATE_TAG` (Mobile), após aprovação no programa.
- Recomendações por machine learning, clustering, previsão de tendências, métricas avançadas e integrações institucionais são possibilidades previstas no escopo teórico, mas não foram apresentadas no protótipo demonstrado como módulos implementados. Não foram inventados como funcionalidades concluídas nesta entrega.
- Antes de produção, recomenda-se revisão de segurança, privacidade/LGPD, limites de API, monitoramento e testes em dispositivos reais.


## Inicializadores incluídos

- `INICIAR_WEB_WINDOWS.bat`: instala as dependências (na primeira execução) e inicia a versão web.
- `INICIAR_MOBILE_WINDOWS.bat`: instala as dependências e inicia o Expo.
- `CONFIGURACAO_RAPIDA.txt`: guia curto em português para configurar Firebase e OAuth.
- `.nvmrc`: indica Node.js 20 como versão recomendada.

A configuração real do Firebase não pode ser concluída sem que o proprietário crie/autorize o projeto em sua conta Google e forneça os valores públicos de configuração do app e os OAuth Client IDs. Nunca envie chave privada de conta de serviço.
