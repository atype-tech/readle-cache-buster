# Readle Cache Buster
A CLI tool that makes it easier to clear cached URLs for the Readle App.

🤔 Ideally this functionality will be included in the new backend, rendering this CLI redundant.

## Getting started
### Requirements
- Node v13, NPM v6
- You will need a Cloudflare Global API token for your account.
    - After logging into Cloudflare, click on the **My Profile** link in the dropdown menu on the top-right.
    - Click on the **API Tokens** tab.
    - Find your **Global API Key** and click view. Save it somewhere safe for the time being.

### Steps
1. Clone this repo, and run `npm i` to install dependencies.
2. In the root of this folder, create a `.env` file. Inside put the following variables:
   1. `CLOUDFLARE_ZONE_ID` - you'll find this on the dewenbao.com overview page.
   2. `CLOUDFLARE_API_KEY` - this is the Global API Key you copied earlier.
3. In your terminal run `npm link` to make it easier to run the commands.
4. In your terminal run the command `readle-cache-purge` and follow the prompts.