# Find Directors
A web app to find the directors of a UK company.

[![Deploy frontend to GitHub pages](https://github.com/mrbrianevans/find-directors/actions/workflows/deploy-pages.yaml/badge.svg)](https://github.com/mrbrianevans/find-directors/actions/workflows/deploy-pages.yaml)
[![build and deploy serverless functions](https://github.com/mrbrianevans/find-directors/actions/workflows/deploy-functions.yaml/badge.svg)](https://github.com/mrbrianevans/find-directors/actions/workflows/deploy-functions.yaml)

## Technology

Server side code written in NodeJS and executed in serverless functions on Digital Ocean.

Frontend code written in Svelte and compiled to static files, deployed on GitHub Pages.



My [`do-functions`](https://www.npmjs.com/package/do-functions) package from NPM is used for the serverless functions. 


## Building

To build the server
```bash
cd server
pnpm i 
pnpm build
```

To build the client
```bash
cd client
pnpm i
pnpm build
```

## Testing
The server has tests written for each function. 
Can be run after following build steps above with this command in `/server`:
```bash
pnpm test
```

## Deploy
To deploy serverless functions to Digital Ocean Functions Platform, (after building) run this command in `/server`:
```bash
doctl serverless deploy build
```

## Design
Themes are modified from [`monkeytype`](https://github.com/monkeytypegame/monkeytype).

## Functions deployment
I have deployed the logic as serverless functions on Digital Ocean. If you haven't already signed up for
Digital Ocean, you can do so with my referral link below to get a free $100 starting credit, and they'll give me
$25 hosting credit in return.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=4d6af2b60752&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
