CREATE DATABASE finastra_event;

USE finastra_event;

CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    company VARCHAR(100),
    companyUrl VARCHAR(255),
    marketingConsent BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
