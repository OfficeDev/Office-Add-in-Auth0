---
topic: sample
products:
  - Word
  - Office 365
languages:
  - JavaScript
extensions:
  contentType: samples
  technologies:
    - Add-ins
  createdDate: '9/1/2016 3:14:40 PM'
---
# <a name="archived-office-add-in-that-uses-the-auth0-service-to-simplify-social-login"></a>[ARQUIVADO] Suplemento do Office que usa o serviço Auth0 para facilitar o login social

> **Observação:** Este repositório foi arquivado e não é mais ativamente mantido. Podem existir vulnerabilidades de segurança no projeto ou em suas dependências. Caso pretenda reutilizar ou executar qualquer código deste repositório, certifique-se de executar primeiro verificações de segurança apropriadas no código ou nas dependências. Não use esse projeto como ponto de partida de produção de suplementos do Office. Sempre inicie seu código de produção usando a carga de trabalho de desenvolvimento do Office/SharePoint no Visual Studio ou no [gerador do Yeoman para suplementos do Office](https://github.com/OfficeDev/generator-office) e siga as melhores práticas de segurança ao desenvolver o suplemento.

O serviço Auth0 simplifica o processo de uso do login social fornecido por serviços online, como as plataformas Facebook, Google e Microsoft. O exemplo a seguir mostra como usar Auth0 em um suplemento do Office. 

## <a name="table-of-contents"></a>Sumário
* [Histórico de Alterações](#change-history)
* [Pré-requisitos](#prerequisites)
* [Configurar o projeto](#configure-the-project)
* [Criar uma conta Auth0 e configurá-la para usar uma conta das plataformas Google, Facebook e Microsoft](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [Adicionar os valores da conta Auth0 ao exemplo de código](#add-your-auth0-account-values-to-the-sample-code)
* [Implantar o suplemento](#deploy-the-add-in)
* [Executar o projeto](#run-the-project)
* [Iniciar o suplemento](#start-the-add-in)
* [Testar o suplemento](#test-the-add-in)
* [Perguntas e comentários](#questions-and-comments)
* [Recursos adicionais](#additional-resources)

## <a name="change-history"></a>Histórico de alterações

6 de setembro de 2016:

* Versão inicial.

## <a name="prerequisites"></a>Pré-requisitos

* Uma conta com [Auth0](https://auth0.com)
* Word 2016 para Windows, build 16.0.6727.1000 ou superior.
* [Node e npm](https://nodejs.org/en/) Configuramos o projeto para usar npm como gerenciador de pacotes e executor de tarefas. Também o configuramos para usar o Lite Server como o servidor Web que hospedará o suplemento durante o desenvolvimento, de modo que você possa começar a usar o suplemento rapidamente. Você também pode usar outro executor de tarefas ou servidor Web.
* [Git Bash](https://git-scm.com/downloads) (ou outro cliente Git.)

## <a name="configure-the-project"></a>Configurar o projeto

Na pasta em que deseja armazenar o projeto, execute os seguintes comandos no shell do Git Bash:

1. ```git clone {URL of this repo}``` para clonar este repositório no computador local.
2. ```npm install``` para instalar todas as dependências discriminadas no arquivo package.json.
3. ```bash gen-cert.sh``` para criar os certificados necessários para executar este exemplo. 

Defina o certificado como uma autoridade raiz confiável. Em um computador com Windows, as etapas são as seguintes:

1. Na pasta do repositório do computador local, clique duas vezes em ca.crt e escolha **Instalar Certificado**. 
2. Escolha **Computador Local** e **Avançar** para continuar. 
3. Escolha **Colocar todos os certificados no repositório a seguir** e **Procurar**.
4. Escolha **Autoridades de Certificação Confiáveis** e **OK**. 
5. Escolha **Avançar** e **Concluir**. 

## <a name="create-an-auth0-account-and-configure-it-to-use-google-facebook-and-microsoft-account"></a>Crie uma conta Auth0 e configure-a para usar uma conta das plataformas Google, Facebook e Microsoft

O serviço Auth0 pode alterar a interface do usuário e a terminologia dele após a publicação do arquivo Leiame. Tentamos fazer o mínimo de suposições possível sobre a interface do usuário. No entanto, se precisar, use essas etapas para saber o essencial sobre o que precisa ser feito e use a ajuda da Auth0 para obter instruções.

1. Crie uma conta ou use uma conta existente no painel Auth0. Você será solicitado a escolher o nome da conta que servirá como subdomínio no site auth0.com, com o qual o suplemento vai interagir; por exemplo, `officeaddin.auth0.com`. Anote esse nome.
2. Quando for solicitado a escolher provedores, escolha Conta do Facebook, do Google ou da Microsoft. Este exemplo não usa nenhum outro provedor, portanto, desabilite os outros que estejam habilitados por padrão, inclusive a opção **Banco de dados** (ou **Autenticação de nome de usuário/senha**). Você pode alterar essa configuração posteriormente, caso pretenda estender o exemplo para outros provedores.
3. A Auth0 cria um **Aplicativo padrão** (também conhecido como **Cliente**) na conta. Acesse as **Configurações** desse aplicativo.
4. Anote a ID do cliente para usá-la em uma etapa posterior.
5. Para o **Tipo de cliente**, escolha **Aplicativo de Uma Página**. 
6. Em **Retornos de Chamada Permitidos**, insira `https://localhost:3000/popupRedirect.html`.
7. Deixe todas as outras configurações com os respectivos valores padrão e clique em **Salvar Alterações**.

## <a name="add-your-auth0-account-values-to-the-sample-code"></a>Adicione os valores da conta Auth0 ao exemplo de código

1. Abra o arquivo index.js e localize as seguintes linhas na parte superior:
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Substitua os espaços reservados pelas cadeias de caracteres apropriadas que você gravou no procedimento anterior.

## <a name="deploy-the-add-in"></a>Implantar o suplemento

Agora, você precisa informar ao Microsoft Word onde encontrar o suplemento.

1. Crie um compartilhamento de rede ou [compartilhe uma pasta na rede](https://technet.microsoft.com/pt-br/library/cc770880.aspx).
2. Coloque uma cópia do arquivo de manifesto Office-Add-in-Auth0.xml na raiz do projeto, dentro da pasta compartilhada.
3. Inicie o Word e abra um documento.
4. Escolha a guia **Arquivo** e escolha **Opções**.
5. Escolha **Central de Confiabilidade**, e escolha o botão **Configurações da Central de Confiabilidade**.
6. Escolha **Catálogos de Suplementos Confiáveis**.
7. No campo **URL do Catálogo**, insira o caminho de rede para o compartilhamento de pasta que contém o arquivo Office-Add-in-Auth0.xml e escolha **Adicionar catálogo**.
8. Selecione a caixa de seleção **Mostrar no Menu** e depois escolha **OK**.
9. O sistema exibirá uma mensagem para informar que suas configurações serão aplicadas na próxima vez que você iniciar o Microsoft Office. Feche o Word.

## <a name="run-the-project"></a>Executar o projeto

1. Abra uma janela de comando de nó na pasta do projeto e execute ```npm start``` para iniciar o serviço Web. Deixe a janela de comando aberta.
2. Abra o Internet Explorer ou o Microsoft Edge e insira ```https://localhost:3000``` na caixa de endereço. Se não receber avisos sobre o certificado, feche o navegador e avance para a seção abaixo chamada **Iniciar o suplemento**. Se receber um aviso informando que o certificado não é confiável, vá para as etapas seguintes:
3. Independentemente do aviso, o navegador fornecerá um link para você abrir a página. Abra-a.
4. Após abri-la, o sistema exibirá um Erro de Certificado vermelho na barra de endereços. Clique duas vezes no erro.
5. Escolha **Exibir Certificado**.
5. Escolha **Instalar Certificado**.
4. Escolha **Computador Local** e **Avançar** para continuar. 
3. Escolha **Colocar todos os certificados no repositório a seguir** e **Procurar**.
4. Escolha **Autoridades de Certificação Confiáveis** e **OK**. 
5. Escolha **Avançar** e **Concluir**.
6. Feche o navegador.

## <a name="start-the-add-in"></a>Iniciar o suplemento

1. Reinicie o Word e abra um documento.
2. Na guia **Inserir** no Word 2016, escolha **Meus Suplementos**. (Pode ser que o botão esteja na guia **Desenvolvedor**e não em **Inserir**. Para tornar a guia **Desenvolvedor** visível, confira [estas instruções](https://support.office.com/pt-br/article/Show-the-Developer-tab-E1192344-5E56-4D45-931B-E5FD9BEA2D45)).
3. Selecione a guia **PASTA COMPARTILHADA**.
4. Escolha **Autenticar com Auth0** e, em seguida, **OK**.
5. Se os comandos de suplemento forem compatíveis com sua versão do Word, a interface do usuário informará que o suplemento foi carregado.
6. Na Faixa de Opções da Página Inicial, há um novo grupo chamado **Auth0** com um botão **Exibir** e um ícone. Clique no botão para abrir o suplemento.

 > Observação: O suplemento será carregado no painel de tarefas se os comandos de suplemento não forem compatíveis com sua versão do Word.

## <a name="test-the-add-in"></a>Testar o suplemento

1. O suplemento é aberto na página inicial. Clique no botão **Entrar**.
2. O sistema vai abrir uma janela pop-up, e você será solicitado a escolher um provedor de identidade. Clique em um dos botões. 
3. Se você ainda não entrou com esse provedor, o sistema vai abrir a respectiva página de entrada. Após entrar pela primeira vez, você será solicitado a conceder permissão à Auth0 para o seu perfil. Depois de entrar, a caixa de diálogo é fechada e o painel de tarefas mostra a página de trabalho principal do suplemento. Se já estiver conectado ao provedor, a caixa de diálogo será fechada imediatamente quando você clicar no botão do provedor.
4. Clique no botão **Inserir nome de usuário**. O nome de usuário será inserido no documento do Word.

## <a name="questions-and-comments"></a>Perguntas e comentários

Gostaríamos de saber sua opinião sobre este exemplo. Você pode nos enviar comentários na seção *Problemas* deste repositório.

As perguntas sobre o desenvolvimento do Microsoft Office 365 em geral devem ser postadas no [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API). Se sua pergunta estiver relacionada às APIs JavaScript para Office, não deixe de marcá-la com as tags [office-js] e [API].

## <a name="additional-resources"></a>Recursos adicionais

* 
  [Documentação dos suplementos do Office](https://msdn.microsoft.com/pt-br/library/office/jj220060.aspx)
* [Centro de Desenvolvimento do Office](http://dev.office.com/)
* Confira outros exemplos de Suplemento do Office em [OfficeDev no Github](https://github.com/officedev)

## <a name="copyright"></a>Direitos autorais
Copyright (C) 2016 Microsoft Corporation. Todos os direitos reservados.



Este projeto adotou o [Código de Conduta de Software Livre da Microsoft](https://opensource.microsoft.com/codeofconduct/). Saiba mais nas [Perguntas frequentes sobre o Código de Conduta](https://opensource.microsoft.com/codeofconduct/faq/) ou contate [opencode@microsoft.com](mailto:opencode@microsoft.com) se tiver outras dúvidas ou comentários.
