function tabsFun(tabsSelector, tabsContentSel, tabsParentSel, tabsActive) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSel),
    tabsParent = document.querySelector(tabsParentSel);
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("fade");
      item.classList.remove("show");
    });
    tabs.forEach((tab) => {
      tab.classList.remove(tabsActive);
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show");
    tabsContent[i].classList.add("fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(tabsActive);
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && !target.classList.contains(tabsActive)) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
export default tabsFun;
