var release;

if (localStorage.getItem('package') !== "") {
  getLatestRelease(localStorage.getItem('package'));
}

function getLatestRelease(packageName) {
  console.log(packageName);
  const http = new XMLHttpRequest();
  const url = "https://api.github.com/repos/IBM-Swift/" + packageName + "/releases/latest";
  http.open("GET", url);
  http.send();

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(http.responseText);
      release = obj.name;
      updatePackage(packageName, release);
    }
  }
}

function updatePackage(packageName, version) {
  var package = document.getElementById('package');
  package.innerText = (".package(url: \"https://github.com/IBM-Swift/" + packageName + ".git\", from: \"" + version + "\"),");

  var dependencyName;

  if (packageName.includes("-")) {
    dependencyName = packageName.replace("-", "");
  } else {
    dependencyName = packageName;
  }

  var title = document.getElementById('title');
  title.innerText = "Adding " + dependencyName + " to your Kitura App";

  var dependency = document.getElementById('dependency');
  dependency.innerText = ".target(name: \"MyKituraApp\", dependencies: [\"Kitura\", \"" + dependencyName + "\"]),"
}
