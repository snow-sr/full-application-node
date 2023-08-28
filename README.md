# full-application-node
This is a full app that's going to be deployed at dokku, using fabroku.

Requirements:
 * A Postgres database connection
    * The connection can be made with Prisma as our ORM
 * Routes for a complete CRUD
 * An SSL certificate for our https protocol

## Steps we're going to follow:

1. First, create an application at dokku
```bash 
    dokku apps:create <app-name>
```

2. Add your user at the application
```bash
    dokku acl:add full-nest-js ghactions
    # Use ghactions user when using our default github actions deployment system
```

3. Add the database to your application

```bash
    dokku postgres:create dbnestjs01
    dokku postgres:link dbnestjs01 full-nest-js
```

4. Now, configure the github actions for deploying our app
* First, create a .github/workflows/deploy.yml archive and put the content in it:
```yml
---
name: 'deploy'

# yamllint disable-line rule:truthy
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Cloning repo
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Push to dokku
        uses: dokku/github-action@master
        with:
          git_remote_url: 'ssh://dokku@app1.fabricadesoftware.ifc.edu.br:1022/appname'
          ssh_private_key: ${{ secrets.GHACTIONS_SSH }}
```
* Don't forget to add the GHACTIONS_SSH secret at your projects secrets.

5. Generate your Dockerfile, an example can be:
```Dockerfile
FROM node:20

workdir /src/

copy package*.json ./

run npm install

copy . .

CMD ["npm", "start"]
```
* Don't forget to add the DOKKU_PROXY_PORT_MAP env, and set it to your app port.

6. Generate your Procfile, an example can be:
```Procfile
    web: node --watch main.js
```

7. At dokku, set your env config
```bash
    dokku config:set full-nest-js SECRET=secret
```

8. Deploy your app

9. Make the ssl certificate using letsencrypt plugin


