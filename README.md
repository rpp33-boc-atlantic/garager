# G A R A G E R

<em>Garager</em> is an application based on the peer-to-peer economy like Airbnb. Users can list items from their garage for rent (like tools, equipment, camping gear, decorations, etc.). Users can also search for items they need and rent them when they become available.

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
* In addition to running a server, a PostgreSQL database will have to be deployed and accessible to the server.

* The address and coordinates are sourced via API service with Google Maps. To get API key: ...
* To get Firebase API:...
* To get Stripe keys:
   1. [Create](https://dashboard.stripe.com/register) an account or [Sign into](https://dashboard.stripe.com/login) your account
   2. Locate the **For developers** section in appropriate dashboard for publishable and secret keys. [Live mode dasboard](https://dashboard.stripe.com/dashboard) | [Test mode dashboard](https://dashboard.stripe.com/test/dashboard)


### Running Locally
* The following are the scripts that are relevent for local development and deployment
1. Set up .env file with all keys in the root directory
```
touch .env
```
2. Run the webpack build script
```
npm run build-dev
```
3. Start the server script
```
npm start
```
5. Set up a local PostgreSQL database
```
psql postgres
\i <path to server/database/schema.sql>
```
* Update user, host and password to localhost when running on the local database

4. Run the Jest test script
```
npm test
```

## Production Deployment

### CI/CD recommendations:

#### Continuous Integration:
We used Github's Actions to set up Continuous Integration. The ci.yml instructions are triggered on Pull Requests before approval is allowed.

#### Continuous Deployment:
We used Github's Actions to trigger a new Docker image built on any merge to Main branch.

#### To Run on AWS EC2 Instance:

#### AWS RDS Database:

## Contributors
Members of the Atlantic Team:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/8378155?v=4" width="75px;"/><br /><sub><b>Chloe Meinshausen</b></sub>](https://github.com/Chloe-Meinshausen)<br />(Project Manager)<br /> | [<img src="https://avatars.githubusercontent.com/u/81386394?v=4" width="75px;"/><br /><sub><b>Joe Mitz</b></sub>](https://github.com/joemitz)<br />(Architecture Owner)<br /> | [<img src="https://avatars.githubusercontent.com/u/88125977?v=4" width="75px;"/><br /><sub><b>Nick Gerrard</b></sub>](https://github.com/nickgerrard)<br />(UI Owner)<br /> | [<img src="https://avatars.githubusercontent.com/u/89096566?v=4" width="75px;"/><br /><sub><b>Joann Whang</b></sub>](https://github.com/joeyohie)<br />(Software Engineer)<br /> | [<img src="https://avatars.githubusercontent.com/u/83668987?v=4" width="75px;"/><br /><sub><b>Rudy Sarmiento</b></sub>](https://github.com/rudyesar)<br />(Software Engineer)<br /> | [<img src="https://avatars.githubusercontent.com/u/88808070?v=4" width="75px;"/><br /><sub><b>Wen Dai</b></sub>](https://github.com/Wendyddw)<br />(Software Engineer)<br /> | [<img src="https://avatars.githubusercontent.com/u/88979402?v=4" width="75px;"/><br /><sub><b>Thao Nguyen</b></sub>](https://github.com/thaotpnguyen)<br />(Software Engineer)<br /> |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Features
### Authentication

### Search / Browse

### Post an Item
* Post an item through multiple steps instruction with data validation and suggestion.

<img src="https://user-images.githubusercontent.com/88979402/173197542-07a0cb3c-7431-4c52-b638-34dd81e8aedc.gif" width="50%" height="50%">

### Item View

### Messages

### Accounts

### Payments: Stripe Integration
* Checkout Session - Rent an Item: Users are able to rent an item or return to the app to cancel the checkout process.

![checkoutGIF](https://user-images.githubusercontent.com/89096566/173197676-786ce4e4-7a9d-4a32-8b2a-ce298985bccb.gif)

* Setup a Connected Account: Users are able to create a Stripe connected account to be paid directly when an item of theirs is rented out through the checkout process. They can return to the app at different stages of creating the account without having to start from the beginning each time.

![setupStripeAccount](https://user-images.githubusercontent.com/89096566/173197115-16a29f6d-effc-4263-8437-39e245976034.gif)

* Refund: Users are able to cancel a rented out item before the start date and recieve an immediate refund.

![refundGIF](https://user-images.githubusercontent.com/89096566/173197419-0a9e5d79-af1b-49e7-9a10-1df53815f795.gif)

---
## License
<a href="">?</a>
