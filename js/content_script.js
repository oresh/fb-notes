// Sending a request from a content script
/*
chrome.extension.sendMessage({msg: "I'm content-script"}, function (response) {
    console.log(response);
});
*/

(function() {

  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
      do {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {};
      } while ((i < 0) && (el = el.parentElement)); 
      return el;
    };
  }

  var getNotes = function (userName) {
    return localStorage.getItem('notes_' + userName) || '';
  }

  var getUser = function (target) {
    if (target) {
      var link = target.closest("._5l-3._1ht1").querySelectorAll('._5l-3._1ht5')[0];   
    } else {
      var link = document.querySelectorAll('._5l-3._1ht1._1ht2')[0].querySelectorAll('._5l-3._1ht5')[0];
    }
    if (link) {
      var href = link.getAttribute('id');
      if (href.indexOf('row_header_id_thread') != -1) {
        return href.split('row_header_id_thread:')[1];
      } else {
        return href.split('row_header_id_user:')[1];
      }
    }
    return false;
  }

  var showNotes = function (target) {
    var userName = getUser(target);
    if (!userName) return;
    var userNotes = getNotes(userName);
    createNote(userNotes);
  }

  var createNote = function (text) {
    var currentTextarea = document.querySelectorAll('.notes-textarea')[0];
    if (currentTextarea) {
      currentTextarea.value = text;
    } else {
      var button = document.querySelectorAll('.notes-toggle-btn');
      var parent = button[0].parentNode;
      var notes = document.createElement("textarea");
      notes.value = text;
      notes.classList.add('notes-textarea');
      notes.addEventListener('keyup', saveNotes);
      parent.appendChild(notes);
    }
  }

  var removeCurrentNotes = function () {
    var textarea = document.querySelectorAll('.notes-textarea')[0];
    textarea.parentNode.removeChild(textarea);
  }

  var saveNotes = function () {
    var textareaText = document.querySelectorAll('.notes-textarea')[0].value;
    var userName = getUser();
    localStorage.setItem('notes_' + userName, textareaText);
  }

  var toggleNotes = function () {
    var textarea = document.querySelectorAll('.notes-textarea')[0];
    if (textarea) {
      if (textarea.style.display == 'none') {
        textarea.style.display = 'block';
        showNotes();
      } else {
        textarea.style.display = 'none';
      }
    } else {
      showNotes();
    }
  }

  var addNotesBtn  = function () {
    var conversationList = document.querySelectorAll('.uiScrollableAreaContent')[0];
    conversationList.addEventListener('click', function(e) {
      showNotes(e.target);
    });

    var sidebarItems = document.querySelectorAll('._3szn._3szo')
    var parent = sidebarItems[0].parentNode;
    var notesBtn = document.createElement("div");
    var notesText = document.createTextNode("Notes");

    notesBtn.appendChild(notesText);
    notesBtn.classList.add('notes-toggle-btn');
    notesBtn.addEventListener('click', function(e) {
      toggleNotes();
    });
    parent.appendChild(notesBtn);
  }

  window.addEventListener('load', function() {
    addNotesBtn();
  });


})();