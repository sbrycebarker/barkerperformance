$(document).ready(function() {
  console.log("jQuery ready")
  window.onclick = function() {
    document.getElementById("myDropdown").classList.toggle("show")
  }

  window.onclick = function(event) {
    var Dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdown.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
      }
    }
  }
})
