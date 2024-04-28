# Screenshots
![image](https://github.com/jqamaya/hubspot-oauth-contacts/assets/13392538/c8493ff8-c92c-4fc8-a32b-a970800b1013)
![image](https://github.com/jqamaya/hubspot-oauth-contacts/assets/13392538/610f9d27-2796-4f8c-b18d-9bd186249e37)


# Client - React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the `client` directory, you can run:

### `yarn`

Installs the packages/dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

# Server - PHP

The server is implemented using native PHP.

## Database: `MySQL`

Run the `query.sql` to create the database and tables.

## Available Scripts

In the `server` directory, you can run:

### `composer i` or `composer install`

Installs the packages.

### `php -S localhost:8000 -t src/public`
APIs will be available to use once this command is run.

### `crontab -e`
#### `cron-expression path-to-project/server/bin/run.php &> /dev/null`

Example: `0 */1 * * * /server/bin/run.php &> /dev/null` \
Executes the file based on the provided cron expression.

---

# HubSpot
- [OAuth API](https://developers.hubspot.com/docs/api/oauth-quickstart-guide)
- [Contacts API](https://developers.hubspot.com/docs/api/crm/contacts)
- [Package](https://github.com/HubSpot/hubspot-api-php)
