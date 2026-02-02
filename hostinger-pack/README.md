# Instruções de Deploy na Hostinger

## Opção 1: Upload do ZIP (Recomendado)
1. Faça upload do arquivo `deploy-hostinger.zip` no painel Node.js da Hostinger
2. Configure variável de ambiente: `DATABASE_URL` para seu banco PostgreSQL
3. O comando de start é: `node server.js`

## Opção 2: GitHub Repository
1. Faça push do código para o GitHub
2. Conecte o repositório na Hostinger
3. Configure build command: `npm run build`
4. Configure start command: `npm run start`

## Banco de Dados
Este projeto usa SQLite (`prisma/dev.db`) por padrão.
Para produção, recomenda-se migrar para PostgreSQL.

## Variáveis de Ambiente
```
DATABASE_URL="file:./prisma/dev.db"
```
