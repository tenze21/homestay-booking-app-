# Homestay Booking Web Application using *React18(redux toolkit)* and *Expressjs*.

## Content
1. [Background](#1-background).
2. [How does a user navigate the site?](#2-how-does-a-user-navigate-the-site)
3. [Images](#3-images)
4. [Techstack](#4-techstack)
5. [Steps to setup the project](#5-steps-to-setup-the-project)
6. [Challenges](#6-challenges)
7. [Learning](#7-learning)
8. [Acknowledgement](#8-acknowledgement)

## 1. Background
The Homestay Booking web application was developed as a part of my CSF201(Frontend Development-II) mini-project. The project aims to bring Bhutanese homestays to the mainstream of tourism in the country as many homestays often remain hidden and less known to enthusiast travellers from within and abroad. This project also aspires to make it more convenient for foreign visitors and local travelers to keep their accomodation in check, With the applications geolocation feature travellers can easily access nearby homestays.

## 2. How does a user navigate the site?
- When the user first enters visits the site they are shown the homepage which displays all the listed homestays with the ones nearby on top and the user can click on a homestay to view further details about the service.
- To make a reservation or list property on the platform the user needs to create an account on the platform (if the user is new to the site) by visiting the sign up page.
- The user needs to fill up all the fields on the sign up page except for the contact number which is only for Bhutanese citizens or if the user has a contact number registered under a bhutanese internet service provider(ISP).
- Once the user submits the sign up form they get taken back to the homepage but this time with more rights and a user profile is also created.
- The user can now make reservations by viewing their homestay of interest and filling up the required details and making the payment. They can also leave reviews for the homestays.
- If the user wants to list their property as a homestay on the platform they can visit the **"list your property"** link and fill up their service details.
- Once a user fills up the service details the user gets listed as a host on the platform and is able to view, edit and delete their property/service details, manage service availability and receive reservations from clients. 

## 3. Images.
![](/documentation_assets/Screenshot%202024-11-28%20213414.png)
![](/documentation_assets/Screenshot%202024-11-28%20213447.png)
![](/documentation_assets/Screenshot%202024-12-01%20125746.png)
![](/documentation_assets/Screenshot%202024-12-01%20130112.png)

## 4. Techstack.
The application was build on the PERN stack.

- **Frontend**: React (Redux toolkit)
- **Backend**: Expressjs (Nodejs)
- **Database**: PostgresSQL
- **Design**: Figma

## 5. Steps to setup the project.
1. Download nodejs if you haven't done already by visiting the nodejs official website [here](https://nodejs.org/) (v22.11.00 was used for this project).

2. Clone the repository.

   ```
   git clone https://gitlab.com/csf-2015401233/homestay_booking_app.git ```

3. Install dependencies.

    ```
    / (directory)
    npm i

    cd client

    /client (directory)
    npm i
    ```

4. Run docker. (Download it from [here](https://www.docker.com/products/docker-desktop/).)

5. Spin up a postgres container. (You can use postgres application if you have it downloaded, just make sure you change the connection details in the server.js file).

    ```
    docker compose up -d
    ```

    (Spins up a postgres container in detached mode)

6. Connect to the Postgres server running on port **5432**.

    **Option 1:** Use pgAdmin4 (Get it from [here](https://www.pgadmin.org/download/))

    **Option 2:** Use the postgres extension by *chris kolkman* (lightweight but good enough for a simple project)

7. Create the Tables by using the queries in [db-queries.pgsql](/server/db-queries.pgsql) file in **/server** directory.

8. Insert some mock data in the tables.
   - The data have already been created in [users](/server/data/users.js), [homestays](/server/data/homestays.js), [hosts](/server/data/hosts.js), [reviews](/server/data/reviews.js) files in the **/server/data** directory.

   - Go to [seeder.js](/server/seeder.js) file, you will find the functions that insert data into their respective tables make sure only one function is being executed by commenting the rest (start with the user).

   - Enter the **server** directory and run the seeder.
     ```
     / (directory)
     cd server

     node seeder.js
     ```
    
9. Go to [example.env](/example.env) file and insert your enviroment variables as required and rename the file to ***.env***.
    ```
    PORT= 4000
    NODE_ENV=development
    JWT_SECRET= YOUR JWT SECRET
    CURRENCY_CONVERTER_API= API KEY (https://app.currencyapi.com/)
    PAYPAL_CLIENT_ID= YOUR PAYPAL CLIENT ID
    ```

10. Finally you can **cd** into the root directory and run the project.
    ```
    "in the root directory"

    npm run dev
    ```
    This will compile the react app and run the server using the *concurrently* package.

## 6. Challenges
This project eventhough not the perfect one of it's kind is a comprehensive one so developing it wasn't an easy job. I had challenges in many aspects of the project:
- This project is the first project I did with React so I had to figure out a lot of stuff including state management, routing, and making API requests with limited knowledge.
- I decided to use redux toolkit for state management after taking a Udemy tutorial but using the tutorial knowledge and adjusting the code to my projects requirements also weren't easy but much easier than setup it up by myself from scratch.
- Implementing the location feature was also bit challenging. I had a tough time resolving the errors the api requests kept throwing and it still isn't perfect as I haven't handled the errors properly. (something I will touch in future)

## 7. Learning
I think I learned a lot by doing this project. Most importantly it really solidified my understanding, confidence and ability to work with react. I was really amazed to see what was possible with a library like react (before this project I was a little skeptical about using libraries and frameworks in my development process) it really makes implementing complicated features a breeze. To top it all I also got a hands on practice to use redux toolkit which was also a greate state management library for react it really made managing complicated states a piece of cake in react although it's initial setup was kind of hard to grasp but with a understanding of redux it becomes much simple.

## 8. Acknowledgement.
I am really greatful to my module tutor Ms.Namgay Dema, her guidance was a crucial part of this project and in doing this project I really learned a lot. I would also like to drop some gratitude to ***Facebook(meta)*** for doing such an awesome job with react and opensourcing it means a lot so **"Thankyou meta"**.

           Complied By Tenzin Choda, December-2024