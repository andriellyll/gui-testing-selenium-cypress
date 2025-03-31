describe('attributes', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
  it('testing edit attribute position', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('dress_collection');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Edit attribute position
    cy.get('[id="sylius_product_attribute_position"]').clear().type('10');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });
  it('testing edit attribute name in portuguese language', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('dress_material');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Click in Portuguese tab
    cy.get('[data-locale="pt_PT"]').click();
    // Edit attribute name in portuguese
    cy.get('[id="sylius_product_attribute_translations_pt_PT_name"]').clear().type('Material do vestido');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });
  it('test editing min and max length of a attribute', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('jeans_material');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Edit attribute min length
    cy.get('[id="sylius_product_attribute_configuration_min"]').clear().type('10');
    // Edit attribute max length
    cy.get('[id="sylius_product_attribute_configuration_max"]').clear().type('100');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });
  it('test editing a name from a attribute', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('length');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Edit attribute name in English
    cy.get('[id="sylius_product_attribute_translations_en_US_name"]').clear().type('Total Length');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });
  it('test to change a product from translatable to non translatable', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('length');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Click in Translatable checkbox
    cy.get('[id="sylius_product_attribute_translatable"]').uncheck();
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });

  it('test to create a new attribute', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    
    //Click in create button
    cy.get('*[class^="ui labeled icon top right floating dropdown button primary link"]').click();
    //Click in Text field
    cy.clickInFirst('[id="text"]');
    //Fill Product attribute code field
    cy.get('[id="sylius_product_attribute_code"]').type('test_new_attribute');
    //Fill Product attribute position field
    cy.get('[id="sylius_product_attribute_position"]').type('100');
    //Fill Product attribute name field
    cy.get('[id="sylius_product_attribute_translations_en_US_name"]').clear().type('Test New Attribute');

    // Click on Save changes button
    cy.get('*[class^="ui labeled icon primary button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully created.');
  });
});
