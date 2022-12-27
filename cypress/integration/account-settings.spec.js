describe('account-settings component', () => {
  context('render WithUsername story', () => {
    beforeEach(() => {
      cy.loadStory('Default/WithUsername');
    });

    it('should have correct header text', () => {
      cy.getBySel('header').should('have.text', 'Your user data');
    });
    it('input[username] should have correct value', () => {
      cy.get('input[name=username]').should('have.value', 'JohnDoeMaster');
    });

    it('input[name] should have correct value', () => {
      cy.get('input[name=name]').should('have.value', 'John Doe');
    });

    it('input[phone] should have correct value', () => {
      cy.get('input[name=phone]').should('have.value', '+44 500 500 500');
    });
  });

  context('render BusinessAccount story', () => {
    beforeEach(() => {
      cy.loadStory('Default/BusinessAccount');
    });
    it('should have correct business header text', () => {
      cy.getBySel('header').should('have.text', 'Your business data');
    });
  });

  context('render WithMockSaveDataSuccessResponseMsg story', () => {
    beforeEach(() => {
      cy.loadStory('Default/WithMockSaveDataSuccessResponseMsg');
    });
    it('should have correct notification on save', () => {
      cy.get('button[type=submit]').click();
      cy.getBySel('notification').should('have.text', 'Data was changed');
    });
  });

  context('render WithMockSaveDataInternalErrorResponseMsg story', () => {
    beforeEach(() => {
      cy.loadStory('Default/WithMockSaveDataInternalErrorResponseMsg');
    });

    it('should have correct error notification on get data', () => {
      cy.get('button[type=submit]').click();
      cy.getBySel('notification').should('have.text', 'Error getting data');
    });
    it('should have correct error notification on save', () => {
      cy.get('input[name=name]').type('John Doe');
      cy.get('input[name=phone]').type('+44 500 500 500');
      cy.get('button[type=submit]').click();
      cy.getBySel('notification').should('have.text', 'Data save error');
    });
  });

  context('render WithMockSaveDataErrorResponseMsg story', () => {
    beforeEach(() => {
      cy.loadStory('Default/WithMockSaveDataErrorResponseMsg');
    });

    it('should have correct validation error notification on save', () => {
      cy.get('button[type=submit]').click();
      cy.getBySel('notification').should('have.text', 'Validation API error');
    });
  });

  context('render EmptyData story', () => {
    beforeEach(() => {
      cy.loadStory('Default/EmptyData');
    });

    it('should have correct input validation notification on save', () => {
      cy.get('button[type=submit]').click();
      cy.getBySel('notification').as('NOTIFICATION')
      cy.get('@NOTIFICATION').find('> div:first-child').should('have.text', 'Field full name is required');
      cy.get('@NOTIFICATION').find('> div:last-child').should('have.text', 'Field phone is required');
    });
  });
});