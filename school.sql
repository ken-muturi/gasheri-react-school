CREATE TABLE `student` (
    id int primary key auto_increment,
    `name` varchar(50) NOT NULL,
    `entrynumber` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `contactnumber` varchar(15) NOT NULL,
    `homecity` varchar(50) NOT NULL
);

INSERT INTO
    `student` (
        `name`,
        `entrynumber`,
        `email`,
        `contactnumber`,
        `homecity`
    )
VALUES (
        'Divyankar Jha',
        '19bec022',
        '19bec022@smvdu.ac.in',
        '9876543210',
        'Faridabad'
    ),
    (
        'Ishu Sharma',
        '19bec031',
        '19bec031@smvdu.ac.in',
        '9876543210',
        'Amritsar'
    ),
    (
        'Jai Gora',
        '19bec033',
        '19bec033@smvdu.ac.in',
        '9876543210',
        'Rohtak'
    ),
    (
        'Manik Shama',
        '19bec046',
        '19bec046@smvdu.ac.in',
        '9876543210',
        'Jammu'
    ),
    (
        'Naishadh',
        '19bec050',
        '19bec050@smvdu.ac.in',
        '9876543210',
        'New Delhi'
    );