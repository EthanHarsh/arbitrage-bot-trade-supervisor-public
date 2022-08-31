# arbitrage-bot-trade-supervisor-public
_Ensures Token Purchase Meets Purchase Standards Microservice_

![Typescript.js Badge](https://img.shields.io/badge/JavaScript-Typescript-green) ![Ethers Badge](https://img.shields.io/badge/Web3-Ethers.js-red)

## Description

This is a token supervising microservice for the DeFi arbitrage bot. This service uses Typescript, Express.js, and Ethers.js, all of which are Javascript frameworks. Application checks incoming requests to see if they meet apurchase requirements.

## Quick Start

### Using Docker
```
sudo docker build . -t supervisor-service
```

### Using NPM - Production Start
#### Install Dependencies
```
npm run install
```

#### Build
```
npm run build
```

#### Start Command
```
npm run start
```
## Development
### Dev Container
Activate Development container using your prefered IDE.
### Using NPM - Development Start
#### Start for Development - _Nodemon_
```
npm run typeWatch
npm run devStart
```