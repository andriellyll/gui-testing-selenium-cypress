const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('attributes', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:8080/admin');
    // await driver.get('http://150.165.75.99:8080/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it('testing edit attribute position', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('dress_collection');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute position
    const inputName = await driver.findElement(By.id('sylius_product_attribute_position'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('10');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('testing edit attribute name in portuguese language', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('dress_material');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Click in Portuguese tab
    await driver.findElement(By.css('[data-locale="pt_PT"]')).click();

    // Edit attribute Portuguese name
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_pt_PT_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Material do vestido');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('test editing min and max length of a attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('jeans_material');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute min position
    const inputNameMin = await driver.findElement(By.id('sylius_product_attribute_configuration_min'));
    inputNameMin.click();
    inputNameMin.clear();
    inputNameMin.sendKeys('10');

    // Edit attribute min position
    const inputNameMax = await driver.findElement(By.id('sylius_product_attribute_configuration_max'));
    inputNameMax.click();
    inputNameMax.clear();
    inputNameMax.sendKeys('100');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('test editing a name from a attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('length');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute name
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_en_US_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Total Length');


    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('test to change a product from translatable to non translatable', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('length');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute translatable checkbox
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translatable'));
    inputName.click();

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('test to create a new attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    //Click in create button
    await driver.findElement(By.css('*[class^="ui labeled icon top right floating dropdown button primary link"]')).click();

    //Click in Text attribute button
    await driver.findElement(By.id('text')).click();

    // Fill Product attribute code field (Warning: this field can olny be runned once, after you have to change value in sendKeys)
    const inputNameAttribute = await driver.findElement(By.id('sylius_product_attribute_code'));
    inputNameAttribute.click();
    inputNameAttribute.sendKeys('test_new_attribute_selenium_1');

    // Fill Product attribute position field
    const inputNamePosition = await driver.findElement(By.id('sylius_product_attribute_position'));
    inputNamePosition.click();
    inputNamePosition.sendKeys('100');

    // Fill Product attribute name field
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_en_US_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Test New Attribute');

    // Click on Save changes button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that attribute has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully created.'));
  })
});
