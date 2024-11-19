import bcrypt from 'bcryptjs';

const users=[
    {full_name: "Tenzin Choda", email: "tenzin@gmail.com", contact_number: "17736762", gender: "Male", country: "Bhutan", region: "Phobjikha", password: bcrypt.hashSync("tenzin123", 10) ,isHost: true},
    {full_name: "Kinley Namgay", email: "kinley@gmail.com", contact_number: "17325612", gender: "Male", country: "Bhutan", region: "Trashiyangtse", password: bcrypt.hashSync("kinley123", 10) ,isHost: true},
    {full_name: "Karma Yeshey", email: "karma@gmail.com", contact_number: "17325690", gender: "Male", country: "Bhutan", region: "Paro", password: bcrypt.hashSync("karma123", 10), isHost: true},
    {full_name: "Thinley Dhendup", email: "thinley@gmail.com", contact_number: "77354216", gender: "Male", country: "Bhutan", region: "Haa", password: bcrypt.hashSync("thinley123", 10) ,isHost: true},
    {full_name: "Tshering Yangchen", email: "tshering@gmail.com", contact_number: "17420982", gender: "Female", country: "Bhutan", region: "Bumthang", password: bcrypt.hashSync("tshering123", 10) ,isHost: true}
];

export default users;