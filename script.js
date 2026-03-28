// makeMagnet
Shery.mouseFollower();
const magnetElements = document.querySelectorAll(".magnet");
magnetElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance < 100) {
      const strength = (100 - distance) / 100;
      el.style.transform = `translate(${deltaX * strength * 0.1}px, ${deltaY * strength * 0.1}px)`;
    } else {
      el.style.transform = "translate(0, 0)";
    }
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0, 0)";
  });
});

// hoverWithMediaCircle
let videoDiv = null;
let isHovering = false;
let videoIndex = 0;
const videos = ["./videos/0.mp4", "./videos/1.mp4", "./videos/3.mp4"];

const hvrElements = document.querySelectorAll(".hvr");
hvrElements.forEach((el) => {
  el.style.cursor = "pointer";
  el.addEventListener("mouseenter", (e) => {
    if (!videoDiv) {
      videoDiv = document.createElement("div");
      videoDiv.style.position = "fixed";
      videoDiv.style.width = "350px";
      videoDiv.style.height = "350px";
      videoDiv.style.borderRadius = "50%";
      videoDiv.style.overflow = "hidden";
      videoDiv.style.zIndex = "999";
      videoDiv.style.pointerEvents = "none";
      document.body.appendChild(videoDiv);
    }
    videoDiv.style.left = e.clientX - 175 + "px";
    videoDiv.style.top = e.clientY - 175 + "px";
    videoDiv.style.display = "block";
    const video = document.createElement("video");
    video.src = videos[videoIndex % videos.length];
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.autoplay = true;
    video.muted = true;
    videoDiv.innerHTML = "";
    videoDiv.appendChild(video);
    videoIndex++;
    isHovering = true;
  });
  el.addEventListener("mouseleave", () => {
    if (videoDiv) {
      videoDiv.style.display = "none";
    }
    isHovering = false;
  });
});

document.addEventListener("mousemove", (e) => {
  if (isHovering && videoDiv) {
    let size = window.innerWidth < 768 ? 200 : 350;
    let offset = size / 2;
    videoDiv.style.left = e.clientX - offset + "px";
    videoDiv.style.top = e.clientY - offset + "px";
  }
});

gsap.to(".f-left-elem", {
  scrollTrigger: {
    trigger: "#f-images",
    pin: true,
    start: "top top",
    end: "bottom bottom",
    endTrigger: ".last",
    scrub: 1,
  },
  y: "-300%",
  ease: Power1,
});

let sections = document.querySelectorAll(".f-left-elem");
Shery.imageEffect(".images", {
  style: 4,
  config: { onMouse: { value: 1 } },
  slideStyle: (setScroll) => {
    sections.forEach(function (section, index) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        scrub: 1,
        onUpdate: function (prog) {
          setScroll(prog.progress + index);
        },
      });
    });
  },
});
