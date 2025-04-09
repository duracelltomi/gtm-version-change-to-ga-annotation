# Automatically Annotate GA4 with new live GTM versions

Use this Google Apps Script to automate creating Google Analytics annotations when new Google Tag Manager version goes live in a specific container.

## Ingredients

- A Google Cloud project with active billing (this script won't generate extra costs)
- Google Tag Manager API enabled in this Google Cloud project
- Google Analytics Data API enabled in this Google Cloud project
- oAuth Consent Screen setup in this Google Cloud project
- Edit access to the Google Analytics property where annotations needs to be added
- Read access to Google Tag Manager containers where new live versions are checked

## Limitations

- GTM API quota limits: https://developers.google.com/tag-platform/tag-manager/api/v2/limits-quotas
  - Future versions of this script might include a solution to mitigate rate limits
  - Per project per day quota may limit your ability to use a single instance of this script with many GTM containers
 - Google Apps Script runtime is limited to 6 minutes: https://developers.google.com/apps-script/guides/services/quotas

## Installation

- Make sure you are doing all steps using the same Google account
- Go to https://console.cloud.google.com/ and either [create a new project](https://developers.google.com/workspace/guides/create-project) or select an existing Google Cloud project
	- Make sure [billing is enabled](https://cloud.google.com/billing/docs/how-to/modify-project) in the project (this script will not generate extra costs)
	- [Enable two APIs](https://cloud.google.com/endpoints/docs/openapi/enable-api) if they have been not enabled yet:
		- [Tag Manager API](https://console.cloud.google.com/apis/api/tagmanager.googleapis.com/)
		- [Google Analytics Admin API](https://console.cloud.google.com/apis/api/analyticsadmin.googleapis.com/)
	- [Setup OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent) and add 3 scopes:
		- https://www.googleapis.com/auth/tagmanager.readonly
		- https://www.googleapis.com/auth/analytics.edit
		- https://www.googleapis.com/auth/script.external_request
- Go to https://script.google.com/ and click New Project on the top left side of the page
	- Next to the App Scripts logo click on the project name and enter something meaningful, like "Automatically Annotate GA4 with new live GTM versions"
	- Go to Project settings (the gear icon on the left) and enabled the checkbox next to 'Show "appsscript.json" manifest file in editor'
	- Under "Google Cloud Platform (GCP) Project" section click the Change project button and enter the project number (NOT the project ID) of your Google Cloud project. You can find the project number on your [Google Cloud Dashboard](https://console.cloud.google.com/home/dashboard)
	- Go back to the Editor and create all files available in the repository except for the appsscript.json as it will be automatically shown
	- Edit appsscript.json with the content found in this repository. Adjust timezone if needed.
	- Copy and paste the content of each .gs file into the editor. You can either put everything into the default provided Code.gs file or you can create separate files in Apps Script. The end result will be the same, I just like to keep things organized
	- Add your IDs and parameters into the `GTM_TO_GA_FLOWS` constant. This is an array of objects, you can limit this to just one item or multiple items but keep in mind that all APIs have rate limits and daily usage limits
- To test if it works, run the `checkAndLog()` function in main.gs manually and check execution logs
	- During the first run, you will be prompted to 
- If manual checks pass, you can trigger the same function periodically by going to Triggers in your Google Apps Script project and create a time-driven trigger that runs `checkAndLog()` for example hourly

## Support

This is an open source project created in my free time to give something to the community. Support is therefore limited. You can open tickets on the Issues tab but response time my vary.

Feel free to add ideas, PRs as always welcome :-)