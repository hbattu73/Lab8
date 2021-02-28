describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number')
      .clear()
      .type('75');
    cy.get('#volume-slider')
      .then(($el) => {
        expect($el).to.have.value(75);
      });
  });

  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider')
      .invoke('val', 33)
      .trigger('input');
    cy.get('#volume-number')
      .then(($el) => {
        expect($el).to.have.value(33);
      });
  });

  it('Audio volume changes when slider changes', () => {
    cy.get('#volume-slider')
      .invoke('val', 33)
      .trigger('input');
    cy.get('audio')
      .then(($el) => {
        expect($el).to.have.prop('volume', 0.33);
    });
  });

  it('Image and sound sources change when party horn radio button is selected', () => {
    cy.get('#radio-party-horn')
      .check();
    cy.get('#horn-sound')
      .then(($el) => {
        expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
      });
    cy.get('#sound-image')
      .then(($el) => {
        expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
      });
  });

  it('Volume image changes when increasing volumes(test for all 3 cases)', () => {
    // vol > 66
    cy.get('#volume-slider')
      .invoke('val', 67)
      .trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src','./assets/media/icons/volume-level-3.svg');
      });
    // vol > 33
    cy.get('#volume-slider')
      .invoke('val', 34)
      .trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src','./assets/media/icons/volume-level-2.svg');
      });
    // vol > 0
    cy.get('#volume-slider')
      .invoke('val', 1)
      .trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src','./assets/media/icons/volume-level-1.svg');
      });
    // else 
    cy.get('#volume-slider')
      .invoke('val', 0)
      .trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src','./assets/media/icons/volume-level-0.svg');
      });
  });

  it('Honk button is disabled when volume input is empty/non-number', () => {
    // input is non-number
    cy.get('#volume-number')
      .clear()
      .type('non-number');
    cy.get('#honk-btn')
      .then(($el) => {
        expect($el).to.have.prop('disabled', true);
      });
    // input is empty  
    cy.get('#volume-number')
      .clear();
    cy.get('#honk-btn')
      .then(($el) => {
      expect($el).to.have.prop('disabled', true);
      });
    });

    it('Error shown volume input is outside of given range', () => {
      // input < 0
      cy.get('#volume-number')
        .clear()
        .type(-1);
      cy.get('#volume-number')
        .then(($el) => {
          expect($el).to.match(':invalid')
        });
      // input > 100
      cy.get('#volume-number')
        .clear()
        .type(101);
      cy.get('#volume-number')
        .then(($el) => {
          expect($el).to.match(':invalid')
      });
    });  
});
