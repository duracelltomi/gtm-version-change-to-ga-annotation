/**
 * Checks the GTM live container version using the REST API.
 * 
 * @param int GTM account ID
 * @param int GTM container ID (not GTM-XXXXX but the internal ID shown on GTM admin)
 * 
 * @return object Current container version and public container ID
 */
function checkGTMVersion(gtmAccountID, gtmContainerID) {
    // Build the URL to fetch the live container version.
    const url = `https://tagmanager.googleapis.com/tagmanager/v2/accounts/${gtmAccountID}/containers/${gtmContainerID}/versions:live`;
  
    const options = {
      method: 'get',
      contentType: 'application/json',
      headers: {
        'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
      },
      muteHttpExceptions: true
    };
  
    try {
      const response = UrlFetchApp.fetch(url, options);
      const responseCode = response.getResponseCode();
      if (responseCode !== 200) {
        Logger.log(`  Error: GTM API returned code ${responseCode} - ${response.getContentText()}`);
        return;
      }
      
      const data = JSON.parse(response.getContentText());
      return {
        version: data.containerVersionId,
        publicId: data.container.publicId
      };
    } catch (error) {
      Logger.log(`  Error fetching the live GTM version: ${error}`);
    }
  }