document.addEventListener("DOMContentLoaded", () => {
    const bootupScreen = document.getElementById("bootup-screen");
    const mainWindow = document.getElementById("main-window");
    const errorWindow = document.getElementById("error-window");
    const shutdownScreen = document.getElementById("shutdown-screen");
    const bootText = document.getElementById("boot-text");
    const closeMainBtn = document.getElementById("close-main");
    const closeErrorBtn = document.getElementById("close-error");
  
    const fadeOutBootup = () => bootupScreen.classList.add("fade-out");
  
    const shutdownSequence = () => {
      errorWindow.style.display = "none";
      bootupScreen.style.display = "block";
  
      setTimeout(() => {
        shutdownScreen.classList.add("present");
        bootText.classList.remove("scroll");
  
        setTimeout(() => {
          shutdownScreen.classList.remove("present");
          bootupScreen.classList.remove("fade-out");
          bootText.classList.add("scroll");
          setTimeout(fadeOutBootup, 3000);
          mainWindow.style.display = "block";
        }, 2000); // Duration of bootup sequence
      }, 1500); // Duration of shutdown sequence
    };
  
    setTimeout(fadeOutBootup, 3000);
  
    closeMainBtn.addEventListener("click", () => {
      errorWindow.style.display = "block";
      mainWindow.style.display = "none";
      setTimeout(shutdownSequence, 2000); // Time until shutdown sequence starts
    });
  
    closeErrorBtn.addEventListener("click", () => {
      errorWindow.style.display = "none";
    });
  });
  
  let dragged = false;
  function makeDraggable(dragHandle, dragTarget) {
    let offsetX, offsetY, clientX, clientY, initX, initY;
    let height = dragTarget.offsetHeight,
      width = dragTarget.offsetWidth;
  
  
    
  dragHandle.addEventListener("mousedown", (e) => {
    if (!dragged) {
      const compStyles = window.getComputedStyle(dragTarget);
      height = dragTarget.offsetHeight;
      width = dragTarget.offsetWidth;
      initX = e.offsetX;
      initY = e.offsetY;
      e.preventDefault();
  
      let cy = Math.max(0, Math.min(window.innerHeight - height, e.clientY - initY));
      dragTarget.style.left = compStyles.getPropertyValue("margin-left");
      dragTarget.style.top = `${cy}px`;
      dragTarget.style.position = "absolute";
      dragTarget.style.margin = "0";
      dragged = true;
    }
    
    dragHandle.style.cursor = 'grabbing';
  
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
  
  function onMouseMove(e) {
    let cx = Math.max(0, Math.min(window.innerWidth - width, e.clientX - initX));
    let cy = Math.max(0, Math.min(window.innerHeight - height, e.clientY - initY));
    dragTarget.style.left = `${cx}px`;
    dragTarget.style.top = `${cy}px`;
  }
  
  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    dragHandle.style.cursor = 'grab';
  }
  
  }
  
  const headers = document.querySelectorAll(".window-header");
  
  headers.forEach((header) => {
    const windowContainer = header.parentElement;
  
    makeDraggable(header, windowContainer);
  });
  