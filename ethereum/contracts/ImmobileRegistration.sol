pragma solidity ^0.4.23;

import "./lib/Allowance.sol";

contract ImmobileRegistration is Allowance{
    // Basic information
    string registrationNumber;
    string date;
    address signature; // Registry office signature
    
    // Immobile information
    uint number;
    string place;
    string area;
    string city;
    uint value;

    //OldOwner
    //string oldName;
    address oldOwner;
    
    //Owner
    //string ownerName;
    address owner;
    
    constructor(address _creator, address _owner, string _regNumber, string _date, uint _number, string _place, string _area, string _city, uint _value, address _oldOwner) public Allowance(_creator, _owner){
        signature = _creator;
        registrationNumber = _regNumber;
        date = _date;
        number = _number;
        place = _place;
        area = _area;
        city = _city;
        value = _value;
        oldOwner = _oldOwner;
    }
    
    function getImmobileInfo() public view onlyCreatorOrOwner returns(uint, string, string, string, uint){
        return (number, place, area, city, value);
    }
    
    function getOwnersInfo() public view onlyCreatorOrOwner returns(address, address){
        return (owner, oldOwner);
    }
    
    function getDocumentInfo() public view onlyCreatorOrOwner returns(string, string, address){
        return (registrationNumber, date, signature);
    }
    
}

contract ImmobileController{
    address registryOffice;
    mapping(address => bool) clients;
    mapping(address => address[]) documents;
    
    modifier onlyOffice{
        require(msg.sender == registryOffice);
        _;
    }
    
    modifier shouldBeClient(address _client){
        require(clients[_client]);
        _;
    }
    
    constructor() public{
        registryOffice = msg.sender;
    }
    
    function addImmobileRegistry(address _creator, address _owner, string _regNumber, string _date, uint _number, string _place, string _area, string _city, uint _value, address _oldOwner) public onlyOffice{
        address doc = new ImmobileRegistration(_creator, _owner, _regNumber, _date, _number, _place, _area, _city, _value, _oldOwner);
        address[] storage docs = documents[_owner];
        docs.push(doc);
        clients[_owner] = true;
    }
    
    function listImmobileRegistries(address _owner) public view onlyOffice shouldBeClient(_owner) returns(address[]){
        return documents[_owner];
    }
    
    function isRegistryOffice(address _reg) public view returns(bool){
        return (_reg == registryOffice);
    }
    
    function imRegistryOffice() public view returns(bool){
        return (msg.sender == registryOffice);
    }
    
    function isClient(address _client) public view returns(bool){
        return (clients[_client]);
    }
    
    function imClient() public view returns(bool){
        return (clients[msg.sender]);
    }
}