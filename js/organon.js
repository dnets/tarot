// The Tarot Organon by Dmitry Nets (http://github.com/dnets)
// Uh oh, global stuff
var deck = {
  // Populate deck with cards in sequence via array returned from IIFE
  cards: (function() {
    var arr = [];
    for (var i = 0, len = 77; i <= len; i++) { arr.push(i); }
    return arr;
  })(),

  shuffle: function() {
    var j, x, i;
    for (i = this.cards.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = this.cards[i - 1];
        this.cards[i - 1] = this.cards[j];
        this.cards[j] = x;
    }
  },

  reset: function() {
    this.populate();
    this.shuffle(this.cards);
  },

  populate: function() {
    var incubator = [];
    for (var i = 0, len = 77; i <= len; i++) { incubator.push(i); }
    this.cards = incubator;
  },

  getCard: function (arcanum) {
    if (arcanum) {
      var buffer;
      do { buffer = this.cards.pop(); } while(buffer > 21);
      return buffer;
    } else {
      return this.cards.pop();
    }
  }
};

function drawCard(db, e, top, left) {
  console.log(e.parent().parent().find('li').length);
  var card;
  var cardholder = $('.primal').clone(true);
  if (e.hasClass('organon-arcanum')) {
    card = deck.getCard(true);
  } else {
    card = deck.getCard();
  }
  cardholder.removeClass('primal');
  cardholder.find('img.organon-card-front').attr({
    'src': './img/small/'+db[card].img,
    'data-toggle': 'modal',
    'data-target': '#cardModal',
    'data-card-id': card
  });
  cardholder.show();
  var offset = e.data('cardno')-1;
  cardholder.appendTo($('.organon-spread'));
  cardholder.animate({
    top: top+20,
    left: (left + (215 * (e.data('cardno')-1))-offset)
  });
  $.when(cardholder.find('.organon-card').addClass('flipped')).done(function() {
    e.removeClass('empty');
  });
}

function resetSpread(e) {
  deck.reset();
  $('.organon-card').removeClass('flipped');
  $('.organon-placeholder').removeClass('empty');
  if (e) {
    switch(e.parent().find('li').length) {
      case 1:
        $('.organon-deck-stack,.organon-card-holder').animate({left: '610', top: '40'});
        break;
      case 3:
        $('.organon-deck-stack,.organon-card-holder').animate({left: '820', top: '40'});
        break;
      case 4:
        $('.organon-deck-stack,.organon-card-holder').animate({left: '400', top: '380'});
        break;
    }
  } else {
  }
  $.when($('.organon-deck-stack,.organon-card-holder').animate({left: '+=0'})).done(function() {
    $('.organon-placeholder').addClass('empty');
    $('.organon-card-holder').not('.primal').remove();
  });
  // $('.organon-card-holder').not('.primal').remove();
}

function logCards() {
  console.log(deck.cards);
  console.log(deck.cards.length + ' cards left in the deck.');
}

function populateModal(cardDB, id, target) {
  // Populate modal title
  if (cardDB[id].suit === 'Trump') {
    $(target+' h4.modal-title').text(cardDB[id].number+' - '+cardDB[id].name);
  } else {
    $(target+' h4.modal-title').text(cardDB[id].name);
  }
  // Populate keywords
  $(target+' .modal-keywords').children().remove();
  $.each(cardDB[id].description.keywords, function(i,value) {
    $('<li><i class="fa fa-circle"></i>'+value+'</li>').appendTo(target+' .modal-keywords');
  });
  // Populate image
  $(target+' .modal-image').attr('src','./img/small/'+cardDB[id].img);
  // Populate descriptions
  // Archetype
  if (cardDB[id].description.Archetype) {
    $(target+' .modal-archetype .modal-description').text(cardDB[id].description.Archetype);
    $(target+' .modal-archetype').show();
  } else {
    $(target+' .modal-archetype').hide();
  }
  // Numerology
  if (cardDB[id].description.Numerology) {
    $(target+' .modal-numerology .modal-description').text(cardDB[id].description.Numerology);
    $(target+' .modal-numerology').show();
  } else {
    $(target+' .modal-numerology').hide();
  }
  // Planetary/Astrological/Elemental
  if (cardDB[id].description['Planetary/Astrological/Elemental']) {
    $(target+' .modal-planetary .modal-description').text(cardDB[id].description['Planetary/Astrological/Elemental']);
    $(target+' .modal-planetary').show();
  } else {
    $(target+' .modal-planetary').hide();
  }
  // Mythical/Spiritual
  if (cardDB[id].description['Mythical/Spiritual']) {
    $(target+' .modal-mythical .modal-description').text(cardDB[id].description['Mythical/Spiritual']);
    $(target+' .modal-mythical').show();
  } else {
    $(target+' .modal-mythical').hide();
  }
  // Personality
  if (cardDB[id].description.Personality) {
    $(target+' .modal-personality .modal-description').text(cardDB[id].description.Personality);
    $(target+' .modal-personality').show();
  } else {
    $(target+' .modal-personality').hide();
  }
  // Elemental
  if (cardDB[id].description.Elemental) {
    $(target+' .modal-elemental .modal-description').text(cardDB[id].description.Elemental);
    $(target+' .modal-elemental').show();
  } else {
    $(target+' .modal-elemental').hide();
  }
  // Astrology
  if (cardDB[id].description.Astrology) {
    $(target+' .modal-astrology .modal-description').text(cardDB[id].description.Astrology);
    $(target+' .modal-astrology').show();
  } else {
    $(target+' .modal-astrology').hide();
  }
  // Affirmation
  if (cardDB[id].description.Affirmation) {
    $(target+' .modal-affirmation .modal-description').text(cardDB[id].description.Affirmation);
    $(target+' .modal-affirmation').show();
  } else {
    $(target+' .modal-affirmation').hide();
  }
  // Hebrew Alphabet
  if (cardDB[id].description['Hebrew Alphabet']) {
    $(target+' .modal-hebrew .modal-description').text(cardDB[id].description['Hebrew Alphabet']);
    $(target+' .modal-hebrew').show();
  } else {
    $(target+' .modal-hebrew').hide();
  }
  // When?
  if (cardDB[id].description['When?']) {
    $(target+' .modal-when .modal-description').text(cardDB[id].description['When?']);
    $(target+' .modal-when').show();
  } else {
    $(target+' .modal-when').hide();
  }
  $(target+' .modal-light .modal-description').text(cardDB[id].description.Light);
  $(target+' .modal-shadow .modal-description').text(cardDB[id].description.Shadow);
  $(target+' .modal-story .modal-description').text(cardDB[id].description.Story);
  $(target+' .modal-relationships .modal-description').text(cardDB[id].description.Relationships);
  $(target+' .modal-work .modal-description').text(cardDB[id].description.Work);
  $(target+' .modal-spirituality .modal-description').text(cardDB[id].description.Spirituality);
  $(target+' .modal-personal .modal-description').text(cardDB[id].description['Personal Growth']);
  $(target+' .modal-fortune .modal-description').text(cardDB[id].description['Fortune Telling']);
  // Populate keywords
  $(target+' .modal-questions ul').children().remove();
  $.each(cardDB[id].description['Questions to Ask'], function(i,value) {
    $('<li><i class="fa fa-circle"></i>'+value+'</li>').appendTo(target+' .modal-questions ul');
  });
  // Populate Symbols and Insights
  $(target+' .modal-symbols tbody').children().remove();
  $.each(cardDB[id].description['Symbols and Insights'], function(key,value) {
    $('<tr><td>'+key+'</td><td>'+value+'</td></tr>').appendTo(target+' .modal-symbols tbody');
  });
}
$(function() {

  $('.organon-card-holder').on('click', function() {
    $(this).find('.organon-card').addClass('flipped');
  });

  var spreads = $('.organon-spread ul');
  $('.navbar-header p').on('click', function(e) {
    resetSpread();
    console.log('Header click');
    $('.navbar-spread li').removeClass('organon-spread-active');
    $('.organon-spread ul').fadeOut({duration: 500});
    $('.organon-deck-stack,.organon-card-holder').animate({left: '400',top: '40'});
  });

  $('.navbar-spread li').on('click', function(e) {
    if (!$(this).hasClass('organon-spread-active')) {
      switch($(this).data('spread')) {
        case 0:
          $('.organon-deck-stack,.organon-card-holder').animate({left: '610', top: '40'});
          break;
        case 1:
          $('.organon-deck-stack,.organon-card-holder').animate({left: '820', top: '40'});
          break;
        case 2:
          $('.organon-deck-stack,.organon-card-holder').animate({left: '400', top: '380'});
          break;
      }
      $(this).toggleClass('organon-spread-active');
      $(this).siblings().removeClass('organon-spread-active');
      resetSpread();
    }
    // jQuery get id from data attribute and toggle spread visibility
    spreads.eq($(this).data('spread')).fadeIn({duration: 500}).siblings().fadeOut({duration: 500});
    $('.organon-reset').show();
  });

  $('.organon-placeholder').on('click', function(e) {
    var startTop = $(this).parent().parent().position().top;
    var startLeft = $(this).parent().parent().position().left;
    if ($(this).hasClass('empty')) {
      drawCard(cardDB,$(this),startTop,startLeft);
    }
  });

  $('.organon-reset').on('click', function(e) {
    resetSpread($(this));
  });



  // Populate Encyclopedia
  // Major Arcana
  $.each(cardDB, function(index,card) {
    switch(card.suit) {
      case 'Trump':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal">'+card.number+' - '+card.name+'</a></li>').appendTo('ul.encyclopedia-list-trumps');
        break;
      case 'Wands':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-wands');
        break;
      case 'Cups':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-cups');
        break;
      case 'Swords':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-swords');
        break;
      case 'Coins':
        $('<li><a href="" data-card-id="'+card.id+'" data-dismiss="modal" data-toggle="modal" data-target="#cardModal"><i class="fa fa-circle"></i>'+card.name+'</a></li>').appendTo('.encyclopedia-list-coins');
        break;
    }
  });
  // Populate Modal with card info
  $('.organon-card-front, .encyclopedia-list ul a').on('click', function(e) {
    var id = $(this).data('card-id');
    console.log(id);
    populateModal(cardDB, id, '#cardModal');
  });

  // Double modal scrollbar fix
  $('#cardModal, #encyclopedia').on('hidden.bs.modal', function (e) {
    if($('.modal.in').css('display') === 'block'){
      $('body').addClass('modal-open');
    }
  });
  // $('#cardModal').on('hidden.bs.modal', function (e) {
    // if($('.modal.in').css('display') === 'block'){
      // $('body').addClass('modal-open');
    // }
  // });
});
