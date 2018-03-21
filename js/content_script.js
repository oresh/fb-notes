// Sending a request from a content script
/*
chrome.extension.sendMessage({msg: "I'm content-script"}, function (response) {
    console.log(response);
});
*/

class Score {
  constructor() {
    this.score = 0;
  }
  checkTitle() {
    let titleScore = 0;
    const good = ["developer","engineer","lead","architect","senior","software","front-end","web"];
    const bad = ["q&a","qa","manager","ceo","designer","ict","sales","quality","assurance"];
    const title = document.getElementsByClassName("pv-top-card-section__headline")[0].innerText;
    const words = title.split(' ');
    words.forEach(_=>{
      
    });
  }
  checkExperience() {

  }
  checkSkills() {

  }
  checkCompany() {

  }
  calcScore() {
    checkTitle();
    checkExperience();
    checkSkills();
    checkCompany();
    return this.score;
  }
}

(function() {
  var init = function() {
    addEmails();
    addFacebookBtn();
  }

  var addFacebookBtn = function() {
    console.log('!@!@$???');
    var $name = document.querySelectorAll('.pv-top-card-section__name');
    var name = $name[0].innerText.split(' ');

    var img = document.querySelectorAll('.pv-top-card-section__image');
    var imgUrl = img[0].getAttribute('src');
    var url = 'https://www.facebook.com/search/str/' + name.join('%2B') + '/keywords_users?linkedin_photo=' + imgUrl;

    var facebookBtn = document.createElement("a");
    var facebookText = document.createTextNode("facebook");
    facebookBtn.appendChild(facebookText);
    facebookBtn.classList.add('facebook-search');
    facebookBtn.setAttribute('href', url);
    facebookBtn.setAttribute('target', '_blank');

    $name[0].appendChild(facebookBtn);
  }

  var addEmails = function() {
    var full_name = document.getElementsByClassName("pv-top-card-section__name")[0].innerText;
    var first_name = full_name.split(' ')[0].toLowerCase();
    var last_name = full_name.split(' ').pop().toLowerCase();

    console.log('I Work!');
    var combinations = [];
    var providers = ['@gmail.com','@yahoo.com'];
    providers.forEach(provider => {
        combinations.push( first_name[0] + last_name + provider );
        combinations.push( first_name + last_name[0] + provider );
        combinations.push( first_name + last_name + provider );
        combinations.push( first_name + '.' + last_name + provider );
        combinations.push( first_name + '_' + last_name + provider );
        combinations.push( last_name + provider );
    });

    var contacter = document.getElementsByClassName("pv-profile-section pv-contact-info artdeco-container-card ember-view")[0];
    contacter.innerHTML += '<div class="email-checks">' + combinations.join('\n') + '</div>';
  }

  var displayImage = function() {
    if (window.location.search.indexOf('?linkedin_photo=') == 0) {
      setTimeout(function() {
        var photo = window.location.search.split('?linkedin_photo=')[1];
        var photo_split = photo.split('&');
        if (photo_split.length > 1) {
          photo = photo_split[0];
        }
        photo = photo.replace('shrink_100_100', 'shrinknp_400_400');
        var block = document.querySelectorAll('._4-u2._5v6e._4-u8')[0];
        if (!block) {
          block = document.querySelectorAll('._4-u2._19ah._2ph_._4-u8')[0];
        }

        var photoBlock = document.createElement("img");
        photoBlock.classList.add('linkedin_photo_block');
        photoBlock.setAttribute('src', photo);
        block.appendChild(photoBlock);
      }, 500);
    }
  }

  if (window.location.host == "www.linkedin.com") {
    setTimeout(init, 4000);
  }

  if (window.location.host == "www.facebook.com") {
    init();
  }

})();