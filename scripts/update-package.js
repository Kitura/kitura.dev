var release;
var kituraRelease;
getLatestKituraRelease();

if (localStorage.getItem('package') !== "") {
  getLatestRelease(localStorage.getItem('package'));
}

async function getLatestRelease(packageName) {
  const http = new XMLHttpRequest();
  const url = "https://api.github.com/repos/IBM-Swift/" + packageName + "/releases/latest";
  http.open("GET", url);
  http.send();

  http.onreadystatechange = await async function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(http.responseText);
      release = obj.name;
      await updatePackage(packageName, release);
    }
  }
}

function updatePackage(packageName, version) {
  var packageValues = document.getElementsByClassName('package-value');
  for (var x = 0; x < packageValues.length; x++) {
    console.log(packageValues[x]);
    packageValues[x].innerText = (".package(url: \"https://github.com/IBM-Swift/" + packageName + ".git\", from: \"" + version + "\"),");
  }

  var dependencyName;

  if (packageName.includes("-")) {
    dependencyName = packageName.replace("-", "");
  } else {
    dependencyName = packageName;
  }

  var title = document.getElementById('title');
  title.innerText = "Adding " + dependencyName + " To A Kitura App";

  var dependencyValues = document.getElementsByClassName('dependency-value');
  console.log(dependencyValues);
  for (var y = 0; y < dependencyValues.length; y++) {
    dependencyValues[y].innerText = ".target(name: \"MyKituraApp\", dependencies: [\"Kitura\", \"" + dependencyName + "\"]),"
  }
}

function getLatestKituraRelease() {
  const http = new XMLHttpRequest();
  const url = "https://api.github.com/repos/IBM-Swift/Kitura/releases/latest";
  http.open("GET", url);
  http.send();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(http.responseText);
      kituraRelease = obj.name;
      updateToLatestKituraRelease();
    }
  }
}

function updateToLatestKituraRelease() {
  var element = document.getElementById('kitura');
  element.innerText = (".package(url: \"https://github.com/IBM-Swift/Kitura.git\", from: \"" + kituraRelease + "\"),");
}
