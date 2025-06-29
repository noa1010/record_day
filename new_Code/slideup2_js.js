window.addEventListener("scroll", function() {
  var navbar = document.getElementById("myNavBar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});