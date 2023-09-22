var pages;
var menu;
var img;
const imgsa = ["https://howtomechatronics.com/wp-content/uploads/2020/10/Arduino-based-SCARA-Robot--768x432.jpg?ezimgfmt=ng:webp/ngcb2", "https://howtomechatronics.com/wp-content/uploads/2020/10/Graphic-User-Interface-for-SCARA-Robot-control-GUI-made-with-Processing-IDE-768x432.jpg?ezimgfmt=ng:webp/ngcb2", "https://howtomechatronics.com/wp-content/uploads/2020/10/3D-Printed-SCARA-Robot-parts-768x432.jpg?ezimgfmt=ng:webp/ngcb2", "https://howtomechatronics.com/wp-content/uploads/2020/10/SCARA-Robot-3D-Model-768x508.jpg?ezimgfmt=ng:webp/ngcb2", "https://howtomechatronics.com/wp-content/uploads/2020/10/Adding-a-wire-holder-on-the-first-arm-768x432.jpg?ezimgfmt=ng:webp/ngcb2", "https://howtomechatronics.com/wp-content/uploads/2020/10/Assembling-the-SCARA-robot-gripper-768x432.jpg?ezimgfmt=ng:webp/ngcb2"];

class scrollPages {
    constructor(container) {
        this.container = container;

        this.container.addEventListener("wheel", ({ wheelDelta }) => {
            if (wheelDelta < 0) {
                if (!this.container.querySelector(".specs .tblContainer").matches(":hover"))
                    this.openNext();
            }
            else {
                if (!this.container.querySelector(".specs .tblContainer").matches(":hover"))
                    this.openPrev();
            }
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
        return [...this.container.querySelectorAll(".hero"), ...this.container.querySelectorAll(".dpPage"), ...this.container.querySelectorAll(".mp"), ...this.container.querySelectorAll(".specs"), ...this.container.querySelectorAll(".img"), ...document.querySelectorAll(".abt")].map(elem => ({ elem }));
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
    }
}

class navBar {
    constructor(id) {
        this.id = id;
    }

    open() {
        this.id.style.width = "100%";
    }

    close() {
        this.id.style.width = "0%";
    }
}

class imageLister {
    constructor(id, txtId, imgs) {
        this.id = id;
        this.txtId = txtId;
        this.imgs = imgs;
        this.txtId.innerHTML = this.imgIndex + 1 + "/" + this.imgs.length;
        this.id.src = this.imgs[this.imgIndex];
    }

    _imgIndex = 0;

    get imgIndex() {
        return this._imgIndex;
    }

    set imgIndex(index) {
        this._imgIndex = index;
        this.txtId.innerHTML = index + 1 + "/" + this.imgs.length;
    }

    next() {
        const ibl = this.imgIndex >= this.imgs.length - 1 ? true : false;
        if (this.imgIndex < this.imgs.length - 1 && !ibl) {
            this.imgIndex++;
            this.id.src = this.imgs[this.imgIndex];
        }
    }

    prev() {
        const ibz = this.imgIndex > 0 ? true : false;
        if (this.imgIndex <= this.imgs.length - 1 && ibz == true) {
            this.imgIndex--;
            this.id.src = this.imgs[this.imgIndex];
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    pages = new scrollPages(document.querySelector(".scrollPages"));
    menu = new navBar(document.querySelector(".navbar"));
    img = new imageLister(document.querySelector(".prevImg"), document.querySelector(".img h1"), imgsa);
});

function changeView(pageNum) {
    pages.currentPageIndex = pageNum;
    menu.close();
}

function next(e) {
    img.next();
    e.style.animation = "clickImg 500ms";
    setTimeout(() => {
        e.style.animation = null;
    }, 500);
}

function prev(e) {
    img.prev();
    e.style.animation = "clickImg 500ms";
    setTimeout(() => {
        e.style.animation = null;
    }, 500);
}