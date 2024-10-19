import bcrypt from 'bcryptjs';

const users=[
    {full_name: "Tenzin Choda", email: "tenzin@gmail.com", contact_number: "17736762", gender: "Male", country: "Bhutan", region: "Phobjikha", password: bcrypt.hashSync("tenzin123", 10) ,isHost: true, profile: "/images/user/user-profile.jpg"},
    {full_name: "Kinley Namgay", email: "kinley@gmail.com", contact_number: "17325612", gender: "Male", country: "Bhutan", region: "Trashiyangtse", password: bcrypt.hashSync("kinley123", 10) ,isHost: true, profile: "/images/user/user-profile-2.jpg"},
    {full_name: "Karma Yeshey", email: "karma@gmail.com", contact_number: "17325690", gender: "Male", country: "Bhutan", region: "Thimphu", password: bcrypt.hashSync("karma123", 10), isHost: true, profile: "/images/user/user-profile-3.jpg"},
    {full_name: "Harry Potter", email: "harry@gmail.com", contact_number: "77354216", gender: "Male", country: "United States", region: "Texas", password: bcrypt.hashSync("harry123", 10) ,isHost: false, profile: "/images/user/default-profile.jpg"},
    {full_name: "Tshering Yangchen", email: "tshering@gmail.com", contact_number: "17420982", gender: "Female", country: "Bhutan", region: "Trashiyangtse", password: bcrypt.hashSync("tshering123", 10) ,isHost: false, profile: "/images/user/default-profile.jpg"}
];

export default users;