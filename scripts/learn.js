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

addCollapsibleElements();


window.addEventListener('scroll', function() {
  var target = document.getElementById('top-page');
  //TODO: Make this perform better
  if (window.pageYOffset > 500) {
    target.style.display = "block"
  } else if (window.pageYOffset < 500) {
    target.style.display = "none";
  }
}, false);

function showSidebar() {
  var docSidebar = document.getElementById('sidebar');
  var docWindow = document.getElementById('doc-container');
  if (docSidebar.style.display == 'block') {
    docSidebar.style.display = 'none';
    docWindow.style.display = 'block';
  } else {
    docWindow.style.display = 'none';
    docSidebar.style.display = 'block';
  }
}
