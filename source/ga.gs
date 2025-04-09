/**
 * Accepted annotation colors.
 * ORANGE is not in the list because it is reserved for system annotations.
 */
const GA_ANNOTATION_COLORS = [
    'PURPLE', 'BROWN', 'BLUE', 'GREEN', 'RED', 'CYAN'
  ];
  
  /**
   * Function to create a new annotation in a specified Google Analytics property.
   * @param {string} currentVersion - The new live container version number.
   * @param {string} color - annotation color on the GA UI
   * 
   * @see https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/properties.reportingDataAnnotations#Color
   */
  function addGAAnnotation(gaPropertyID, gtmPublicID, gtmCurrentVersion, annotationColor, annotationText, annotationDescription) {
    const now = new Date();
  
    const finalAnnotationText = annotationText.replace('%gtm_public_id%', gtmPublicID).replace('%gtm_live_version%', gtmCurrentVersion);
    if (finalAnnotationText.length > 50) {
      Logger.log('  Error: annotation text longer than 50 characters, aborting...');
    }
  
    const finalAnnotationDescription = annotationDescription.replace('%gtm_public_id%', gtmPublicID).replace('%gtm_live_version%', gtmCurrentVersion);
    if (finalAnnotationText.length > 150) {
      Logger.log('  Error: annotation description longer than 150 characters, aborting...');
    }
    
    const finalAnnotationColor = annotationColor.toUpperCase();
    if (GA_ANNOTATION_COLORS.indexOf(finalAnnotationColor) == -1) {
      Logger.log("  Unknown color set for property " + gaPropertyID + ": " + finalAnnotationColor + ". Reverting back to BLUE.")
      finalAnnotationColor = "BLUE";
    }
    
    const payload = {
      "annotationDate": {
        "year": now.getFullYear(),
        "month": now.getMonth()+1,
        "day": now.getDate()
      },
      "color": finalAnnotationColor,
      "title": finalAnnotationText,
      "description": finalAnnotationDescription
    };
  
    // Construct the Analytics Admin API URL.
    const gaUrl = 'https://analyticsadmin.googleapis.com/v1alpha/properties/' 
                + gaPropertyID + '/reportingDataAnnotations/';
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
  
    try {
      const response = UrlFetchApp.fetch(gaUrl, options);
      const responseCode = response.getResponseCode();
      Logger.log("Annotation API response code: " + responseCode);
      Logger.log("Annotation response: " + response.getContentText());
    } catch (error) {
      Logger.log("Error creating GA annotation: " + error);
    }
  }