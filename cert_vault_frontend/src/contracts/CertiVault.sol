// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertiVault {
    // Struct to store certificate data
    struct Certificate {
        string studentName;
        string studentId;
        string courseName;
        uint256 issueDate;
        bytes32 certificateHash; // Hash of the certificate file
        address issuer;
        bool isValid;
    }

    // Mapping from certificate ID to Certificate struct
    mapping(bytes32 => Certificate) public certificates;
    
    // Event emitted when a new certificate is issued
    event CertificateIssued(
        bytes32 indexed certificateId,
        string studentName,
        string studentId,
        string courseName,
        uint256 issueDate,
        address indexed issuer
    );

    // Event emitted when a certificate is revoked
    event CertificateRevoked(bytes32 indexed certificateId);

    // Function to issue a new certificate
    function issueCertificate(
        string memory _studentName,
        string memory _studentId,
        string memory _courseName,
        uint256 _issueDate,
        bytes32 _certificateHash
    ) public returns (bytes32) {
        // Generate unique certificate ID using keccak256
        bytes32 certificateId = keccak256(
            abi.encodePacked(
                _studentName,
                _studentId,
                _courseName,
                _issueDate,
                _certificateHash,
                msg.sender
            )
        );

        // Ensure certificate doesn't already exist
        require(!certificates[certificateId].isValid, "Certificate already exists");

        // Create and store the certificate
        certificates[certificateId] = Certificate({
            studentName: _studentName,
            studentId: _studentId,
            courseName: _courseName,
            issueDate: _issueDate,
            certificateHash: _certificateHash,
            issuer: msg.sender,
            isValid: true
        });

        // Emit certificate issued event
        emit CertificateIssued(
            certificateId,
            _studentName,
            _studentId,
            _courseName,
            _issueDate,
            msg.sender
        );

        return certificateId;
    }

    // Function to verify a certificate
    function verifyCertificate(bytes32 _certificateId) public view returns (
        bool isValid,
        string memory studentName,
        string memory studentId,
        string memory courseName,
        uint256 issueDate,
        address issuer
    ) {
        Certificate memory cert = certificates[_certificateId];
        return (
            cert.isValid,
            cert.studentName,
            cert.studentId,
            cert.courseName,
            cert.issueDate,
            cert.issuer
        );
    }

    // Function to verify certificate hash
    function verifyCertificateHash(bytes32 _certificateId, bytes32 _certificateHash) 
        public view returns (bool) {
        return certificates[_certificateId].certificateHash == _certificateHash;
    }

    // Function to revoke a certificate (only issuer can revoke)
    function revokeCertificate(bytes32 _certificateId) public {
        require(certificates[_certificateId].issuer == msg.sender, "Only issuer can revoke");
        require(certificates[_certificateId].isValid, "Certificate already revoked or doesn't exist");
        
        certificates[_certificateId].isValid = false;
        emit CertificateRevoked(_certificateId);
    }
}