pragma solidity ^0.4.20;

// CampaignFactory implemented to allow users to create new Campaign contracts from the originally deployed CampaignFactory
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Project {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint supporterCount;
        mapping(address => bool) support;
    }

    Project[] public projects;
    address public manager;
    uint public minContribution;
    mapping(address => bool) public supporters;
    uint public supportersCount;

    // restricted modifier restricts access to certain functions to the manager or the caller of the contract
    // This will be replaced by OpenZeppelin Ownable functionality in the future
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address campaignCreator) public {
        manager = campaignCreator;
        minContribution = minimum;
    }

    function createProject(string description, uint value, address recipient) public restricted {
        Project memory newProject = Project({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            supporterCount: 0
        });

        projects.push(newProject);
    }

    function contribute() public payable {
        require(msg.value > minContribution);
        supporters[msg.sender] = true;
        supportersCount++;
    }

    function approveProject(uint projectId) public {
        Project storage project = projects[projectId];
        require(supporters[msg.sender]);
        require(!project.support[msg.sender]);
        project.support[msg.sender]=true;
        project.supporterCount++;
    }

    function finalizeProject(uint projectId) public restricted {
        Project storage project = projects[projectId];

        require(project.supporterCount > (supportersCount / 2));
        require(!project.complete);
        // by setting the project.complete flag to true before transfering the funds
        // this prevents repeated calls to the transfer function before project.complete
        // is set to false
        project.complete = true;
        project.recipient.transfer(project.value);
        
    }

    function getDetails() public view returns (uint, uint, uint, uint, address) {
        return (
            minContribution,
            this.balance,
            projects.length,
            supportersCount,
            manager
        );
    }

    function getNumProjects() public view returns (uint) {
        return projects.length;
    }

    // self destruct function callable by contract creator
    function kill() public restricted {
        selfdestruct(manager);
    }

    // this function will prevent ether from being forcibly sent to the contract
    function () public payable {
        revert();
    }
}
