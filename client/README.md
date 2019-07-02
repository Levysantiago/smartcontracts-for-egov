# About

This is the client side, a website that comunicates with the server side to manage the smart contract.

# Dependences

All the dependences are listed on package.json file, here they are:

```
"dependencies": {
    "metamask-logo": "^2.2.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.0",
    "react-scripts": "2.1.8",
    "react-scroll-to": "^2.0.5",
    "remix-ide": "^0.8.0-alpha",
    "solc": "^0.4.23"
}
```

# Framework

The Front-End framework used for this project is the [Materialize](https://materializecss.com/).

# Component Used

- [Metamask Logo](https://www.npmjs.com/package/metamask-logo)

# Getting Started

Here are some instructions that show how to set up the project and running on your local machine for development and testing purposes.

## Installing Dependences

To install all dependences just type:

```
$ npm install
```

## Config File

Before you continue with anything, you need to create a _.env_ file, this is where you config the contract address. So you will create this file on client folder and set up the constant, for example:

_.env_

```
ENROLLMENT_CONTROLLER="0x0000000000000000000000000000000000000000"
```

## Running the server

To run the client side, you might need to run the server side first, because some pages will make requests to it. To run the server side, you can open another terminal, get in the server page:

```
$ cd server
```

then run it:

```
$ npm run server
```

## Running the client

```
$ npm start
```
