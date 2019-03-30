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
# <a name="archived-office-add-in-that-uses-the-auth0-service-to-simplify-social-login"></a>[ARCHIVADO] Complemento de Office que usa el servicio de Auth0 para simplificar el inicio de sesión social

> **Nota**: Este repositorio está archivado y ya no se mantiene de manera activa. Las vulnerabilidades de seguridad pueden existir en el proyecto o en sus dependencias. Si tiene previsto volver a usar o a ejecutar algún código de este repositorio, asegúrese primero de realizar las comprobaciones de seguridad adecuadas en el código o las dependencias. No use este proyecto como punto de partida de un complemento de producción de Office. Inicie siempre el código de producción con la carga de trabajo de desarrollo de Office y SharePoint en Visual Studio, o el [generador de Yeoman para complementos de Office](https://github.com/OfficeDev/generator-office), y siga los procedimientos recomendados de seguridad al elaborar el complemento.

El servicio Auth0 simplifica el proceso de usar el inicio de sesión social que se proporciona con servicios en línea, como Facebook, Google y Microsoft. En este ejemplo se muestra cómo usar Auth0 en un complemento de Office. 

## <a name="table-of-contents"></a>Tabla de contenido
* [Historial de cambios](#change-history)
* [Requisitos previos](#prerequisites)
* [Configurar el proyecto](#configure-the-project)
* [Crear una cuenta de Auth0 y configurarla para usar Facebook, Google y una cuenta de Microsoft](#create-an-auth0-account-and-configure-it-to-use-google,-facebook,-and-microsoft-account)
* [Agregar los valores de la cuenta de Auth0 al código de ejemplo](#add-your-auth0-account-values-to-the-sample-code)
* [Implementar el complemento](#deploy-the-add-in)
* [Ejecutar el proyecto](#run-the-project)
* [Iniciar el complemento](#start-the-add-in)
* [Probar el complemento](#test-the-add-in)
* [Preguntas y comentarios](#questions-and-comments)
* [Recursos adicionales](#additional-resources)

## <a name="change-history"></a>Historial de cambios

6 de septiembre de 2016:

* Versión inicial.

## <a name="prerequisites"></a>Requisitos previos

* Una cuenta con [Auth0](https://auth0.com)
* Word 2016 para Windows, compilación 16.0.6727.1000 o posterior.
* [Node y npm](https://nodejs.org/en/) El proyecto está configurado para usar npm como un administrador de paquetes y un ejecutor de tareas. También está configurado para usar Lite Server como el servidor web que hospedará el complemento durante el desarrollo, para que tenga el complemento en funcionamiento rápidamente. Puede usar otro ejecutor de tareas o servidor web.
* [Git Bash](https://git-scm.com/downloads) (U otro cliente de Git).

## <a name="configure-the-project"></a>Configurar el proyecto

En la carpeta donde quiera colocar el proyecto, ejecute los siguientes comandos en el shell de Git Bash:

1. ```git clone {URL of this repo}``` para clonar este repositorio en la máquina local.
2. ```npm install``` para instalar todas las dependencias detalladas en el archivo package.json.
3. ```bash gen-cert.sh``` para crear el certificado necesario para ejecutar este ejemplo. 

Establezca el certificado para que sea una entidad de certificación raíz de confianza. En una máquina Windows, siga estos pasos:

1. En la carpeta del repositorio del equipo local, haga doble clic en ca.crt y seleccione **Instalar certificado**. 
2. Seleccione **Máquina local** y **Siguiente** para continuar. 
3. Seleccione **Colocar todos los certificados en el siguiente almacén** y **Examinar**.
4. Seleccione **Entidades de certificación raíz de confianza** y **Aceptar**. 
5. Seleccione **Siguiente** y, después, **Finalizar**. 

## <a name="create-an-auth0-account-and-configure-it-to-use-google-facebook-and-microsoft-account"></a>Crear una cuenta de Auth0 y configurarla para usar Facebook, Google y una cuenta de Microsoft

Auth0 puede cambiar su interfaz de usuario y la terminología después de que se publique este archivo Léame. Hemos intentado realizar la menor cantidad posible de suposiciones sobre la interfaz de usuario, pero si lo necesita, puede usar estos pasos para tener una idea general de lo que se necesita hacer y, después, usar la ayuda de Auth0 para obtener instrucciones.

1. En su panel de Auth0, cree una cuenta (o puede usar una existente). Se le solicitará que elija un nombre de cuenta que le servirá como subdominio en auth0.com con el que interactuará su complemento; por ejemplo, `officeaddin.auth0.com`. Anote este nombre.
2. Cuando se le solicite elegir proveedores, seleccione Facebook, Google y cuenta de Microsoft. Este ejemplo no usa ningún otro, por lo que deshabilite los demás que están habilitados de manera predeterminada, incluida la opción **base de datos** (o **Autenticación de nombre de usuario y contraseña**). Puede cambiar esta configuración más tarde si quiere ampliar el ejemplo a otros proveedores.
3. Auth0 crea una **Aplicación predeterminada** (también denominada un **Cliente**) en la cuenta. Vaya a **Configuración** en esta aplicación.
4. Anote el identificador de cliente para usarlo en un paso posterior.
5. En **Tipo de cliente**, elija **Single Page Application (Aplicación de página única)**. 
6. En **Allowed Callbacks (Devoluciones de llamada permitidas)**, escriba `https://localhost:3000/popupRedirect.html`.
7. Deje todas las demás opciones con sus valores predeterminados y haga clic en **Guardar cambios**.

## <a name="add-your-auth0-account-values-to-the-sample-code"></a>Agregar los valores de la cuenta de Auth0 al código de ejemplo

1. Abra el archivo index.js y busque las siguientes líneas cerca de la parte superior:
```
Auth0AccountData.subdomain = '{Auth0 account subdomain}';
Auth0AccountData.clientID = '{Auth0 client ID}';
```
2. Reemplace los marcadores de posición con las cadenas adecuadas que ha anotado en el procedimiento anterior.

## <a name="deploy-the-add-in"></a>Implementar el complemento

Ahora debe indicarle a Microsoft Word dónde encontrar el complemento.

1. Cree un recurso compartido de red o [comparta una carpeta en la red](https://technet.microsoft.com/es-es/library/cc770880.aspx).
2. Coloque una copia del archivo de manifiesto Office-Add-in-Auth0.xml, desde la raíz del proyecto, en la carpeta compartida.
3. Inicie Word y abra un documento.
4. Seleccione la pestaña **Archivo** y haga clic en **Opciones**.
5. Haga clic en **Centro de confianza** y seleccione el botón **Configuración del Centro de confianza**.
6. Elija **Catálogos de complementos de confianza**.
7. En el campo **Dirección URL del catálogo**, escriba la ruta de red al recurso compartido de carpeta que contiene Office-Add-in-Auth0.xml y, después, elija **Agregar catálogo**.
8. Seleccione la casilla **Mostrar en menú** y, luego, elija **Aceptar**.
9. Aparecerá un mensaje para informarle que la configuración se aplicará la próxima vez que inicie Microsoft Office. Cierre Word.

## <a name="run-the-project"></a>Ejecutar el proyecto

1. Abra una ventana Comandos de node en la carpeta del proyecto y ejecute ```npm start``` para iniciar el servicio web. Deje abierta la ventana Comandos.
2. Abra Internet Explorer o Microsoft Edge y escriba ```https://localhost:3000``` en el cuadro de dirección. Si no recibe ninguna advertencia sobre el certificado, cierre el explorador y siga con la sección siguiente titulada **Iniciar el complemento**. Si recibe una advertencia que indica que el certificado no es de confianza, siga estos pasos:
3. El explorador le proporciona un vínculo para abrir la página a pesar de la advertencia. Ábralo.
4. Después de que se abra la página, aparecerá un error de certificado rojo en la barra de direcciones. Haga doble clic en el error.
5. Seleccione **Ver certificado**.
5. Seleccione **Instalar certificado**.
4. Seleccione **Máquina local** y **Siguiente** para continuar. 
3. Seleccione **Colocar todos los certificados en el siguiente almacén** y **Examinar**.
4. Seleccione **Entidades de certificación raíz de confianza** y **Aceptar**. 
5. Seleccione **Siguiente** y, después, **Finalizar**.
6. Cierre el explorador.

## <a name="start-the-add-in"></a>Iniciar el complemento

1. Reinicie Word y abra un documento de Word.
2. En la pestaña **Insertar** de Word 2016, elija **Mis complementos**. (El botón puede encontrarse en la pestaña **Programador** en lugar de en la pestaña **Insertar**. Para que la pestaña **Programador** sea visible, vea [estas instrucciones](https://support.office.com/es-es/article/Show-the-Developer-tab-E1192344-5E56-4D45-931B-E5FD9BEA2D45)).
3. Seleccione la pestaña **CARPETA COMPARTIDA**.
4. Elija **Authenticate with Auth0 (Autenticar con Auth0)** y, después, seleccione **Aceptar**.
5. Si su versión de Word admite los comandos de complemento, la interfaz de usuario le informará de que se ha cargado el complemento.
6. En la cinta de opciones de Inicio está el nuevo grupo denominado **Auth0** con un botón llamado **Mostrar** y un icono. Haga clic en ese botón para abrir el complemento.

 > Nota: El complemento se cargará en un panel de tareas si los comandos del complemento no son compatibles con su versión de Word.

## <a name="test-the-add-in"></a>Probar el complemento

1. El complemento se abre con una página de bienvenida. Haga clic en el botón **Iniciar sesión**.
2. Se abrirá un elemento emergente y se le solicitará que elija un proveedor de identidad. Haga clic en uno de los botones. 
3. Si todavía no ha iniciado sesión en ese proveedor, se abrirá la página de inicio de sesión del proveedor. (Después de que inicie sesión por primera vez, se le solicitará que conceda permiso a Auth0 a su perfil). Después de que inicie sesión, el cuadro de diálogo se cierra y el panel de tareas muestra la página de trabajo principal del complemento. Si ya ha iniciado sesión en el proveedor, el cuadro de diálogo se cerrará inmediatamente después de que haga clic en el botón del proveedor.
4. Haga clic en el botón **Insertar nombre de usuario**. El nombre de usuario se inserta en el documento de Word.

## <a name="questions-and-comments"></a>Preguntas y comentarios

Nos encantaría recibir sus comentarios sobre este ejemplo. Puede enviarnos comentarios a través de la sección *Problemas* de este repositorio.

Las preguntas generales sobre el desarrollo de Microsoft Office 365 deben publicarse en [Stack Overflow](http://stackoverflow.com/questions/tagged/office-js+API). Si su pregunta trata sobre las API de JavaScript para Office, asegúrese de que se etiqueta con [office-js] y [API].

## <a name="additional-resources"></a>Recursos adicionales

* 
  [Documentación de complementos de Office](https://msdn.microsoft.com/es-es/library/office/jj220060.aspx)
* [Centro de desarrollo de Office](http://dev.office.com/)
* Más ejemplos de complementos de Office en [OfficeDev en GitHub](https://github.com/officedev)

## <a name="copyright"></a>Copyright
Copyright (c) 2016 Microsoft Corporation. Todos los derechos reservados.



Este proyecto ha adoptado el [Código de conducta de código abierto de Microsoft](https://opensource.microsoft.com/codeofconduct/). Para obtener más información, consulte las [preguntas más frecuentes sobre el Código de conducta](https://opensource.microsoft.com/codeofconduct/faq/) o póngase en contacto con [opencode@microsoft.com](mailto:opencode@microsoft.com) si tiene otras preguntas o comentarios.
