var selectables = document.getElementsByClassName('selectable');
var api;
var elementID;

addCollapsibleElements();
if (localStorage.getItem("src") == undefined) {
  loadPage('./docs/landing.html', '', 'https://ibm-swift.github.io/Kitura/');
} else {
  loadPage(localStorage.getItem("src"), localStorage.getItem("id"), localStorage.getItem("api"));
}

function resizeIframe() {
  document.getElementById('doc-window').style.height = document.getElementById('doc-window').contentWindow.document.body.offsetHeight + 'px';
}


// Adds a nested element to any element that has the `collapsible` class.
function addCollapsibleElements() {
  var coll = document.getElementsByClassName('collapsible');
  var items = document.getElementsByClassName('nested-sidebar-list');
  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
        for (var j = 0; j < items.length; j++) {
          items[j].addEventListener("click", function() {
            if (document.documentElement.clientWidth <= 900) {
              var docSidebar = document.getElementById('sidebar');
              docSidebar.style.display = 'none';
              var docWindow = document.getElementById('doc-container');
              docWindow.style.display = 'block';
            }
          })
          if (items[j].style.maxHeight !== null && items[j] !== content) {
            items[j].style.maxHeight = null;
          }
        }
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

// Assigns the `active` class to the currently selected sidebar element.
function removeActiveSidebarElement() {
  for (var j = 0; j < selectables.length; j++) {
    if (selectables[j].classList.contains('active')) {
      selectables[j].classList.remove('active');
    }
  }
}

function loadPage(src, id, api) {
  localStorage.setItem("src", src);
  localStorage.setItem("id", id);
  localStorage.setItem("api", api);
  removeActiveSidebarElement();
  if (id !== "") {
    document.getElementById(id).classList.add('active');
  }
  if (src !== "") {
    document.getElementById('doc-window').setAttribute('src', src);
  }
  var button = document.getElementById('api-button');
  button.setAttribute('onclick', "window.open('" + localStorage.getItem('api') + "')");
}
