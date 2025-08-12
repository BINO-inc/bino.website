
document.addEventListener("DOMContentLoaded", function() {
    const navUl = document.querySelector("nav ul");
    const menuIcon = document.createElement("div");
    menuIcon.classList.add("menu-icon");
    menuIcon.innerHTML = "<i class=\"fas fa-bars\"></i>";
    
    // Find the nav element and insert the menu icon before the ul
    const nav = document.querySelector("nav");
    if (nav) {
        nav.insertBefore(menuIcon, navUl);
    }

    menuIcon.addEventListener("click", function() {
        navUl.classList.toggle("active");
        if (navUl.classList.contains("active")) {
            menuIcon.innerHTML = "<i class=\"fas fa-times\"></i>";
        } else {
            menuIcon.innerHTML = "<i class=\"fas fa-bars\"></i>";
        }
    });
});
