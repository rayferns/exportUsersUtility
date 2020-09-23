# exportMEEUsersUtility
This utility is used to extract MEE Service users and store them in a csv file, to delete them at a later stage, using a Postman collection - https://www.getpostman.com/collections/950b94bcfb384c77e762 and Runner feature within Postman

To run the project on your local machine, you'll need:
- Visual Studio Code
- NodeJS
- Newman npm package

Follow these steps to test this project:
- Download the zip file to your preferred project folder location
- Launch VS Studio
- Open the project folder
- Locate the project and open
- Launch the terminal within VS code
- Run this command from the project folder
```javascript
node .\exportUsers.js [text search]
```
- Hit enter
- Review the file .\exportedFiles\ExportUserData.csv

Note: 
Files within the config folder:
Prod_DeleteUsers.postman_environment.json
UAT_DeleteUsers.postman_environment.json
Due to security reasons, the environment login credentials for UAT and PROD environments have been changed to 'xxxxxxxxx', replace this with your own login credentials to Admin PCT tool
