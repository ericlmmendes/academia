# EVO FITNESS - Plataforma de Treinos Web

Aplicativo web completo (PWA/Mobile-First) para academias ou personal trainers gerenciarem os treinos, pagamentos e evolução de seus alunos, com um painel de administração integrado via Firebase.

## Funcionalidades Principais

*   **Aplicativo do Aluno (`Index.html`)**:
    *   Acesso restrito (somente alunos cadastrados pelo painel).
    *   Treinos dinâmicos filtrados **automaticamente** pelo nível (Iniciante, Intermediário, Avançado) e gênero (Masculino, Feminino) do usuário.
    *   Player de Treino com timer de descanso, contagem de séries e histórico.
    *   Acompanhamento de medidas corporais, água e streak (dias consecutivos).
    *   Gamificação de progresso (Níveis de Atleta).
    *   Loja embutida e dicas nutricionais.

*   **Painel Administrativo (`padm.html`)**:
    *   Acesso restrito para o administrador.
    *   Cadastro, edição e remoção de alunos.
    *   Definição de Nível, Gênero, Status de Pagamento (Ativo/Pendente) e Status de Acesso (Liberado/Bloqueado).
    *   Bloqueio automático: Se um aluno for bloqueado ou deletado aqui, ele perde o acesso no aplicativo do aluno.

## Tecnologias Utilizadas

*   **HTML5, CSS3, JavaScript (ES6 Modules)**
*   **TailwindCSS**: Para estilização rápida e responsiva.
*   **Firebase Realtime Database**: Banco de dados para persistir informações de clientes.
*   **FontAwesome & Lucide Icons**: Para iconografia do sistema.

## Como Rodar o Projeto

1.  **Hospedagem / Servidor Local**:
    Por utilizar `import` de módulos JS (`type="module"`), você não pode abrir o `Index.html` dando apenas dois cliques (o navegador bloqueará por CORS). Utilize uma extensão como o *Live Server* do VSCode ou hospede os arquivos em um servidor (como GitHub Pages, Vercel ou Hostinger).
    
2.  **Acesso Administrador**:
    *   Acesse: `seusite.com/padm.html`
    *   O usuário e senha padrões estão definidos no arquivo `acesso.js` (Padrão: `123` / `123`).
    
3.  **Acesso Aluno**:
    *   Acesse: `seusite.com/Index.html`
    *   Utilize o e-mail e a senha criados previamente no painel de administrador.

## Dependências e Configuração do Firebase
O arquivo `bd.js` já possui a SDK do Firebase via CDN e as configurações da API. Caso queira usar seu próprio banco, altere o objeto `firebaseConfig` no `bd.js` com os dados do seu próprio projeto Firebase.

## Melhorias Recentes Implementadas
*   **Restrição Absoluta de Acesso**: Clientes não cadastrados no Painel Admin são rejeitados na tela de login.
*   **Segmentação de Treinos**: O filtro manual do aplicativo foi ocultado. Agora, o sistema exibe os treinos exclusivamente com base na ficha técnica do aluno (Gênero e Nível) cadastrada no Admin.