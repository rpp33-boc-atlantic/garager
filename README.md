# G A R A G E R

<em>Garager</em> is an application based on the peer-to-peer economy like Airbnb. Users can list items from their garage for rent (like tools, equipment, camping gear, decorations, etc.). Users can also search for items they need and rent them when they become available.
## Table of Contents
  1. <a href='#installation-local-development'> Installation</a>

  2. <a href='#dependencies'> Dependencies</a>

  3. <a href='#production-deployment'> Production Deployment</a>

  4. <a href='#contributors'> Contributors</a>

  5. <a href='#features'> Features</a>
   * <a href='#authentication'> Authentication</a>
   * <a href='#search--browse'> Search / Browse</a>
   * <a href='#post-an-item'> Post an Item</a>
   * <a href='#item-view'> Item View</a>
   * <a href='#messages'> Messaages</a>
   * <a href='#accounts'> Accounts</a>
   * <a href='#payments-stripe-integration'> Payments: Stripe Integration</a>
 
  6. <a href='#tech-stack'> Tech Stack</a>

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
* Sign up/ Log in with email and password

https://user-images.githubusercontent.com/88808070/173258979-e0b65d92-b041-4f88-a03b-90b205f6b516.mp4

* Link Facebook account with a registered email account. Prevent user from creating multiple accounts with the same email.

https://user-images.githubusercontent.com/88808070/173258713-a2750350-d803-42d2-bec2-a69fc86299b7.mp4

### Search / Browse

### Post an Item
* Post an item through multiple steps instruction with data validation and suggestion.

<img src="https://user-images.githubusercontent.com/88979402/173197542-07a0cb3c-7431-4c52-b638-34dd81e8aedc.gif" width="75%" height="75%">

### Item View
* The renter is able to view images, details, and availability of an item to book it for a range of dates. The renter may also suggest a price in case the item owner has enabled the Name Your Own Price feature.

![Item View and Choosing a Range of Dates](https://user-images.githubusercontent.com/83668987/173741564-4fea97df-d705-4660-92cd-8248431dd706.gif)

* Proper error handling in case an item post has been deleted by its owner. The button to delete a listing is visible only to the owner.

![Proper Error Handling](https://user-images.githubusercontent.com/83668987/173741702-2877cb11-97ce-4431-aca7-95bbc07c3e01.gif)


### Messages

### Accounts
 * List all items owned by a user. 
 * View earnings and statistics about item transactions
   ![ListingsEarnings](https://user-images.githubusercontent.com/8378155/173496663-a7ca8534-8d71-497a-91e0-1969fd49f775.gif)
 * View all current and upcoming rentals booked in the site and also review past transactions
 * ![Rentals](https://user-images.githubusercontent.com/8378155/173497830-b332e033-b1b5-46f7-855b-093d4825695b.gif)


*

### Payments: Stripe Integration
* Checkout Session - Rent an Item: Users are able to rent an item or return to the app to cancel the checkout process.

![checkoutSession-faster-GIF](https://user-images.githubusercontent.com/89096566/174423456-59f3eb88-c97c-4a1a-bc0b-e96a0f68c2dd.gif)

* Setup a Connected Account: Users are able to create a Stripe connected account to be paid directly when an item of theirs is rented out through the checkout process. They can return to the app at different stages of creating the account without having to start from the beginning each time.

![setupStripeAccount](https://user-images.githubusercontent.com/89096566/173197115-16a29f6d-effc-4263-8437-39e245976034.gif)

* Refund: Users are able to cancel a rented out item before the start date and recieve an immediate refund.

![refundGIF](https://user-images.githubusercontent.com/89096566/173197419-0a9e5d79-af1b-49e7-9a10-1df53815f795.gif)

---

## Tech Stack
### Languages
<div>
   <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
   <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
   <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</div>

### Frontend

<div>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/axios-5a29e4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" />
</div>

### Backend!

<div>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/>
</div>

### Database

<div>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
</div>

### Testing

<div>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/supertest-3178C6?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white" />
</div>

### DevTools

<div>
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
  <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" />
</div>

### Deployment

<div>
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
</div>
