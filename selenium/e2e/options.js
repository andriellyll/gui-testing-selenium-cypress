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

  it('create a new product and cancel the creation', async () => {
    // Navega até a página de opções de produto
    await driver.findElement(By.linkText('Options')).click();
  
    const createButton = await driver.wait(
      until.elementLocated(By.css('.ui.labeled.icon.button.primary')),
      10000
    );
    await driver.wait(until.elementIsVisible(createButton), 10000);
    await createButton.click();
  
    await driver.findElement(By.id('sylius_product_option_code')).sendKeys('test_code');
    await driver.findElement(By.id('sylius_product_option_position')).sendKeys('1');
    
    const cancelButton = await driver.wait(
      until.elementLocated(By.css('a.ui.button')),
      10000
    );
    await driver.wait(until.elementIsVisible(cancelButton), 10000);
    await cancelButton.click();
  
    // Verifica se a URL foi redirecionada corretamente para a página de opções de produto
    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('/admin/product-options/'), `Expected to be on /admin/product-options/, but was on ${currentUrl}`);
  
    // Verifica se algum elemento específico na página de opções de produto está presente
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Options'), 'Expected to find "Options" on the page, but it was not found.');
  });  

  it('create a new product, forgetting to add a product name in English', async () => {
    // Navega até a página de opções de produto
    await driver.findElement(By.linkText('Options')).click();
  
    // Aguarda o botão "Create" ficar visível e clica nele
    const createButton = await driver.wait(
      until.elementLocated(By.css('.ui.labeled.icon.button.primary')),
      10000
    );
    await driver.wait(until.elementIsVisible(createButton), 10000);
    await createButton.click();
  
    // Preenche os campos obrigatórios, exceto o nome do produto em inglês
    await driver.findElement(By.id('sylius_product_option_code')).sendKeys('test_code');
    await driver.findElement(By.id('sylius_product_option_position')).sendKeys('1');
  
    const submitButton = await driver.wait(
      until.elementLocated(By.css('.ui.labeled.icon.primary.button')),
      10000
    );
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();
  
    // Verifica se a mensagem de erro foi exibida
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });
  
  it('filter by product name, with contains', async () => {
    const searchType = await driver.findElement(By.id('criteria_search_type'));
    await searchType.sendKeys('Contains');
  
    const searchValue = await driver.findElement(By.id('criteria_search_value'));
    await searchValue.click();
    await searchValue.sendKeys('size');

    const filterButton = await driver.wait(
      until.elementLocated(By.css('*[class^="ui blue labeled icon button"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(filterButton), 10000);
    await filterButton.click();
  
    // Clica na coluna "Name" para ordenar
    const nameColumn = await driver.wait(
      until.elementLocated(By.css('*[class^="sortable sylius-table-column-name"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(nameColumn), 10000);
    await nameColumn.click();
  
    // Verifica se a URL contém 'asc'
    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('asc'));
  
    // Verifica se "T-shirt size" aparece no corpo da página
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('T-shirt size'));
  });
  
  
  it('try to delete a product, but giving up', async () => {
    const deleteButtons = await driver.findElements(By.css('.ui.red.labeled.icon.button'));
    const buttonsLength = deleteButtons.length;
  
    if (buttonsLength > 1) {
      await deleteButtons[1].click();
      const confirmationModal = await driver.wait(
        until.elementLocated(By.id('confirmation-modal')),
        10000
      );
      await driver.wait(until.elementIsVisible(confirmationModal), 10000);
  
      // Clica no botão para fechar o modal
      const removeIcon = await driver.wait(
        until.elementLocated(By.css('*[class^="remove icon"]')),
        10000
      );
      await driver.wait(until.elementIsVisible(removeIcon), 10000);
      await removeIcon.click();
      const updatedDeleteButtons = await driver.findElements(By.css('.ui.red.labeled.icon.button'));
      assert.strictEqual(updatedDeleteButtons.length, buttonsLength);
  
      // Confirma que "T-shirt size" ainda está na página
      const bodyText = await driver.findElement(By.tagName('body')).getText();
      assert(bodyText.includes('T-shirt size'));
    }
  });
  
  it('edit a product name `t_shirt_size` to `blusengröße` in German (Germany)', async () => {
    const editButtons = await driver.findElements(By.css('*[class^="ui labeled icon button"]'));
    await editButtons[2].click();
    await driver.wait(until.elementLocated(By.css('*[class^="ui styled fluid accordion"]')), 10000);
    const titles = await driver.findElements(By.css('.title'));
    await titles[1].click();
  
    // Localiza o campo de nome em alemão, limpa e digita "blusengröße"
    const germanNameInput = await driver.wait(
      until.elementLocated(By.id('sylius_product_option_translations_de_DE_name')),
      10000
    );
    await driver.wait(until.elementIsVisible(germanNameInput), 10000);
    await germanNameInput.clear();
    await germanNameInput.sendKeys('blusengröße');
  
    // Clica no botão de salvar
    const saveButton = await driver.findElement(By.id('sylius_save_changes_button'));
    await saveButton.click();
  
    // Verifica a mensagem de sucesso
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product option has been successfully updated.'));
  });

  // MARIA VITÓRIA
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

  it('delete some product options', async () => {
    const checkboxes = await driver.findElements({ css: '.bulk-select-checkbox' });
    if (checkboxes.length > 0) {
      await checkboxes[0].click();
      await checkboxes[1].click();
      const buttons = await driver.findElements({ css: '.ui.red.labeled.icon.button' });
      buttons[0].click();
      const modal = await driver.wait(until.elementLocated({css: '#confirmation-modal'}), 10000);
      await driver.wait(until.elementIsVisible(modal), 10000);
      const button = await driver.findElement({css: '#confirmation-button'});
      await driver.wait(until.elementIsEnabled(button), 10000);
      await button.click();
      const bodyText = await driver.findElement({tagName: 'body'}).getText();
      assert(bodyText.includes('Product_options have been successfully deleted.'));
    }
  });

  //it('filter by product name, with equals', async () => {});

  //it('edit a product size `S` to `P` in Spanish (Spain)', async () => {});

  //it('create a new product successfully', async () => {});

});
