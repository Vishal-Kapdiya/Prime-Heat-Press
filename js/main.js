
//--------Fix navbar-----------
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
     $('#nav').addClass('fix_nav');
  } else {
     $('#nav').removeClass('fix_nav');
  }
});
// -------------


//--------menu scroll page & active in menu-----------
var sections = $('section'),
  nav = $('nav'),
  nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function () {
     var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

     if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active-link');
        sections.removeClass('active-link');

        $(this).addClass('active-link');
        nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active-link');
     }
  });
});

nav.find('a').on('click', function () {
  var $el = $(this),
     id = $el.attr('href');

  $('html, body').animate({
     scrollTop: $(id).offset().top - nav_height
  }, 500);

  return false;
});
// -------------------------------------------------




//--------Form Validation-----------
(function () {
  "use strict";
  /*  * Form Validation  */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
     form.addEventListener(
        "submit",
        function (event) {
           if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();

              form.querySelectorAll(":invalid")[0].focus();
           } else {
              /*
               * Form Submission using fetch()
               */

              const formData = new FormData(form);
              event.preventDefault();
              event.stopPropagation();
              const object = {};
              formData.forEach((value, key) => {
                 object[key] = value;
              });
              const json = JSON.stringify(object);
              result.innerHTML = "Please wait...";

              fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                       "Content-Type": "application/json",
                       Accept: "application/json",
                    },
                    body: json,
                 })
                 .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                       result.innerHTML = json.message;
                       result.classList.remove("text-gray-500");
                       result.classList.add("text-green-500");
                    } else {
                       console.log(response);
                       result.innerHTML = json.message;
                       result.classList.remove("text-gray-500");
                       result.classList.add("text-red-500");
                    }
                 })
                 .catch((error) => {
                    console.log(error);
                    result.innerHTML = "Something went wrong!";
                 })
                 .then(function () {
                    form.reset();
                    form.classList.remove("was-validated");
                    setTimeout(() => {
                       result.style.display = "none";
                    }, 5000);
                 });
           }
           form.classList.add("was-validated");
        },
        false
     );
  });
})();

//-----------------


//--------Home-page slider-----------
$('.slider-home').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  // fade: true,
  dots: true,
  autoplay: true,
  autoplaySpeed: 3000,
});
// -------------------------------


//--------product-detail-page slider-----------
$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});

$('.slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: false,
  focusOnSelect: true,
});


$('a[data-slide]').click(function (e) {
  e.preventDefault();
  var slideno = $(this).data('slide');
  $('.slider-nav').slick('slickGoTo', slideno - 1);
});

//----------------



//--------accordion -----------
$(document).ready(function () {
  $('.accordion-list > li > .answer').hide();

  $('.accordion-list > li').click(function () {
     if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
     } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
     }
     return false;
  });

});
