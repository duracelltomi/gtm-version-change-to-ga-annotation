function testGTMCheck() {
    Logger.log(checkGTMVersion(GTM_TO_GA_FLOWS[0].gtm_account_id, GTM_TO_GA_FLOWS[0].gtm_container_id));
  }
  
  function testGAAnnotations() {
    addGAAnnotation(GTM_TO_GA_FLOWS[0].ga_property_id, "GTM-TEST", "Script test", GTM_TO_GA_FLOWS[0].ga_annotation_color, GTM_TO_GA_FLOWS[0].ga_annotation_text, GTM_TO_GA_FLOWS[0].ga_annotation_description);
  }
  