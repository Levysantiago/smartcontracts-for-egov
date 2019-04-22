pragma solidity ^0.4.23;

import "./lib/Allowance.sol";

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

    constructor(address _owner) public Allowance(msg.sender, _owner){
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