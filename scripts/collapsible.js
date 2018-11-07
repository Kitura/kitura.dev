var coll = document.getElementsByClassName("collapsible");
var items = document.getElementsByClassName('nested-sidebar-list');
var i;
var currentPage;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      for (var j = 0; j < items.length; j++) {
        if (items[j].style.display === "block" && items[j] !== content) {
          items[j].style.display = "none";
        }
      }
      content.style.display = "block";
    }
  });
}

function loadPage(src, id) {
  localStorage.setItem("src", src);
  localStorage.setItem("id", id);
  var selectables = document.getElementsByClassName('selectable');

  for (var j = 0; j < selectables.length; j++) {
    if (selectables[j].classList.contains('active')) {
      selectables[j].classList.remove('active')
    }
  }

  document.getElementById(id).classList.add('active');

  document.getElementById('doc-window').setAttribute('src', src);
}

if (localStorage.getItem("src") === "null") {
  localStorage.setItem("src", './docs/kitura-cli.html');
  localStorage.setItem("id", 'kitura-cli');
}
loadPage(localStorage.getItem("src"), localStorage.getItem("id"));


function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
