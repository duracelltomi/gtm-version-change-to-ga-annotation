# Automatically Annotate GA4 with New Live GTM Versions

Use this Google Apps Script to automate the creation of Google Analytics annotations whenever a new version of a Google Tag Manager container goes live.

## Ingredients

- A Google Cloud project with active billing (this script won't incur extra costs)
- Google Tag Manager API enabled in the Google Cloud project
- Google Analytics Data API enabled in the Google Cloud project
- OAuth Consent Screen set up in the Google Cloud project
- Edit access to the Google Analytics property where annotations need to be added
- Read access to the Google Tag Manager containers where new live versions are checked

## Limitations

- GTM API quota limits: https://developers.google.com/tag-platform/tag-manager/api/v2/limits-quotas  
  - Future versions of this script may include a solution to mitigate rate limits  
  - The per-project, per-day quota may limit your ability to use a single instance of this script with many GTM containers  
- Google Apps Script runtime is limited to 6 minutes: https://developers.google.com/apps-script/guides/services/quotas

## Installation

- Make sure you perform all steps using the same Google account
- Go to https://console.cloud.google.com/ and either [create a new project](https://developers.google.com/workspace/guides/create-project) or select an existing Google Cloud project  
	- Make sure [billing is enabled](https://cloud.google.com/billing/docs/how-to/modify-project) in the project (this script will not incur extra costs)  
	- [Enable the required APIs](https://cloud.google.com/endpoints/docs/openapi/enable-api) if they are not already enabled:  
		- [Tag Manager API](https://console.cloud.google.com/apis/api/tagmanager.googleapis.com/)  
		- [Google Analytics Admin API](https://console.cloud.google.com/apis/api/analyticsadmin.googleapis.com/)  
	- [Set up the OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent) and add these three scopes:  
		- https://www.googleapis.com/auth/tagmanager.readonly  
		- https://www.googleapis.com/auth/analytics.edit  
		- https://www.googleapis.com/auth/script.external_request  
- Go to https://script.google.com/ and click **New Project** on the top left of the page  
	- Next to the Apps Script logo, click the project name and enter something meaningful, like "Automatically Annotate GA4 with New Live GTM Versions"  
	- Go to **Project Settings** (gear icon on the left) and enable the checkbox next to *Show "appsscript.json" manifest file in editor*  
	- Under the "Google Cloud Platform (GCP) Project" section, click the **Change project** button and enter the project number (not the project ID) of your Google Cloud project. You can find the project number on your [Google Cloud Dashboard](https://console.cloud.google.com/home/dashboard)  
	- Return to the Editor and create all files available in the repository, except for `appsscript.json`, which will already be shown  
	- Edit `appsscript.json` with the content found in this repository. Adjust the timezone if needed  
	- Copy and paste the content of each `.gs` file into the editor. You can either paste everything into the default `Code.gs` file or create separate files in Apps Script. The end result will be the same; organizing files is just a matter of preference  
	- Add your IDs and parameters into the `GTM_TO_GA_FLOWS` constant. This is an array of objects—you can include just one or multiple items, but keep in mind that all APIs have rate and usage limits  
- To test if it works, run the `checkAndLog()` function in `main.gs` manually and check the execution logs  
	- During the first run, you will be prompted to grant permissions  
- If manual checks pass, you can trigger the same function periodically by going to **Triggers** in your Google Apps Script project and creating a time-driven trigger (e.g., hourly) for `checkAndLog()`

## Support

This is an open-source project I created in my free time to give back to the community. Support is therefore limited. You can open tickets on the Issues tab, but response times may vary.

Feel free to share ideas—PRs are always welcome! 😊
