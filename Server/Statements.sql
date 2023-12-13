CREATE TABLE MEMBER (
    userID      INT GENERATED ALWAYS AS IDENTITY,
    userName    VARCHAR(20),
    bio         VARCHAR(200),
    email       VARCHAR(20),
    dateJoined  DATE,
    profilePic, VARCHAR,
    isBannedBy  INT,
    banReason   VARCHAR,
    PRIMARY KEY (userID),
    

);

creating new member
INSERT INTO TABLE MEMBER (userName, bio, email) VALUES ($1, $2, $3) 



CREATE TABLE POST (
    postID      INT GENERATED ALWAYS AS IDENTITY,
    title       VARCHAR,
    img         VARCHAR,
    price       REAL,
    info        VARCHAR,
    userID      INT,
    isRemoved   BOOLEAN,
    removedBy   INT,
    color       VARCHAR,
    PRIMARY KEY (postID),
    FOREIGN KEY (userID) REFERENCES MEMBER(userID),
    FOREIGN KEY (removedBy) REFERENCES MEMBER(userID)
);


