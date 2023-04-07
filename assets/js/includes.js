function getFile(file, elmnt){
  xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "";}
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
}

let header = document.querySelector("header");
header && getFile("./header.html",header);

let pageLoader = document.createElement("div");
pageLoader.classList.add('page-loader');
getFile("./page-loader.html",pageLoader);
header && header.before(pageLoader);

let stickyHeader = document.createElement("div");
stickyHeader.classList.add('sticky-header');
stickyHeader.classList.add('flex');
getFile("./header-sticky.html",stickyHeader);
header && header.after(stickyHeader);

let responsiveHeader = document.createElement("div");
responsiveHeader.classList.add('rspns-hdr');
getFile("./header-responsive.html",responsiveHeader);
stickyHeader.after(responsiveHeader);

let footer = document.querySelector("footer");
footer && getFile("./footer.html",footer);

let footerNewsletter = document.createElement("section");
getFile("./footer-newsletter.html",footerNewsletter);
footer && footer.before(footerNewsletter);
