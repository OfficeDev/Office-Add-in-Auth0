# Suplemento do Office que usa o serviço Auth0 para facilitar o login social

O serviço Auth0 simplifica o processo de uso do login social fornecido por serviços online, como as plataformas Facebook, Google e Microsoft. O exemplo a seguir mostra como usar Auth0 em um suplemento do Office. 

## Sumário
* [Histórico de alterações](#histórico-de-alterações)
* [Pré-requisitos](#pré-requisitos)
* [Configurar o projeto](#configurar-o-projeto)
* [Crie uma conta Auth0 e configure-a para usar uma conta das plataformas Google, Facebook e Microsoft](#crie-uma-conta-auth0-e-configure-a-para-usar-uma-conta-das-plataformas-google-facebook-e-microsoft)
* [Adicione os valores da conta Auth0 ao exemplo de código](#adicione-os-valores-da-conta-auth0-ao-exemplo-de-código)
* [Implantar o suplemento](#implantar-o-suplemento)
* [Executar o projeto](#executar-o-projeto)
* [Iniciar o suplemento](#iniciar-o-suplemento)
* [Testar o suplemento](#testar-o-suplemento)
* [Perguntas e comentários](#perguntas-e-comentários)
* [Recursos adicionais](#recursos-adicionais)

## Histórico de alterações

6 de setembro de 2016:

* Versão inicial.

## Pré-requisitos

* Uma conta com [Auth0](https://auth0.com)
* Word 2016 para Windows, build 16.0.6727.1000 ou superior.
* [Nó e npm](https://nodejs.org/en/) Configuramos o projeto para usar npm como gerenciador de pacotes e executor de tarefas. É possível configurá-lo também para usar o Lite Server como o servidor Web que hospedará o suplemento durante o desenvolvimento, de modo que você possa começar a usar o suplemento rapidamente. Você também pode usar outro executor de tarefas ou servidor Web.
* [Git Bash](https://git-scm.com/downloads) (ou outro cliente Git.)

## Configurar o projeto

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

## Crie uma conta Auth0 e configure-a para usar uma conta das plataformas Google, Facebook e Microsoft

O serviço Auth0 pode alterar a interface do usuário e a terminologia dele após a publicação do arquivo Leiame. Tentamos fazer o mínimo de suposições possível sobre a interface do usuário. No entanto, se precisar, use essas etapas para saber o essencial sobre o que precisa ser feito e use a ajuda da Auth0 para obter instruções.

1. Crie uma conta ou use uma conta existente no painel Auth0. Você será solicitado a escolher o nome da conta que servirá como subdomínio no site auth0.com, com o qual o suplemento vai interagir; por exemplo, `officeaddin.auth0.com`. Anote esse nome.
2. Quando for solicitado a escolher provedores, escolha Conta do Facebook, do Google ou da Microsoft. Este exemplo não usa nenhum outro provedor, portanto, desabilite os outros que estejam habilitados por padrão, inclusive a opção **Banco de dados** (ou **Autenticação de nome de usuário/senha**). Você pode alterar essa configuração posteriormente, caso pretenda estender o exemplo para outros provedores.
3. A Auth0 cria um **Aplicativo padrão** (também conhecido como **Cliente**) na conta. Acesse as **Configurações** desse aplicativo.
4. Anote a ID do cliente para usá-la em uma etapa posterior.
5. Para o **Tipo de cliente**, escolha **Aplicativo de Uma Página**. 
6. Em **Retornos de Chamada Permitidos**, insira `https://localhost:3000/popupRedirect.html`.
7. Deixe todas as outras configurações com os respectivos valores padrão e clique em **Salvar Alterações**.

## Adicione os valores da conta Auth0 ao exemplo de código

1. Abra o arquivo index.js e localize as seguintes linhas na parte superior:
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Substitua os espaços reservados pelas cadeias de caracteres apropriadas que você gravou no procedimento anterior.

## Implantar o suplemento

Agora, você precisa informar ao Microsoft Word onde encontrar o suplemento.

1. Crie um compartilhamento de rede ou [compartilhe uma pasta na rede](https://technet.microsoft.com/en-us/library/cc770880.aspx).
2. Coloque uma cópia do arquivo de manifesto Office-Add-in-Auth0.xml na raiz do projeto, dentro da pasta compartilhada.
3. Inicie o Word e abra um documento.
4. Escolha a guia **Arquivo** e escolha **Opções**.
5. Escolha **Central de Confiabilidade**, e escolha o botão **Configurações da Central de Confiabilidade**.
6. Escolha **Catálogos de Suplementos Confiáveis**.
7. No campo **URL do Catálogo**, insira o caminho de rede para o compartilhamento de pasta que contém o arquivo Office-Add-in-Auth0.xml e escolha **Adicionar catálogo**.
8. Selecione a caixa de seleção **Mostrar no Menu** e, em seguida, escolha **OK**.
9. O sistema exibirá uma mensagem para informá-lo de que suas configurações serão aplicadas na próxima vez que você iniciar o Microsoft Office. Feche o Word.

## Executar o projeto

1. Abra uma janela de comando de nó na pasta do projeto e execute ```npm start``` para iniciar o serviço Web. Deixe a janela de comando aberta.
2. Abra o Internet Explorer ou o Microsoft Edge e insira ```https://localhost:3000``` na caixa de endereço. Se não receber avisos sobre o certificado, feche o navegador e avance para a seção abaixo chamada **Iniciar o suplemento**. Se receber um aviso informando que o certificado não é confiável, avance para as etapas seguintes:
3. Independentemente do aviso, o navegador fornecerá um link para você abrir a página. Abra-a.
4. Após abri-la, o sistema exibirá um Erro de Certificado vermelho na barra de endereços. Clique duas vezes no erro.
5. Escolha **Exibir Certificado**.
5. Escolha **Instalar Certificado**.
4. Escolha **Computador Local** e **Avançar** para continuar. 
3. Escolha **Colocar todos os certificados no repositório a seguir** e **Procurar**.
4. Escolha **Autoridades de Certificação Confiáveis** e **OK**. 
5. Escolha **Avançar** e **Concluir**.
6. Feche o navegador.

## Iniciar o suplemento

1. Inicie novamente o Word e abra um documento.
2. Na guia **Inserir** no Word 2016, escolha **Meus Suplementos**.
3. Escolha a guia **Pasta compartilhada**.
4. Escolha **Autenticar com Auth0** e, em seguida, **OK**.
5. Se os comandos de suplemento forem compatíveis com sua versão do Word, a interface do usuário informará que o suplemento foi carregado.
6. Na Faixa de Opções da Página Inicial, há um novo grupo chamado **Auth0** com um botão **Mostrar** e um ícone. Clique no botão para abrir o suplemento.

 > Observação: O suplemento será carregado no painel de tarefas se os comandos de suplemento não forem compatíveis com sua versão do Word.

## Testar o suplemento

1. O suplemento é aberto na página inicial. Clique no botão **Entrar**.
2. O sistema vai abrir uma janela pop-up, e você será solicitado a escolher um provedor de identidade. Clique em um dos botões. 
3. Se você ainda não entrou com esse provedor, o sistema vai abrir a respectiva página de entrada. Após entrar pela primeira vez, você será solicitado a conceder permissão à Auth0 para o seu perfil. Depois de entrar, a caixa de diálogo é fechada e o painel de tarefas mostra a página de trabalho principal do suplemento. Se já estiver conectado ao provedor, a caixa de diálogo será fechada imediatamente quando você clicar no botão do provedor.
4. Clique no botão **Inserir nome de usuário**. O nome de usuário será inserido no documento do Word.

## Perguntas e comentários

Gostaríamos de saber sua opinião sobre este exemplo. Você pode nos enviar comentários na seção *Problemas* deste repositório.

As perguntas sobre o desenvolvimento do Microsoft Office 365 em geral devem ser postadas no [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API). Se sua pergunta estiver relacionada às APIs JavaScript para Office, não deixe de marcá-la com as tags [office-js] e [API].

## Recursos adicionais

* [Documentação dos suplementos do Office](https://msdn.microsoft.com/en-us/library/office/jj220060.aspx)
* [Centro de Desenvolvimento do Office](http://dev.office.com/)
* Confira outros exemplos de Suplemento do Office em [OfficeDev no Github](https://github.com/officedev)

## Direitos autorais
Copyright (C) 2016 Microsoft Corporation. Todos os direitos reservados.

