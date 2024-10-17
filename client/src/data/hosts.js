import bcrypt from 'bcryptjs'

const hosts=[{
    _id: 1,
    name: "Tenzin Choda",
    email: "tenzin@gmail.com",
    contact_number: 17736762,
    gender: "Male",
    country: "Bhutan",
    region: "Wangdiphodrang",
    password: bcrypt.hashSync('123456', 10),
    isHost: true,
    education: "Bachelors Degree",
    spoken_languages: ["English", "Hindi", "Spanish"],
    profession: "Software developer",
    date_of_birth: "16/12/2003",
    bio: `Hello! I'm Tenzin Choda, a software developer with a deep passion for technology and a love for connecting with people from all walks of life. I hold a Bachelor's Degree in Computer Science, which has equipped me with a solid foundation in various programming languages and software development methodologies. My journey in the tech world has been both challenging and rewarding, allowing me to work on exciting projects that push the boundaries of innovation.
        As a software developer, I thrive on solving complex problems and creating efficient solutions. I enjoy collaborating with teams to bring ideas to life, whether it's developing user-friendly applications or optimizing backend systems. The ever-evolving nature of technology keeps me on my toes, and I'm always eager to learn new skills and stay updated with industry trends. Coding is not just a job for me; it's a passion that fuels my creativity and drives me to continuously improve.`
},{
    _id: 2,
    name: "Karma Yeshey",
    email: "karma@gmail.com",
    contact_number: 17436612,
    gender: "Male",
    country: "Bhutan",
    region: "Thimphu",
    password: bcrypt.hashSync('123456', 10),
    isHost: true,
    education: "Bachelors Degree",
    spoken_languages: ["English", "Hindi"],
    profession: "Actor",
    date_of_birth: "23/06/1995",
    bio: `Hello! I'm Karma Yeshey, an actor with a passion for storytelling and a love for the performing arts. From a young age, I was captivated by the magic of theater and film, and I knew that I wanted to dedicate my life to this craft. I pursued my dreams by studying drama and performance, which provided me with a solid foundation in acting techniques, character development, and stage presence.
    Throughout my career, I have had the privilege of working on a variety of projects, from stage plays to independent films. Each role I take on allows me to explore different facets of human experience, and I find immense joy in bringing characters to life. I believe that acting is not just about performing; it's about connecting with the audience and evoking emotions that resonate with them. Whether I'm playing a dramatic lead or a quirky supporting character, I strive to deliver authentic performances that leave a lasting impact.`
}
];
export default hosts;