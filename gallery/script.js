{
  // Author: Giovanni Antonio
  // Twitter  @thecalicoder
  // EXPERIMENTAL

  const index = el => [...el.parentElement.children].indexOf(el);
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

  function init() {
    // keep them low-res for demo purposes only
    const assets = [

    "../images/gallery_full/1st_column/1.jpeg?width=882&height=588",
    "../images/gallery_full/1st_column/2.jpeg?width=882&height=588",
    "../images/gallery_full/1st_column/3.jpeg?width=882&height=588",
    "../images/gallery_full/1st_column/4.jpeg?width=882&height=588",
    "../images/gallery_full/2nd_column/1.jpeg?width=882&height=588",
    "../images/gallery_full/2nd_column/2.jpeg?width=882&height=588",
    "../images/gallery_full/2nd_column/5.jpeg?width=882&height=588",
    "../images/gallery_full/2nd_column/4.jpeg?width=882&height=588",
    "../images/gallery_full/3rd_column/1.jpeg?width=882&height=588",
    "../images/gallery_full/3rd_column/2.jpeg?width=882&height=588",
    "../images/gallery_full/3rd_column/3.jpeg?width=882&height=588",
    "../images/gallery_full/3rd_column/4.jpeg?width=882&height=588",
    "../images/gallery_full/4th_column/1.jpg?width=882&height=588",
    "../images/gallery_full/4th_column/2.jpeg?width=882&height=588",
    "../images/gallery_full/4th_column/3.jpeg?width=882&height=588",
    "../images/gallery_full/4th_column/4.jpeg?width=882&height=588",


  ];


    const root = document.documentElement;
    const viewport = document.querySelector(".viewport");
    const canvas = document.querySelector(".canvas");
    const map = document.querySelector(".map");
    const focus = document.querySelector(".focus");
    const back = document.querySelector("#back");
    const zoom = document.querySelector("#zoom");
    let item = canvas.querySelector(".selected");
    let id = index(item);

    let coords = {
      x: 0,
      y: 0 };

    const gridSize = getComputedStyle(root).getPropertyValue("--gridSize");

    const translateCanvas = () => {
      canvas.style.setProperty("--x", coords.x);
      canvas.style.setProperty("--y", coords.y);
    };

    const panningTo = i => {
      coords.x = i % gridSize;
      coords.y = Math.floor(i / gridSize);
      translateCanvas();
    };

    const makeSelection = sel => {
      item.classList.remove("selected");
      map.children[index(item)].classList.remove("selected");

      item = canvas.children[sel];

      item.classList.add("selected");
      map.children[sel].classList.add("selected");

      id = index(item);
      panningTo(id);
    };

    const handleSelection = ev => {
      if (ev.target === item) return;
      if (
      ev.target.nodeName === "DIV" &&
      ev.target !== item &&
      ev.target !== canvas &&
      ev.target !== map)
      {
        makeSelection(index(ev.target));
      }
      ev.preventDefault();
    };

    const handleOpenImage = ev => {
      ev.preventDefault();
      root.classList.toggle("open");
    };

    const handleZoom = ev => {
      ev.preventDefault();
      let zoomValue = ev.target.value;
      viewport.style.setProperty("--zoom", zoomValue);
    };

    const handleKeyboard = ev => {
      ev.preventDefault();

      let tempX = coords.x,
      tempY = coords.y,
      tempIndex = id,
      max = gridSize - 1;

      switch (ev.keyCode) {
        case 37: // left
          tempX--;
          break;
        case 39: // right
          tempX++;
          break;
        case 38: // up
          tempY--;
          break;
        case 40: // down
          tempY++;
          break;
        case 13: // enter
          handleOpenImage(ev);
          return;}


      coords.x = clamp(tempX, 0, max);
      coords.y = clamp(tempY, 0, max);

      tempIndex = coords.y * gridSize + coords.x; // get index position from x,y

      makeSelection(tempIndex);
    };

    const handleLoad = () => {
      // selection
      panningTo(id);
      map.children[id].classList.add("selected");

      // Append images may fail!
      [...canvas.querySelectorAll("div")].forEach((v, i) => {
        let img = new Image(),
        container = document.createElement("div");
        v.innerHTML = "";
        container.className = "img";
        img.src = assets[i];
        img.crossOrigin = "";
        img.onload = () => {
          v.appendChild(img);
        };
        img.setAttribute("width", 1280);
        img.setAttribute("height", 800);
        img.alt = "";
      });
    };

    document.addEventListener("keydown", handleKeyboard);
    canvas.addEventListener("click", handleSelection);
    map.addEventListener("click", handleSelection);
    focus.addEventListener("click", handleOpenImage);
    back.addEventListener("click", handleOpenImage);
    zoom.addEventListener("change", handleZoom);

    window.addEventListener("load", handleLoad);
  }

  init();
}