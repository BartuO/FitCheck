CREATE TABLE MEMBER (
    userID      INT GENERATED ALWAYS AS IDENTITY,
    userName    VARCHAR(20),
    bio         VARCHAR(200),
    email       VARCHAR(20),
    dateJoined  DATE,
    profilePic, VARCHAR,
    isBannedBy  INT,
    password    VARCHAR(20),
    banReason   VARCHAR,
    PRIMARY KEY (userID),
    

);

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


'creating new member'
INSERT INTO TABLE MEMBER (userName, bio, email) VALUES ($1, $2, $3);

"email_in_use?"
SELECT email FROM member WHERE email = $1; 

"register_user"
INSERT INTO member (email, username, password) VALUES ($1,$2,$3)

"login user"
SELECT email, password, userID FROM member WHERE email = $1

'add a post'
INSERT INTO POST(title, price, info, color, img, userID, isRemoved, removedBy) 
VALUES ($1, $2, $3, $4, $5, $6, false, null);

'get posts'
SELECT * FROM post LIMIT 40;

'getuserposts'
SELECT * FROM post WHERE userid = $1;

'getProfile'
SELECT * FROM member WHERE userid = $1;

'update profile'
UPDATE member SET username = $2, bio = $3, profilepic = $4 WHERE userID = $1;

'update pfp'
UPDATE member SET profilepic = $2 WHERE userID = $1;

