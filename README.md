This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# About

<p align="center">
    <img src="./client/src/images/blockegovme.png" alt="blockegov me"/>
</p>

This project is build for the [UESC (Universidade Estadual de Santa Cruz)](http://www.uesc.br/) Scientific Research. The main goal is to build Smart Contracts for E-Gov and integrate them with a Middleware called I²oTegrator which is described in [this paper](https://ieeexplore.ieee.org/document/8538541). We created contracts for Enrollment Proof, Immobile Registration and Vaccination Card. To give a better understanding about how the system could work, we implemented the Enrollment Proof contract in an Ethereum Testnet, created a server side, that plays the role of the Middleware using the [web3.js](https://web3js.readthedocs.io/en/1.0/) (Ethereum Javascript API) to access the smart contract and built a website (client side) which manages an student Enrollment Proof contract by making requests to the I²oTegrator.

This [video](https://drive.google.com/file/d/1B9yc0KLMtkVeAR2vA9o8eI3g6mjRL_K1/view?usp=sharing) shows a breaf overview of the system running.

[![Build Status](https://travis-ci.org/Levysantiago/smartcontracts-for-egov.svg?branch=master)](https://travis-ci.org/Levysantiago/smartcontracts-for-egov)

## Project Stage

The project is in **Testing** stage.

# Versions

- **Node.js:** v10.15.3
- **NPM:** 6.4.1

# Organization

This repository is organized in client side and server side, to understand how each one works, you can access their folders:

- [Client Side](https://github.com/Levysantiago/smartcontracts-for-egov/tree/master/client)
- [Server Side](https://github.com/Levysantiago/smartcontracts-for-egov/tree/master/server)

# Authors

- [Levy Santiago](https://github.com/Levysantiago)
- [Jauberth Abijaude](https://github.com/jauberth)
