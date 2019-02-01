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
