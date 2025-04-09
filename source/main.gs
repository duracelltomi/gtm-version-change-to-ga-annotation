/**
 * Automatically Annotate GA4 with new live GTM versions
 * 
 * @author Thomas Geiger
 * @link https://www.linkedin.com/in/duracelltomi/
 * @link https://jabjab.hu/
 * @license GNU General Public License, version 3
 */

/**
 * Add your source and destinations here.
 * 
 * GTM account ID and container ID can be found in the URL when GTM UI is open:
 * https://tagmanager.google.com/#/container/accounts/<ACCOUNT_ID>/containers/<CONTAINER_ID>/workspaces/
 * 
 * Do NOT use the GTM-XXXXXX container ID here!
 * If you find it difficult to extract IDs from the URL, you can also open the Google Tag Manager admin
 * and read the IDs from the Account Settings and Container Settings pages.
 * 
 * GA4 property ID can be also found in the URL when the GA4 UI is open:
 * https://analytics.google.com/analytics/web/#/p<PROPERTY_ID>/reports/...
 * 
 * Again, if this is not convinient for you, you can open the GA4 admin page and look at the ID on
 * the Property details screen. Do NOT enter your G-XXXXXXXXX measurement ID here!
 * 
 * Accepted colors: PURPLE, BROWN, BLUE, GREEN, RED, CYAN (ORANGE is reserved for system annotations!)
 * 
 * In annotation text and description you can use two variables to format your message:
 *   %gtm_public_id% will be replaced with the publid GTM ID (GTM-XXXXXX)
 *   %gtm_live_version% will be replaced with the new live version number
 * 
 * ga_annotation_text can not exceed 50 characters after replacing the variables in the text.
 * ga_annotation_description can not exceed 150 characters after replacing the variables in the text.
 */
const GTM_TO_GA_FLOWS = [{
  'gtm_account_id': 'YOUR_GTM_ACCOUNT_ID1',
  'gtm_container_id': 'YOUR_GTM_CONTAINER_ID1',
  'ga_property_id': 'YOUR_GA_PROPERTY_ID1',
  'ga_annotation_color': 'BLUE', // possible values: see above in the comment
  'ga_annotation_text': '%gtm_public_id% live container version updated to: %gtm_live_version%', // adjust this as you wish
  'ga_annotation_description': '',  // adjust this as you wish
},{
  'gtm_account_id': 'YOUR_GTM_ACCOUNT_ID2',
  'gtm_container_id': 'YOUR_GTM_CONTAINER_ID2',
  'ga_property_id': 'YOUR_GA_PROPERTY_ID2',
  'ga_annotation_color': 'BLUE', // possible values: see above in the comment
  'ga_annotation_text': '%gtm_public_id% live container version updated to: %gtm_live_version%', // adjust this as you wish
  'ga_annotation_description': '',  // adjust this as you wish
}];

/**
 * !!! DO NOT EDIT FROM HERE !!!
 */

const VERSION_STORE_KEY = 'gtm_live_versions';

/**
 * Checks every entry from GTM_TO_GA_FLOWS
 * 
 * @return void
 */
function checkAndLog() {
  const properties = PropertiesService.getScriptProperties();
  const storedData = properties.getProperty(VERSION_STORE_KEY) || '';
  let storedVersion = {};
  if (storedData !== '') {
    storedVersion = JSON.parse(storedData);
  }
  Logger.log("Stored data:");
  Logger.log(storedVersion);

  GTM_TO_GA_FLOWS.forEach(function(gtmGaData) {
    Logger.log(`Processing GTM account ${gtmGaData.gtm_account_id} / container ${gtmGaData.gtm_container_id} to GA property ${gtmGaData.ga_property_id} ...`);

    const currentVersionData = checkGTMVersion(gtmGaData.gtm_account_id, gtmGaData.gtm_container_id);
    const storedVersionData  = storedVersion[gtmGaData.gtm_container_id] ? storedVersion[gtmGaData.gtm_container_id] : '';

    Logger.log(`  Current Version: ${currentVersionData.version} | Stored Version: ${storedVersionData}`);

    // If the live version has changed, update the stored version and create a GA annotation.
    if (currentVersionData.version && currentVersionData.version !== storedVersionData) {
      Logger.log('  Storing new version to script properties...');
      storedVersion[gtmGaData.gtm_container_id] = currentVersionData.version;

      // Do not add annotation if this is the first test in this GTM container
      if (storedVersionData) {
        Logger.log('  Adding annotation...');
        addGAAnnotation(gtmGaData.ga_property_id, currentVersionData.publicId, currentVersionData.version, gtmGaData.ga_annotation_color, gtmGaData.ga_annotation_text, gtmGaData.ga_annotation_description);
      }
    } else {
      Logger.log("  Live container version not changed!")
    }
  });

  properties.setProperty(VERSION_STORE_KEY, JSON.stringify(storedVersion));
  Logger.log("Done.");
}

function clearScriptProperty() {
  const properties = PropertiesService.getScriptProperties();
  properties.deleteProperty(VERSION_STORE_KEY);
}