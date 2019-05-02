pragma solidity ^0.4.23;

contract Allowance{
    address public creator;
    address public owner;
    mapping(address => bool) allowedList;
    
    constructor(address _creator, address _owner) public{
        creator = _creator;
        owner = _owner;
        allowedList[creator] = true;
        allowedList[owner] = true;
    }

    modifier canSee(){
        require(allowedList[msg.sender] || msg.sender == owner, "Not allowed");
        _;
    }

    modifier onlyCreator(){
        require(msg.sender == creator, "Only allowed for creator");
        _;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner, "Only allowed for owner");
        _;
    }
    
    modifier onlyCreatorOrOwner(){
        require(msg.sender == creator || msg.sender == owner, "Only allowed for creator or owner");
        _;
    }
    
    /* ALLOWANCE */

    function allow(address account) public onlyCreatorOrOwner{
        allowedList[account] = true;
    }

    function disallow(address account) public onlyCreatorOrOwner{
        allowedList[account] = false;
    }

    function isAllowed(address account) public view returns(bool){
        return allowedList[account];
    }

    function imAllowed() public view returns(bool){
        return allowedList[msg.sender];
    }
}

contract VaccinationCard is Allowance{
    struct Vaccine{
        string personName;
        string name;
        uint dose;
        string date;
        string place;
        address signature;
    }
    mapping(string => bool) private registered;
    mapping(uint => string) private vaccineNames;
    mapping(string => uint) private vaccines;
    mapping(uint => Vaccine) private vaccinesLog;
    uint private vaccineNamesCount;
    uint private vaccinesCount;
    uint private vaccinesLogCount;

    constructor(address _creator, address _owner) public Allowance(_creator, _owner){
        vaccinesLogCount = 0;
        vaccinesCount = 0;
        vaccineNamesCount = 0;
    }

    function addVaccine(uint _nameIndex, string _personName, string _date, string _place) public onlyCreator{
        Vaccine memory v;
        require(_nameIndex >= 0, "Invalid index");
        string memory _name = vaccineNames[_nameIndex];
        require(registered[_name], "Vaccine name not registered");
        if(vaccines[_name] == 0){
            v = Vaccine(_personName, _name, 1, _date, _place, msg.sender);
            vaccinesLogCount++;
            vaccinesLog[vaccinesLogCount] = v;
            vaccines[_name] = vaccinesLogCount;
            vaccinesCount++;
        }else{
            v = vaccinesLog[ vaccines[_name] ];
            v.dose++;
            v = Vaccine(_personName, _name, v.dose, _date, _place, msg.sender);
            vaccinesLogCount++;
            vaccinesLog[vaccinesLogCount] = v;
            vaccines[_name] = vaccinesLogCount;
        }
    }
    
    function addVaccineName(string _name) public onlyCreatorOrOwner{
        vaccineNames[vaccineNamesCount] = _name;
        vaccineNamesCount++;
        registered[_name] = true;
    }

    function getVaccine(uint8 index) public view canSee returns(string, uint, string, string, address){
        require(index < vaccineNamesCount, "Invalid index");
        string memory vn = vaccineNames[index];
        require(registered[vn], "Vaccine not registered");
        Vaccine memory v = vaccinesLog[ vaccines[vn] ];
        return (v.name, v.dose, v.date, v.place, v.signature);
    }
    
    function getVaccineFromLog(uint8 index) public view canSee returns(string, uint, string, string, address){
        require(index <= vaccinesLogCount, "Invalid index");
        Vaccine memory v = vaccinesLog[ index ];
        return (v.name, v.dose, v.date, v.place, v.signature);
    }

    function getVaccinesLogCount() public view canSee returns(uint){
        return vaccinesLogCount;
    }
    
    function getVaccinesNamesCount() public view canSee returns(uint){
        return vaccineNamesCount;
    }
    
    function getVaccinesCount() public view canSee returns(uint){
        return vaccinesCount;
    }
}

contract VaccinationController{
    /* DEFINITIONS */
    address organization;
    mapping(address => bool) clients;
    mapping(address => address[]) cards;
    
    modifier onlyOrganization{
        require(msg.sender == organization);
        _;
    }
    
    modifier shouldBeClient(address _client){
        require(clients[_client]);
        _;
    }
    
    constructor() public{
        organization = msg.sender;
    }
    
    function addVaccinationCard(address _owner) public onlyOrganization{
        address vac = new VaccinationCard(msg.sender, _owner);
        address[] storage vacs = cards[_owner];
        vacs.push(vac);
        clients[_owner] = true;
    }
    
    function listVaccinationCards(address _owner) public view onlyOrganization shouldBeClient(_owner) returns(address[]){
        return cards[_owner];
    }
    
    function isOrganization(address _reg) public view returns(bool){
        return (_reg == organization);
    }
    
    function imOrganization() public view returns(bool){
        return (msg.sender == organization);
    }
    
    function isClient(address _client) public view returns(bool){
        return (clients[_client]);
    }
    
    function imClient() public view returns(bool){
        return (clients[msg.sender]);
    }
}