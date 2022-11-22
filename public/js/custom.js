// JavaScript Document
jQuery(document).ready(function() {
var owl = jQuery('.CarouselOwl');
owl.owlCarousel({
margin: 0,
nav: true,
loop: false,
responsive: {
0: {items: 1},
480: {items: 1},
576: {items: 2},
768: {items: 2},
992: {items: 3},
1200: {items: 3}
}
})
})
