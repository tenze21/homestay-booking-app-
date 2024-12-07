# Homestay Booking Application using *React18(redux toolkit)* and *Expressjs*.

***You are currently in the deployment branch. This branch contains the deployed version of the project***

## Deploying on Render.
1. Go to render's official site [here.](https://render.com/)
2. Create an account on render if you haven't done already.
3. Click on the **+ New** tab and select **PostgresSQL** from the options.

   ![](/documentation-assets/Screenshot%202024-12-07%20214917.png)
4. Fill up the form, keep the region to default one and select the free option and click the **Create Database** button.
5. Rename the ***example.env*** file to ***.env*** and update it's content.

    ```
    PORT= 4000
    NODE_ENV=development
    JWT_SECRET= YOUR JWT SECRET
    CURRENCY_CONVERTER_API= API KEY (https://app.currencyapi.com/)
    PAYPAL_CLIENT_ID= YOUR PAYPAL CLIENT ID
    POSTGRES_USER= YOUR DEPLOYED POSTGRES INSTANCE USERNAME
    POSTGRES_HOST=YOUR DEPLOYED POSTGRES INSTANCE HOST
    POSTGRES_DATABASE=YOUR DEPLOYED POSTGRES INSTANCE DATABASE NAME
    POSTGRES_PASSWORD=YOUR DEPLOYED POSTGRES INSTANCE PASSWORD
    ```
    Note*: The POSTGRES_HOST is the string between **@** and your **Database name** in the external URL. If the external database URL is “abc@def-a.oregon.postgres.com/database_name”, then the host name is “def-a.oregon.postgres.com’.

6. Now the project is connected to the remote postgres server, remember to connect the remote postgres server to pgAdmin4 or postgres extension and execute the queries to create the tables in the remote postgres database.

7. Run the **seeder.js** file as mentioned in the **main** branch to insert some mock data into your database.

8. Once you are done with the database, click on the **+ New** tab again and select **Web Service**.

9. Give render access to your gitlab ot Github account so that it can get you project files.

10. Change the branch to **Deployment** from main.

11. You can leave the root directory field empty.

12. Type **npm run build** in the **Build Command** field.

13. Type **npm start** in the **Start Command** field.

14. In the **Enviroment Variables** section fill enter the variables in the .env file.
    Note*: You don't need to enter the *NODE_ENV* variable here. it is set to production by default.

15. Finally click on the **Deploy Web Service** button and let render do it's job. Once the deployment is finished you can access the deployed project from the link render provides.

    ![](/documentation-assets/Screenshot%202024-12-07%20222605.png)

                                            Compiled by Tenzin Choda, December-2024.