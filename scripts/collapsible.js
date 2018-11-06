var coll = document.getElementsByClassName("collapsible");
var i;
var currentPage;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function loadPage(src) {
  localStorage.setItem("src", src);
  document.getElementById('doc-window').setAttribute('src', src);
}

if (localStorage.getItem("src") === "null") {
  localStorage.setItem("src", './docs/kitura-cli.html');
}
loadPage(localStorage.getItem("src"));


function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
