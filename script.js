let navbarBurger = document.getElementById('navbar-burger');
// navbarBurger.addEventListener('click', closeNavbar);

document.addEventListener('click', (event) => {
  console.log(event.target.classList);
  if (navbarBurger.classList.contains('is-active')) {
    console.log("active");
    //check whether you are still clicking in one of the navbar components
    if (!event.target.classList.contains('navbar-menu') && !event.target.classList.contains('navbar-item')) {
      toggleNavbar();
    }
  }
  // Navbar is not already active so check if user is clicking on the navbar
  else {
    if (event.target.classList.contains('navbar-burger')){
      toggleNavbar();
    }
  }
  
})

function toggleNavbar () {
  const target = navbarBurger.dataset.target;
  const $target = document.getElementById(target);

  navbarBurger.classList.toggle('is-active');
  $target.classList.toggle('is-active');
}