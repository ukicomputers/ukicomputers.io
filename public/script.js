class scrollPages {
    constructor(container) {
        this.container = container;

        this.container.addEventListener("wheel", ({ wheelDelta }) => {
            if (wheelDelta < 0) this.openNext();
            else this.openPrev();
        });

        this.hammer = new Hammer(this.container);
        this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });
        this.hammer.on("swipeup", () => this.openNext());
        this.hammer.on("swipedown", () => this.openPrev());

        window.addEventListener("keydown", ({ key }) => {
            if (key === "ArrowDown") this.openNext();
            if (key === "ArrowUp") this.openPrev();
        });

        this.updateView();
    }

    _currentPageIndex = 0;

    get currentPageIndex() {
        return this._currentPageIndex;
    }

    set currentPageIndex(index) {
        this._currentPageIndex = index;
        this.updateView();
    }

    get pages() {
        return [...this.container.querySelectorAll(".hero"), ...this.container.querySelectorAll(".dpPage"), ...this.container.querySelectorAll(".mp"), ...this.container.querySelectorAll(".bbl")].map(elem => ({ elem }));
    }

    openNext() {
        let nextIndex = this.currentPageIndex + 1;
        if (nextIndex <= this.pages.length - 1) this.currentPageIndex = nextIndex;
    }

    openPrev() {
        let prevIndex = this.currentPageIndex - 1;
        if (prevIndex >= 0) this.currentPageIndex = prevIndex;
    }

    updateView() {
        this.pages.forEach(page => page.elem.classList.remove("open"));
        this.pages[this.currentPageIndex].elem.classList.add("open");
        console.log(this.currentPageIndex);
        if (this.currentPageIndex == 1) {
            this.container.querySelector(".dpPage .wystu").style.animation = "fadeIn 2s";
            this.container.querySelector(".dpPage .info").style.animation = "niceLeft 2s";
            this.container.querySelector(".dpPage img").style.animation = "niceImg 2s forwards";
        } else if (this.currentPageIndex == 2) {
            this.container.querySelector(".mp .wystu").style.animation = "fadeIn 2s";
            this.container.querySelector(".mp .info .dmp").style.animation = "dmpAnim 2s forwards";
            this.container.querySelector(".mp .info .inf").style.animation = "infAnim 3s forwards";
            this.container.querySelector(".mp .info img").style.animation = "vidTrans 3s forwards";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new scrollPages(document.querySelector(".scrollPages"));
});