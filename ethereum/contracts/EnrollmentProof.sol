pragma solidity ^0.4.23;

import "./lib/Mother.sol";
import "./lib/Allowance.sol";

contract EnrollmentProof is Mother, Allowance{
    string private name;
    string private course;
    string private ingress;
    string private period;
    Shift private shift;
    string[] subjects;
    uint subjectsCount;
    
    constructor(address _student, string _name, string _course, string _ingress, string _period, Shift _shift) public Allowance(msg.sender, _student){
        name = _name;
        course = _course;
        ingress = _ingress;
        period = _period;
        shift = _shift;
        subjectsCount = 0;
    }

    /* Controll */
    function addSubject(string subject) public onlyCreator{
        subjects.push(subject);
        subjectsCount++;
    }

    function getSubjectAmount() public view canSee returns(uint count){
        return subjectsCount;
    }

    function getSubject(uint index) public view canSee returns(string subject){
        return subjects[index];
    }

    /* GETTERS */

    function getName() public view canSee returns(string){
        return name;
    }

    function getCourse() public view canSee returns(string){
        return course;
    }

    function getShift() public view canSee returns(Shift){
        return shift;
    }
}