

export function navigation() {
  const navlink = document.querySelector("[role=navigation]");

  navlink.onclick = function () {
    this.classList.toggle("active");
    document.body.classList.toggle('nav-open');
  };



}
