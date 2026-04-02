# EVO FITNESS - Sistema de Treinos e Gestão

O **EVO FITNESS** é um ecossistema completo para academias ou personal trainers que inclui um **aplicativo web (PWA) focado no aluno** e um **Painel de Administração** para gerenciamento de clientes, permissões e status financeiro.

## Principais Funcionalidades

### Aplicativo do Aluno (`Index.html`)
- **Acesso Seguro:** O aluno só entra com e-mail e senha previamente cadastrados pelo Administrador.
- **Home Interativa:** Exibição de treinos rápidos (Cárdio), Dicas de Saúde atualizadas automaticamente, Controle de Água diário e a nova aba de Nutrição (Pré, Durante e Pós treino).
- **Avisos Financeiros:** Se a mensalidade estiver pendente, o aluno é alertado logo na tela inicial. Se for bloqueado, o acesso é negado no momento do login.
- **Treinos e Medidas:** Histórico de medidas corporais, visualizador interativo de treinos e timer automatizado.
- **Loja Virtual (`loja.html`):** Uma vitrine com suplementos e equipamentos integrados ao tema do app.

### Painel Admin (`padm.html`)
- **Gestão de Clientes:** Criação de conta do aluno, definição de Nível de Treino (Iniciante, Intermediário, Avançado), controle de mensalidade e dia de vencimento.
- **Controle de Acesso:** Permite ao Admin bloquear ou liberar o acesso do usuário no app e gerenciar a "Notificação de Pagamento" para inadimplências.

## Como Executar
Por ser construído inteiramente com HTML, TailwindCSS (via CDN) e JS vanilla, não é necessária a instalação de bibliotecas `npm`.
1. Para o banco de dados funcionar corretamente via Firebase Realtime Database, você precisa rodar os arquivos num ambiente de servidor web. 
2. Utilize extensões como o **Live Server** no VSCode ou qualquer servidor http local (como o `python -m http.server`).
3. Abra o arquivo `Index.html` para testar o App ou clique na logo de login (EVO FITNESS) para ir para o painel administrador (`padm.html`). Acesso padrão admin: admin / 123.

## Tecnologias Utilizadas
- HTML5 & CSS3
- Tailwind CSS (via CDN)
- Javascript Vanilla (Módulos ES6)
- FontAwesome & Lucide Icons
- Firebase (Realtime Database para armazenamento de Clientes, Senhas e Configurações)

---
*Projeto idealizado para promover evolução física e digital!*