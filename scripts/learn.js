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

addCopyFunction();

function addCopyFunction() {
  var codeSamples = document.getElementsByTagName("pre");
  for (var x = 0; x < codeSamples.length; x++) {
    codeSamples[x].addEventListener("dblclick", function() {
      const el = document.createElement('textarea');
      document.body.appendChild(el);
      el.value = this.textContent;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      const label = document.createElement('label');
      this.appendChild(label);
      label.classList.add("copy-label");
      label.innerText = "Copied to clipboard.";
      label.id = "popup-label";
      setTimeout( function() {
        const oldLabel = document.getElementById("popup-label");
        oldLabel.parentNode.removeChild(label);
      }, 2000);
      console.log(label);
    });

    codeSamples[x].addEventListener('animationend', function() {
      console.log("Here");
      var popup = document.getElementById('popup');
    });
  }
}

function removePopup() {
  var popup = document.getElementById('popup');
  popup.style.display = "none";
}

function openPlugin(pluginName, groupName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    if (tabcontent[i].className.includes(groupName)) {
      tabcontent[i].style.display = "none";
    }
    if (tabcontent[i].className.includes(pluginName)) {
        tabcontent[i].style.display = "block";
    }
  }

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    if (tablinks[i].className.includes(groupName)) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (tablinks[i].className.includes(pluginName)) {
        tablinks[i].className += " active";
    }
  }

  parent.document.getElementById('doc-window').style.height = document.body.offsetHeight + 'px';
}

function setIntialTab(pluginName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    if (tabcontent[i].className.includes(pluginName)) {
      tabcontent[i].style.display = "block";
    }
  }

  tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      if (tablinks[i].className.includes(pluginName)) {
        tablinks[i].className += " active";
      }
    }
}

