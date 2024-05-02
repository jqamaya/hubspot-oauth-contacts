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
