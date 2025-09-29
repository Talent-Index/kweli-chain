// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract KwelichainCert is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    enum HashType { SHA256, KECCAK256 }

    struct Certificate {
        address issuer;
        uint256 issuedAt;
        bool revoked;
        HashType hashType;
        string uri;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateIssued(bytes32 indexed hash, address indexed issuer, uint256 indexed issuedAt, uint8 hashType, string uri);
    event CertificateRevoked(bytes32 indexed hash, address indexed issuer, uint256 indexed revokedAt);

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ISSUER_ROLE, admin);
    }

    modifier onlyIssuer() {
        require(hasRole(ISSUER_ROLE, msg.sender), "Not an issuer");
        _;
    }

    function issueCertificate(bytes32 hash, uint8 hashType, string calldata uri) external onlyIssuer {
        require(certificates[hash].issuedAt == 0, "Already issued");
        certificates[hash] = Certificate({
            issuer: msg.sender,
            issuedAt: block.timestamp,
            revoked: false,
            hashType: HashType(hashType),
            uri: uri
        });
        emit CertificateIssued(hash, msg.sender, block.timestamp, hashType, uri);
    }

    function revokeCertificate(bytes32 hash) external onlyIssuer {
        Certificate storage cert = certificates[hash];
        require(cert.issuedAt != 0, "Not issued");
        require(!cert.revoked, "Already revoked");
        cert.revoked = true;
        emit CertificateRevoked(hash, msg.sender, block.timestamp);
    }

    function isValid(bytes32 hash) external view returns (bool valid, address issuer, uint256 issuedAt, bool revoked, uint8 hashType, string memory uri) {
        Certificate memory cert = certificates[hash];
        if (cert.issuedAt == 0) return (false, address(0), 0, false, 0, "");
        return (true, cert.issuer, cert.issuedAt, cert.revoked, uint8(cert.hashType), cert.uri);
    }
}
