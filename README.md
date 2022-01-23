# *----- SDC(System Design Capstone) : Products API -----*

## Overview

A backend server and database of product information for an e-commerce web app.
My goal was to replace an existing API with a back end system that can support the full data set for the project and to scale to meet the demands of production traffic.

I designed a database(PostgreSQL) and server, and then deployed to AWS EC2 and scaled the service to support at minimum 1k RPS(requests per second) on AWS EC2 using a t2.micro instance.

## Tech-Stack
- Node.js
- Nodemon
- Node express
- Axios
- Npm
- PostgreSQL
- Webpack
- Babel
- Loader.io 
- Artillery 
- AWS EC2

## Given csv files

| CSV File Name | Size | Lines |
| --- | --- | --- |
| product.csv | 288 MB | 1,000,012 |
| features.csv | 85 MB | 2,218,659 |
| skus.csv | 653 MB | 26,961,740 |
| photos.csv | 3,650 MB | 13,463,360 |
| styles.cvs | 158 MB | 4,660,355 |
| related.csv | 96 MB | 4,510,018 |
| Total | 4,930 MB | 52,814,144 |

## Phase Description

* Phase 0: Picking a project and initial setup
* Phase 1: Create the Database
* Phase 2: Create the API
* Phase 3: Performance Tune the Service
* Phase 4: Deploy and Benchmark Initial Performance
* Phase 5: Scale the Application

## Routes

| Request Type | Endpoint                      | Returns                                                                    
|--------------|-------------------------------|----------------------------------------------------------------------------
| GET          | /products                     | Retrieves the list of products                                 
| GET          | /products/:product_id         | Returns all product level information for a specified product id                                
| GET          | /products/:product_id/styles  | Returns the all styles available for the given product            
| GET          | /products/:product_id/related | Returns the id's of products related to the product specified     


## Usage

- You can test the api by sending curl commands or a service to send requests for you such as [Postman](https://www.postman.com/).
- Alternatively, you could install one of the front end clients and direct it to this api in order to fully use it.

## Testing
I used the <b>Artillery</b> for the local stress test and the <b>Loader.io</b> for the cloud-based load test.

### [Initial Stage : During 60sec] - Local
| API Service | Response Time/1 RPS | Median Response Time/100 RPS| ERROR Rate/100 RPS|
| --- | --- | --- | --- |
| Test Type | Postman | Artillery | Artillery |
| List Products | 27ms | 5,711 ms | 98.4% |
| Product Information | 188ms | 6,064 ms | 98.6% |
| Product Styles | 53,568ms | N/A | 100% |
| Related Products | 607ms | 5,487 ms | 56.6% |

### [Mid Stage : During 60sec] - Local (*After optimization)
| API Service | Response Time/1 RPS | Median Response Time/100 RPS| ERROR Rate/100 RPS|
| --- | --- | --- | --- |
| Test Type | Postman | Artillery | Artillery |
| List Products | 22 ms | 5 ms | 0% |
| Product Information | 25 ms | 5 ms | 0% |
| Product Styles | 28 ms | 8.9 ms | 0% |
| Related Products | 19 ms | 4 ms | 0% |

### [Final Stage : During 60sec] - AWS EC2 Instance/Loader.io

<details>
<summary>[250 RPS] : 7ms avg response, 0.0% err rate</summary>
  <img width='800' src='https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8ab6f083-4f80-4ef7-a8d0-5e3de76d2642/Untitled.png'>
</details>

<details>
<summary>[500 RPS] : 68ms avg response, 0.0% err rate</summary>
  <img width='800' src='https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17d9e23e-9bcc-4c0a-bd58-a5956fbf02a5/Untitled.png'>
</details>

<details>
<summary>[1000 RPS] : 1,140ms avg response, 0.0% err rate</summary>
  <img width='800' src='https://s3-us-west-2.amazonaws.com/secure.notion-static.com/916f794f-f3c4-4fdc-bdd7-e27e64c6a310/Untitled.png'>
</details>

## Installation

- Navigate to the folder where it was cloned.
- With [npm](https://npmjs.org/) installed, 
```
npm install
```
```
npm start
```
-> This will install all necessary packages, and start the express server.
Open http://localhost:3000

## Team Members
- Byungchan Lee
