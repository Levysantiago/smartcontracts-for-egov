pragma solidity ^0.4.23;

import "./lib/Allowance.sol";

contract ImmobileRegistration is Allowance{
    string date;
    string registrationNumber;
    address signature;
    
    // Immobile information
    uint number;
    string place;
    string area;
    string cidade;
    
    //Owner
    string name;
    address owner;
}