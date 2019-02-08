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
  var codeSamples = document.getElementsByClassName("language-swift");
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
      label.innerText = "Copied to clipboard";
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
