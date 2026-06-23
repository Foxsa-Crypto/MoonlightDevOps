# MoonlightDevOps
Repositório feito para versionamento em produção das duas partes do nosso projeto principal

## Visão geral do projeto

Este projeto organiza a aplicação **Moonlight** em uma arquitetura baseada em containers com **Docker Compose**, separando responsabilidades entre frontend, backend, banco de dados e proxy reverso. O objetivo é disponibilizar um ambiente de desenvolvimento padronizado, com persistência de dados, HTTPS local, isolamento de serviços por rede e automação básica de qualidade por meio de testes end-to-end e validações no fluxo de versionamento.

A aplicação é composta pelos seguintes serviços:

- **database**: serviço MySQL responsável pela persistência de dados
- **backend**: API da aplicação
- **frontend**: interface React
- **nginx**: proxy reverso responsável por expor a aplicação em HTTP/HTTPS, redirecionar tráfego e aplicar cabeçalhos de segurança

---

## Estrutura do projeto

```text
MoonlightDevOps/
├─ .github/
│  └─ workflows/
│     └─ playwright.yml
├─ .husky/
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ pre-push
├─ database_arquives/
│  └─ moonlight.sql
├─ Moonlight_Backend/
├─ Moonlight_Frontend_React/
├─ nginx/
│  ├─ certs/
│  │  ├─ moonlight.local.pem
│  │  └─ moonlight.local-key.pem
│  └─ nginx.conf
├─ tests/
│  └─ e2e/
│     ├─ admin/
│     ├─ auth/
│     └─ helpers/
├─ .env
├─ .example.env
├─ docker-compose.yml
├─ docker-compose.override.yml
├─ package.json
└─ DevopsDocumentation.md

Arquitetura da aplicação

O projeto foi estruturado em quatro containers principais, com responsabilidades bem definidas:

database: armazena os dados da aplicação em um MySQL 8
backend: implementa a lógica de negócio e realiza o acesso ao banco
frontend: disponibiliza a interface da aplicação para o usuário
nginx: atua como proxy reverso, centralizando o acesso externo ao sistema
Fluxo de comunicação
O usuário acessa https://moonlight.local
O Nginx recebe a requisição
Se a rota for /, a requisição é encaminhada ao frontend
Se a rota começar com /api/, a requisição é encaminhada ao backend
O backend acessa o database pela rede interna do banco

Essa separação permite reproduzir localmente uma estrutura mais próxima de produção, em que o acesso externo passa por um único ponto de entrada e os serviços internos permanecem isolados.

Orquestração com Docker Compose

O arquivo docker-compose.yml centraliza a definição da infraestrutura do projeto, especificando:

serviços da aplicação
imagens e builds
variáveis de ambiente
redes
volumes
dependências entre containers

Abaixo está a visão lógica dos serviços definidos no Compose.

Serviço database

O serviço database utiliza a imagem oficial do MySQL 8 e é responsável pela persistência de dados da aplicação.

Responsabilidades
armazenar os dados do sistema
disponibilizar o banco para o backend
manter os dados persistidos mesmo após reinicialização dos containers
executar a carga inicial automática do banco na primeira inicialização
Configuração principal
imagem: mysql:8
política de reinício: always
volume nomeado para persistência
rede interna dedicada para comunicação com o backend
Variáveis de ambiente utilizadas
MYSQL_ROOT_PASSWORD
MYSQL_DATABASE
MYSQL_USER
MYSQL_PASSWORD

Essas variáveis são preenchidas a partir do arquivo .env, evitando hardcode de credenciais no Compose.

Inicialização automática do MySQL

Embora o backend não utilize ORM, a carga inicial do banco pode ser automatizada com suporte nativo da própria imagem oficial do MySQL.

A imagem mysql:8 executa automaticamente scripts .sql, .sql.gz ou .sh localizados no diretório:

/docker-entrypoint-initdb.d

Esse comportamento é usado no projeto para inicializar o banco de dados automaticamente a partir do arquivo moonlight.sql.

Funcionamento

Ao subir o container do banco pela primeira vez, o MySQL:

cria o banco e o usuário com base nas variáveis de ambiente
verifica se o diretório de dados está vazio
executa os scripts presentes em /docker-entrypoint-initdb.d

No projeto, isso permite que o arquivo database_arquives/moonlight.sql seja executado automaticamente na criação inicial do banco, eliminando a necessidade de importação manual no ambiente principal ou no pipeline de CI.

Observação importante

A execução dos scripts de inicialização ocorre somente na primeira criação do banco, ou seja, quando o volume de dados ainda não existe ou está vazio.

Se o volume db-data já tiver sido criado anteriormente, o MySQL não executará novamente o script de inicialização. Para forçar uma nova carga inicial, é necessário remover o volume do banco:

docker compose down -v
docker compose up -d --build
Benefício dessa abordagem
elimina a importação manual do banco após subir o ambiente
simplifica o fluxo local e o pipeline de testes
mantém o banco inicializado de forma padronizada entre diferentes máquinas
não depende de ORM para criação ou seed de dados
Serviço backend

O serviço backend é responsável por buildar e executar a API da aplicação a partir da pasta Moonlight_Backend.

Responsabilidades
expor a API da aplicação
aplicar regras de negócio
conectar-se ao banco MySQL
intermediar a comunicação entre frontend e banco
Configuração principal
build local com Dockerfile próprio
container nomeado como backend_service
política de reinício unless-stopped
acesso ao banco pela hostname database
participação em duas redes: uma de aplicação e outra de banco
Variáveis de ambiente utilizadas
DB_HOST
DB_USER
DB_DATABASE_NAME
DB_PASSWORD
NGROK_URL
MERCADOPAGO_ACCESS_TOKEN
JWT_SECRET
Exposição da aplicação

O backend utiliza:

expose:
  - "3000"

Isso significa que a porta 3000 fica acessível para outros containers da rede Docker, mas não é publicada diretamente para o host. Dessa forma, o acesso externo ao backend ocorre apenas via Nginx.

Serviço frontend

O serviço frontend é responsável por buildar e servir a aplicação React da pasta Moonlight_Frontend_React.

Responsabilidades
renderizar a interface da aplicação
consumir a API do backend
disponibilizar a aplicação web ao usuário final
Configuração principal
build local com Dockerfile próprio
container nomeado como frontend_service
política de reinício unless-stopped
participação na rede proxy_network
Build arguments utilizados
VITE_API_URL
VITE_USE_MOCK
VITE_MP_PUBLIC_KEY

Esses valores são injetados no momento do build do frontend e controlam a comunicação com a API e integrações do cliente.

Serviço nginx

O serviço nginx atua como proxy reverso da aplicação e é o único ponto de entrada exposto diretamente ao host.

Responsabilidades
expor a aplicação nas portas 80 e 443
redirecionar HTTP para HTTPS
encaminhar requisições do frontend e backend
aplicar cabeçalhos básicos de segurança
utilizar certificado local para HTTPS em ambiente de desenvolvimento
Configuração principal
imagem: nginx:1.31.1-alpine3.23
container nomeado como nginx_service
portas expostas:
80:80
443:443
Volumes montados
./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
./nginx/certs:/etc/nginx/certs:ro

Esses mounts permitem que a configuração do proxy e os certificados sejam mantidos no repositório e lidos pelo container do Nginx em modo somente leitura.

Redes Docker

A aplicação utiliza duas redes bridge distintas para separar responsabilidades e reduzir exposição desnecessária entre os serviços.

proxy_network

Rede responsável pela comunicação entre:

nginx
frontend
backend

Essa é a rede da camada de aplicação, onde o proxy conversa com os serviços que precisam atender requisições externas.

db_network

Rede responsável pela comunicação entre:

backend
database

Essa rede existe para restringir o acesso ao banco apenas ao backend.

Benefício da separação de redes

A divisão entre proxy_network e db_network ajuda a cumprir o princípio de isolamento entre serviços:

o banco não precisa ser acessível por todos os containers
o frontend não precisa enxergar o banco
o Nginx não precisa acessar o banco
o backend funciona como a única ponte entre aplicação e persistência

Essa abordagem reduz acoplamento, melhora a organização da infraestrutura e aproxima o ambiente local de uma topologia mais segura.

Persistência de dados

A persistência do banco é feita com o volume nomeado:

volumes:
  db-data:

Esse volume é montado no serviço database em:

- db-data:/var/lib/mysql
Objetivo

Garantir que os dados do MySQL permaneçam armazenados mesmo que o container seja reiniciado ou recriado.

Benefício

Sem o volume, os dados seriam perdidos sempre que o container do banco fosse destruído. Com o volume, a persistência fica desacoplada do ciclo de vida do container.

Variáveis de ambiente

As configurações sensíveis e parâmetros de execução do projeto são externalizados por meio de um arquivo .env.

Exemplos de variáveis utilizadas
DB_ROOT_PASSWORD=
DB_DATABASE_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
JWT_SECRET=
MERCADOPAGO_ACCESS_TOKEN=
NGROK_URL=
VITE_API_URL=
VITE_USE_MOCK=
VITE_MP_PUBLIC_KEY=
Motivos para usar .env
evitar hardcode de credenciais no repositório
facilitar a configuração entre diferentes ambientes
centralizar parâmetros de execução da aplicação
permitir que o mesmo Compose seja reutilizado com valores distintos

O projeto também mantém um arquivo .example.env, que serve como modelo para criação do .env local.

Nginx como proxy reverso

O Nginx foi configurado para centralizar o acesso à aplicação, forçar o uso de HTTPS e encaminhar as requisições ao serviço correto.

Redirecionamento HTTP → HTTPS

O primeiro bloco do nginx.conf escuta na porta 80 e redireciona todas as requisições para HTTPS:

server {
    listen 80;
    server_name moonlight.local;
    return 301 https://$host$request_uri;
}
Objetivo

Garantir que o acesso à aplicação seja feito via HTTPS, mesmo quando o usuário tentar acessá-la inicialmente por HTTP.

HTTPS com host customizado

O projeto utiliza o host local:

moonlight.local

com certificados locais armazenados em:

nginx/certs/moonlight.local.pem
nginx/certs/moonlight.local-key.pem

No Nginx, o bloco HTTPS foi configurado com:

listen 443 ssl;
server_name moonlight.local;

ssl_certificate     /etc/nginx/certs/moonlight.local.pem;
ssl_certificate_key /etc/nginx/certs/moonlight.local-key.pem;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
Objetivo

Simular um ambiente mais próximo de produção em desenvolvimento local, utilizando HTTPS com host customizado e certificado local.

Roteamento do frontend e backend
Frontend

As requisições para / são encaminhadas ao frontend:

location / {
    proxy_pass http://frontend:80;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
Backend

As requisições iniciadas por /api/ são encaminhadas ao backend:

location /api/ {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
}
Resultado prático
o frontend é servido sob o domínio principal
o backend fica centralizado sob o prefixo /api
o usuário não acessa backend e frontend por portas separadas
toda a entrada externa passa pelo proxy
Cabeçalhos de segurança no Nginx

Além do roteamento, o Nginx aplica alguns cabeçalhos HTTP de segurança para reforçar a proteção básica da aplicação.

X-Frame-Options
add_header X-Frame-Options "SAMEORIGIN" always;

Ajuda a mitigar ataques de clickjacking, impedindo o carregamento da aplicação em iframes de origens indevidas.

X-Content-Type-Options
add_header X-Content-Type-Options "nosniff" always;

Evita que o navegador tente inferir tipos de conteúdo diferentes dos declarados.

Referrer-Policy
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

Controla o envio do header Referer em navegações entre origens.

Content-Security-Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://moonlight.local https://api.mercadopago.com;" always;

Restringe as origens autorizadas para scripts, estilos, fontes, imagens e conexões, reduzindo a superfície de ataques como execução indevida de scripts externos.

Strict-Transport-Security
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

Instrui o navegador a priorizar o uso de HTTPS em acessos futuros.

X-XSS-Protection
add_header X-XSS-Protection "1; mode=block";

Adiciona proteção adicional em navegadores antigos contra certos tipos de injeção de script.

Isolamento e exposição de serviços

Um dos objetivos da configuração é evitar que todos os serviços fiquem expostos diretamente ao host.

Serviço exposto externamente

O único serviço publicado com ports no Compose principal é o nginx:

80:80
443:443
Serviços não expostos diretamente

Os serviços abaixo não possuem publicação direta de porta no host no ambiente padrão:

database
backend
frontend
Benefícios dessa abordagem
reduz a superfície de ataque
evita acesso direto ao banco
impede que o backend seja acessado fora do proxy
centraliza o tráfego no Nginx
melhora a organização da arquitetura da aplicação
Acesso externo ao banco via docker-compose.override.yml

Por padrão, o banco de dados não é exposto para a máquina host. Isso foi feito para manter o serviço isolado e acessível apenas pelo backend dentro da rede Docker.

Entretanto, durante o desenvolvimento, pode ser útil acessar o banco por ferramentas como DBeaver, MySQL Workbench ou outro cliente SQL. Para isso, o projeto utiliza um arquivo docker-compose.override.yml como forma opcional de expor a porta do MySQL sem alterar o Compose principal.

Exemplo de override
services:
  database:
    ports:
      - "3306:3306"

Também é possível usar outra porta no host, por exemplo:

services:
  database:
    ports:
      - "3307:3306"

Nesse caso:

3307 é a porta da máquina host
3306 é a porta interna do MySQL no container
Motivo para usar override

Essa abordagem permite manter o docker-compose.yml principal mais seguro e mais próximo de uma configuração de produção, enquanto a exposição do banco fica restrita a um cenário de necessidade local e opcional.

Qualidade no fluxo de versionamento com Husky

O projeto utiliza Husky para automatizar validações durante o fluxo de desenvolvimento, antes de aceitar commits e pushes.

Hook commit-msg

O hook commit-msg valida se a mensagem de commit segue um padrão definido por expressão regular:

pattern="^(feat|fix|chore|docs|refactor|test|hotfix)(\(.+\))?: .{1,100}$"
Formato exigido
tipo(escopo opcional): descrição
Tipos permitidos
feat
fix
chore
docs
refactor
test
hotfix
Exemplo válido
feat: adiciona teste de login
Objetivo

Padronizar o histórico de commits, melhorar a rastreabilidade das mudanças e reforçar a disciplina no versionamento.

Hook pre-push

O hook pre-push executa testes end-to-end antes de permitir o envio do código ao repositório remoto.

Comportamento implementado
verifica se o serviço nginx do Docker Compose está em execução
se os containers não estiverem rodando, o push é bloqueado
executa npm run test:e2e
se os testes falharem, o push é bloqueado

Trecho relevante:

echo "🧪 Rodando testes e2e..."
if [ -z "$(docker compose ps --status=running -q nginx 2>/dev/null)" ]; then
    echo "⚠️  Docker Compose não está rodando."
    echo "   Suba os containers com: docker compose up -d --build"
    exit 1
fi

npm run test:e2e
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "" >&2
  echo "❌ Testes e2e falharam! Push bloqueado." >&2
  exit 1
fi

echo "✅ Testes passaram!"
Objetivo

Impedir que mudanças com falha em testes end-to-end sejam enviadas para o repositório, aumentando a confiabilidade do código versionado.

Testes end-to-end

O projeto possui testes end-to-end organizados em tests/e2e, cobrindo fluxos críticos da aplicação.

Estrutura observada
tests/e2e/auth/login.spec.ts
tests/e2e/auth/register.spec.ts
tests/e2e/admin/categories.spec.ts
tests/e2e/admin/games.spec.ts
Cobertura geral

Os testes e2e validam cenários reais de uso da aplicação, como:

login com sucesso e falha
cadastro de usuário com sucesso e falha
operações administrativas de CRUD
integração entre frontend, backend e banco de dados

Essa abordagem valida a aplicação em funcionamento completo, em vez de testar apenas funções isoladas.

Pipeline CI com GitHub Actions

O projeto utiliza GitHub Actions para automatizar a execução dos testes end-to-end em pushes, pull requests e execuções manuais.

Gatilhos do workflow

O pipeline é executado nos seguintes eventos:

push para main e develop
pull_request para main e develop
workflow_dispatch
Etapas principais do pipeline
checkout do repositório
configuração do Node.js
instalação das dependências do projeto
instalação do navegador do Playwright
criação do arquivo .env a partir dos secrets do GitHub
geração dos certificados locais com mkcert
configuração do host moonlight.local no /etc/hosts
subida da infraestrutura com Docker Compose
espera da aplicação ficar disponível em https://moonlight.local
execução dos testes Playwright
upload do relatório de testes como artifact
Relação entre CI e banco de dados

Como o banco é inicializado automaticamente pelo próprio container MySQL através do script SQL montado em /docker-entrypoint-initdb.d, o workflow do GitHub Actions não precisa executar a importação manual do moonlight.sql. Isso reduz lógica procedural no pipeline e mantém o processo de inicialização mais consistente com o ambiente local.

Benefícios do pipeline
validação automática de fluxos críticos da aplicação
verificação do sistema em ambiente semelhante ao local
aumento de confiança antes de mergear ou publicar alterações
geração de artefatos para análise dos resultados dos testes
Fluxo para subir o projeto localmente
1. Criar o arquivo .env

O primeiro passo é criar o arquivo .env com as variáveis necessárias para o funcionamento do banco, backend e frontend.

2. Configurar o host local

Adicionar o host moonlight.local no arquivo de hosts do sistema operacional apontando para 127.0.0.1.

Exemplo:

127.0.0.1 moonlight.local
3. Garantir os certificados locais

Os certificados usados pelo Nginx devem existir em:

nginx/certs/moonlight.local.pem
nginx/certs/moonlight.local-key.pem

Caso ainda não existam, eles podem ser gerados com mkcert.

4. Subir os containers
docker compose up -d --build

Esse comando:

builda frontend e backend
sobe database, backend, frontend e nginx
cria redes e volumes necessários
executa a carga inicial do banco, caso o volume ainda esteja vazio
5. Acessar a aplicação

Após os containers estarem em execução, a aplicação pode ser acessada em:

https://moonlight.local
Comandos úteis
Subir o ambiente
docker compose up -d --build
Derrubar o ambiente
docker compose down
Derrubar o ambiente removendo volumes
docker compose down -v
Ver logs de todos os serviços
docker compose logs -f
Ver logs de um serviço específico
docker compose logs -f nginx
docker compose logs -f backend
docker compose logs -f database
Rodar testes e2e localmente
npm run test:e2e
Decisões de arquitetura adotadas
1. Banco não exposto por padrão

O serviço de banco de dados não publica porta para o host no docker-compose.yml principal. Isso reduz exposição desnecessária e reforça o isolamento entre os serviços.

2. Nginx como único ponto de entrada

Todo o acesso externo à aplicação passa pelo Nginx, que centraliza HTTPS, redirecionamento, proxy reverso e cabeçalhos de segurança.

3. Separação de redes

A divisão entre proxy_network e db_network evita que todos os serviços compartilhem a mesma rede sem necessidade, restringindo o acesso ao banco.

4. Uso de .env

As variáveis sensíveis e parâmetros de ambiente foram externalizados para evitar hardcode e facilitar configuração entre ambientes.

5. Inicialização automática do MySQL

O banco é inicializado automaticamente por meio do mecanismo nativo da imagem oficial do MySQL, sem depender de ORM ou import manual no fluxo principal.

6. Uso de docker-compose.override.yml para acesso local ao banco

A exposição do banco para ferramentas externas fica como configuração opcional de desenvolvimento, sem comprometer a segurança da configuração principal.

7. Validação automática com Husky

O fluxo de desenvolvimento local exige commits padronizados e execução dos testes end-to-end antes do push.

8. Validação automatizada em CI

O GitHub Actions executa os testes da aplicação em ambiente automatizado, garantindo uma camada adicional de verificação além dos hooks locais.
