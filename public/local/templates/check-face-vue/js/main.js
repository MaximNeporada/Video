"use strict";

function hoverLinkZones() {
  var arrLinks = document.querySelectorAll(".zones-block__link");
  arrLinks.forEach(function(element) {
    element.addEventListener("mouseenter", function() {
      var parent = element.parentElement;
      var allLink = parent.querySelectorAll(".zones-block__link");
      allLink.forEach(function(element) {
        element.classList.add("hover");
      });
    });
    element.addEventListener("mouseleave", function() {
      var parent = element.parentElement;
      var allLink = parent.querySelectorAll(".zones-block__link");
      allLink.forEach(function(element) {
        element.classList.remove("hover");
      });
    });
  });
}

function eventdontShowScroll() {
  var parent = document.querySelector(".v-web__cotainer");
  var child = document.querySelector(".v-web__container-scroll");
  child.style.paddingRight = child.offsetWidth - child.clientWidth + "px";
}

function eventLinkClick() {
  var arrLinksZone = document.querySelectorAll(".zones-block__link");
  var arrLinksOther = document.querySelectorAll(".v-other-menu__button");
  arrLinksZone.forEach(function(element) {
    element.addEventListener("click", function() {
      linkClick(this);
    });
  });
  arrLinksOther.forEach(function(element) {
    element.addEventListener("click", function() {
      linkClick(this);
    });
  });
}

function linkClick(link) {
  linkRemoveClassSelected();
  var parent = link.parentElement;
  var arrPopups = document.querySelectorAll(".v-trainin__popups-container");
  console.log(parent);
  console.log("parent ^");
  var parentData = parent.getAttribute("data-zone");
  arrPopups.forEach(function(element) {
    var elementData = element.getAttribute("data-zone-popup");
    console.log(elementData);

    if (elementData === parentData) {
      console.log(element);
      eventPopupOpen(element);
    }
  });
  parent.classList.add("selected");
}

function linkRemoveClassSelected() {
  var arrLinksZone = document.querySelectorAll(".zones__block.selected");
  var arrLinksOther = document.querySelectorAll(".v-other-menu__item.selected");

  if (arrLinksZone.length > 0) {
    arrLinksZone.forEach(function(element) {
      element.classList.remove("selected");
    });
  }

  if (arrLinksOther.length > 0) {
    arrLinksOther.forEach(function(element) {
      element.classList.remove("selected");
    });
  }
}

function eventPopupOpen(popupContainer) {
  closeAllPopup();
  var vPopupWrapper = document.querySelector(".v-trainin__popups");
  vPopupWrapper.classList.add("active");
  popupContainer.classList.add("show");

  if (window.innerWidth < 768) {
    var scrollTopElement = popupContainer.offsetTop;
    console.log(scrollTopElement);
    window.scrollTo({
      top: scrollTopElement,
      behavior: "smooth"
    });
  }
}

function eventPopupCLose() {
  var vPopupWrapper = document.querySelector(".v-trainin__popups");
  vPopupWrapper.addEventListener("click", function(e) {
    var target = e.target;

    if (target === vPopupWrapper) {
      closeAllPopup();
    }
  });

  window.onkeydown = function(event) {
    if (event.keyCode == 27) {
      closeAllPopup();
    }
  };
}

function closeAllPopup() {
  var vPopupWrapper = document.querySelector(".v-trainin__popups");
  var arrPopups = document.querySelectorAll(".v-trainin__popups-container");
  arrPopups.forEach(function(element) {
    element.classList.remove("show");
  });
  vPopupWrapper.classList.remove("active");
  linkRemoveClassSelected();
}

function eventScrollOnPopup() {
  var arrScrollElement = document.querySelectorAll(".js-scroll-element");
  arrScrollElement.forEach(function(element) {
    var parent = element.parentNode;
    var buttonBottom = parent.querySelector(".v-web__btn--scroll-bottom");
    var buttonTop = parent.querySelector(".v-web__btn--scroll-top");
    console.log(parent);
    console.log(buttonTop);
    console.log(buttonBottom);
    element.addEventListener("scroll", function(e) {
      var scrolled = element.scrollTop;
      console.log(scrolled);

      if (scrolled <= 50) {
        buttonBottom.classList.add("active");
        buttonTop.classList.remove("active");
      } else if (scrolled >= element.scrollHeight - element.offsetHeight - 50) {
        buttonBottom.classList.remove("active");
        buttonTop.classList.add("active");
      } else {
        buttonBottom.classList.add("active");
        buttonTop.classList.add("active");
      }
    });
    buttonBottom.addEventListener("click", function() {
      var scrollTopElement = element.scrollTop + element.offsetHeight - 50;
      scrollTopElement > element.scrollHeight
        ? (scrollTopElement = element.scrollHeight - element.offsetHeight)
        : scrollTopElement;
      console.log(scrollTopElement);
      element.scrollTo({
        top: scrollTopElement,
        behavior: "smooth"
      });
    });
    buttonTop.addEventListener("click", function() {
      var scrollTopElement = element.scrollTop - element.offsetHeight;
      scrollTopElement < 0 ? (scrollTopElement = 0) : scrollTopElement;
      console.log(scrollTopElement);
      element.scrollTo({
        top: scrollTopElement,
        behavior: "smooth"
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  eventScrollOnPopup();
  eventLinkClick();
  eventPopupCLose();
  hoverLinkZones();
  eventdontShowScroll();
});
