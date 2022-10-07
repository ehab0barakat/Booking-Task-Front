$('.owl-carousel').owlCarousel({
    stagePadding: 50,/*the little visible images at the end of the carousel*/
    loop:true,
    rtl: false,
    lazyLoad:true,
    margin:0,
    nav:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:2
        },
        800:{
            items: 3
        },
        1000:{
            items:2
        },
      1200:{
          items: 3
      }
    }
})