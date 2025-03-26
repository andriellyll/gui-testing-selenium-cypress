import { Builder, By, until, withTagName } from 'selenium-webdriver';
import assert from 'assert';

describe('options', () => {
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
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    await driver.findElement(By.linkText('Options')).click();
  });

  it('edit size XL to GG in Portuguese (Portugal)', async () => {
    // Click in options in side menu
    // await driver.findElement(By.linkText('Options')).click();

    // Type in value input to search for specify option
    await driver.findElement(By.id('criteria_search_value')).sendKeys('jeans_size');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain option
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[1].click();

    // Edit options values for XL size to GG
    const inputName = await driver.findElement(By.id('sylius_product_option_values_3_translations_pt_PT_value'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('GG');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that option has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product option has been successfully updated.'));
  });

  it('create a new product, forgetting to add a product name in English', async () => {
    // Implement your test case 2 code here
  });

  it('delete a product', async () => {
      const buttons = await driver.findElements({ css: '.ui.red.labeled.icon.button' });
      if (buttons.length > 0) {
        await buttons[1].click();
  
        const modal = await driver.wait(until.elementLocated({css: '#confirmation-modal'}), 10000);
        await driver.wait(until.elementIsVisible(modal), 10000);
  
        const button = await driver.findElement({css: '#confirmation-button'});
        await driver.wait(until.elementIsEnabled(button), 10000);
        await button.click();
        const bodyText = await driver.findElement({tagName: 'body'}).getText();
        assert(bodyText.includes('Product option has been successfully deleted.'));
      }
  });
});
