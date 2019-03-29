addCopyFunction();

function removeActiveSidebarElementForParent() {
  var parentSelectables = parent.document.getElementsByClassName('selectable');
  for (var j = 0; j < parentSelectables.length; j++) {
    if (parentSelectables[j].classList.contains('active')) {
      parentSelectables[j].classList.remove('active');
    }
  }
}

function setActiveSidebarElementForParent(id) {
  removeActiveSidebarElementForParent()
  localStorage.setItem("id", id);
  parent.document.getElementById(id).classList.add('active');
}

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
