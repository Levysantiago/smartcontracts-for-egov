pragma solidity ^0.4.23;

import "./lib/Allowance.sol";

contract ImmobileRegistration is Allowance{
    string date;
    string registrationNumber;
    // Registry office signature
    address signature;
    
    // Immobile information
    uint number;
    string place;
    string area;
    string cidade;
    uint value;

    //OldOwner
    string oldName;
    address oldOwner;
    
    //Owner
    string name;
    address owner;
}