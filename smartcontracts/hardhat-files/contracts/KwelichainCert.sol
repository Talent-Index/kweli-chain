// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract KwelichainCert is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Certificate {
        bytes32 hash;
        address issuer;
        uint8 hashType; // 0=SHA256, 1=Keccak256
        string uri;     // e.g., ipfs://
        bool revoked;
    }

    mapping(bytes32 => Certificate) private certificates;

    event CertificateIssued(bytes32 indexed hash, address indexed issuer, uint8 hashType, string uri);
    event CertificateRevoked(bytes32 indexed hash, address indexed issuer);

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function issueCertificate(bytes32 _hash, uint8 _hashType, string memory _uri) external onlyRole(ISSUER_ROLE) {
        require(certificates[_hash].hash == 0x0, "Already exists");
        certificates[_hash] = Certificate(_hash, msg.sender, _hashType, _uri, false);
        emit CertificateIssued(_hash, msg.sender, _hashType, _uri);
    }

    function revokeCertificate(bytes32 _hash) external {
        Certificate storage cert = certificates[_hash];
        require(cert.issuer == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not authorized");
        require(cert.hash != 0x0, "Does not exist");
        cert.revoked = true;
        emit CertificateRevoked(_hash, msg.sender);
    }

    function isValid(bytes32 _hash) external view returns (bool valid, bool revoked, address issuer, string memory uri) {
        Certificate memory cert = certificates[_hash];
        return (cert.hash != 0x0 && !cert.revoked, cert.revoked, cert.issuer, cert.uri);
    }
}
