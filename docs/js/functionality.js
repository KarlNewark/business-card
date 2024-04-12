document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementsByTagName("body")[0];
  const bootupScreen = document.getElementById("bootup-screen");
  const bootupScreenWhack = document.getElementById("bootup-screen-whack");
  const mainWindow = document.getElementById("main-window");
  const errorWindow = document.getElementById("error-window");
  const shutdownScreen = document.getElementById("shutdown-screen");
  const bootText = document.getElementById("boot-text");
  const closeMainBtn = document.getElementById("close-main-window");
  const closeErrorBtn = document.getElementById("close-error-window");
  const startupSplashScreen = document.getElementsByClassName("startup-window")[0];


  const splashScreen = () => {
    body.className="";
    body.classList.add('splash-screen-time');
    setTimeout(()=>{
      body.classList.remove('splash-screen-time');
      body.classList.add('booted');
    }, 2500)

  }
  
  setTimeout(splashScreen, 1500);

  const shutdownSequence = () => {

    

    setTimeout(() => {


      shutdownScreen.classList.add("present");
      bootText.classList.remove("scroll");

      body.classList.add('shutdown');
      body.classList.remove('error');

      setTimeout(() => {

        let currentOs = document.body.getAttribute('os-theme');
        if (currentOs == "whack") {
          document.body.setAttribute('os-theme', 'binbows');
        } else if (currentOs == "binbows") {
          document.body.setAttribute('os-theme', 'whack');
        }
        

        body.classList.add('booting');
        body.classList.remove('shutdown');

        bootText.classList.add("scroll");
        setTimeout(splashScreen, 3000);
        //mainWindow.style.display = "block";
      }, 2000); // Duration of bootup sequence
    }, 1500); // Duration of shutdown sequence
  };

  closeMainBtn.addEventListener("click", () => {
    body.classList.add('error');
    body.classList.remove('booted');
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

    height = dragTarget.offsetHeight;
    width = dragTarget.offsetWidth;
    initX = e.offsetX;
    initY = e.offsetY;

    if (!dragged) {
      const compStyles = window.getComputedStyle(dragTarget);
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

const headers = document.querySelectorAll(".window-title");

headers.forEach((header) => {
  const windowContainer = header.closest('.window-container');

  makeDraggable(header, windowContainer);
});


function detectDeviceAndUpdateOsTheme() {
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  let osTheme = 'binbows';

  if (platform.includes('mac')) {
    osTheme = 'whack';
  } else if (/iphone|ipod|ipad/.test(userAgent)) {
    osTheme = 'whack';
  }

  if (osTheme) {
    document.body.setAttribute('os-theme', osTheme);
  } else {
    document.body.removeAttribute('os-theme');
  }
}

detectDeviceAndUpdateOsTheme();