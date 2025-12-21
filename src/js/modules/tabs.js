function tabs(tabsSelector, tabsContentSel, tabsParentSel, tabsActive) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSel),
    tabsParent = document.querySelector(tabsParentSel);
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
      item.classList.remove("fade");
    });
    tabs.forEach((tab) => {
      tab.classList.remove(tabsActive);
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabsContent[i].classList.add("fade");
    tabs[i].classList.add(tabsActive);
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabsActive.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
export default tabs;
