$(function(){
    if ($(".swiper-container").length > 0){
      var swiper = new Swiper(".swiper-container", {
        spaceBetween: 0,
        effect: "fade",
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
        },
      });
    }

    $('.drawer-icon').click(function(){
      $("body").addClass("wrap-slide-right");
    });
    $(".slide_out_area_close").click(function () {
      $("body").removeClass("wrap-slide-right");
    });

    $(window).on("scroll", function (event) {
      var scrollValue = $(window).scrollTop();
      if (scrollValue > 70) {
        $(".mainheader").addClass("sticky");
        setTextAnimation(0.1, 1.7, 1, "linear", "#8c015000", false);
        setTextAnimation1(0.1, 1.7, 1, "linear", "#8c015000", false);
      }else{
        $(".mainheader").removeClass("sticky");
      }
    });



    $(window).scroll(function (e) {
      var scrollTop = $(window).scrollTop();
      var docHeight = $(document).height();
      var winHeight = $(window).height();
      var scrollPercent = scrollTop / (docHeight - winHeight);
      var scrollPercentRounded = Math.round(scrollPercent * 100);
      $("#prg").html(scrollPercentRounded + "%");
      setProgress(scrollPercentRounded);
      if ($(this).scrollTop() > 100) {
        $(".percengat_progeess").addClass("active-progress");
      } else {
        $(".percengat_progeess").removeClass("active-progress");
      }
    });
    var circle = document.querySelector("circle");
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
    $(".percengat_progeess").on("click", function (event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 500);
      return false;
    });	
});

function setTextAnimation(delay, duration, strokeWidth, timingFunction, strokeColor,repeat) {
  let paths = document.querySelectorAll(".mainTxt");
  let mode=repeat?'infinite':'forwards'
  for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const length = path.getTotalLength();
      path.style["stroke-dashoffset"] = `${length}px`;
      path.style["stroke-dasharray"] = `${length}px`;
      path.style["stroke-width"] = `${strokeWidth}px`;
      path.style["stroke"] = `${strokeColor}`;
      path.style["animation"] = `${duration}s svg-text-anim ${mode} ${timingFunction}`;
      path.style["animation-delay"] = `${i * delay}s`;
  }
}
function setTextAnimation1(delay, duration, strokeWidth, timingFunction, strokeColor,repeat) {
  let paths = document.querySelectorAll(".tagLine");
  let mode=repeat?'infinite':'forwards'
  for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const length = path.getTotalLength();
      path.style["stroke-dashoffset"] = `${length}px`;
      path.style["stroke-dasharray"] = `${length}px`;
      path.style["stroke-width"] = `${strokeWidth}px`;
      path.style["stroke"] = `${strokeColor}`;
      path.style["animation"] = `${duration}s svg-text-anim1 ${mode} ${timingFunction}`;
      path.style["animation-delay"] = `${i * delay}s`;
  }
}