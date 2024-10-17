import bcrypt from 'bcryptjs'

const users= [{
    _id: 2,
    name: "Kinley Namgay",
    email: "kinley@gmail.com",
    contact_number: 17436623,
    gender: "Male",
    country: "Bhutan",
    region: "Trongsa",
    password: bcrypt.hashSync('123456', 10),
    isHost: false
},{
    _id: 4,
    name: "Hermoine Granger",
    email: "hermoine@gmail.com",
    contact_number: 17432309,
    gender: "Female",
    country: "United States of America",
    region: "Washington DC",
    password: bcrypt.hashSync('123456', 10),
    isHost: false
},{
    _id: 5,
    name: "Harry Potter",
    email: "harry@gmail.com",
    contact_number: 17439987,
    gender: "Male",
    country: "Spain",
    region: "Paris",
    password: bcrypt.hashSync('123456', 10),
    isHost: false
}
];

export default users;