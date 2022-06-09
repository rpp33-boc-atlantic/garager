# G A R A G E R

<em>Garager</em> is an application to ...

## Installation (Local Development)
1. Download Github repo:
```
git clone https://github.com/rpp33-boc-atlantic/garager.git
```
2. Install packages:
```
npm install
```
### Dependencies
In addition to running a server, a PostgreSQL database will have to be deployed and accessible to the server.

The address and coordinates are sourced via API service with Google Maps. To get API key: ...
To get Firebase API:...
To get Stripe key: ...

### Running Local
* The following are the scripts that are relevent for local development and deployment
1. Set up .env file with all keys
```
touch .env
```
2. "build-dev" webpack build script
```
npm run build-dev
```
3. "start" nodemon server start
```
npm start
```
4. "test" jest testing
```
npm test
```

### PostgreSQL Database Setup:

### Deploy Production

### CI/CD recommendations:

#### Continuous Integration:
We used Github's Actions to set up Continuous Integration. The ci.yml instructions are triggered on Pull Requests before approval is allowed.

#### Continuous Deployment:
We used Github's Actions to trigger new Docker image built on any merge to Main branch.

#### To Run on AWS EC2 Instance:


### AWS RDS Database:


## Contributions
Members of the Atlantic Team:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->

| [<img src="https://avatars.githubusercontent.com/u/8378155?v=4" width="75px;"/><br /><sub><b>Chloe Meinshausen</b></sub>](https://github.com/Chloe-Meinshausen)<br />(Project Manager)<br /> | [<img src="https://avatars.githubusercontent.com/u/81386394?v=4" width="75px;"/><br /><sub><b>Joe Mitz</b></sub>](https://github.com/joemitz)<br />(Architecture Owner)<br /> | [<img src="https://avatars.githubusercontent.com/u/88125977?v=4" width="75px;"/><br /><sub><b>Nick Gerrard</b></sub>](https://github.com/nickgerrard)<br />(UI Owner)<br /> | [<img src="https://avatars.githubusercontent.com/u/89096566?v=4" width="75px;"/><br /><sub><b>Joanna Whang</b></sub>](https://github.com/joeyohie)<br />(Software Engineer)<br /> | [<img src="https://avatars.githubusercontent.com/u/83668987?v=4" width="75px;"/><br /><sub><b>Rudy Sarmiento</b></sub>](https://github.com/rudyesar)<br />(Software Engineer)<br /> | [<img src="https://avatars.githubusercontent.com/u/88808070?v=4" width="75px;"/><br /><sub><b>Wen Dai</b></sub>](https://github.com/Wendyddw)<br />(Software Engineer)<br /> | [<img src="https://avatars.githubusercontent.com/u/88979402?v=4" width="75px;"/><br /><sub><b>Thao Nguyen</b></sub>](https://github.com/thaotpnguyen)<br />(Software Engineer)<br /> |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->
## License
<a href="">?</a>