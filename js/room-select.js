
toggleCSSclasses = (el, ...cls) => cls.map(cl => el.classList.toggle(cl))
$(".positive").on("mouseover mouseleave",(e) => {
  toggleCSSclasses(event.target , "btn-secondary" , "btn-success");
})
$(".negative").on("mouseover mouseleave",(e) => {
  toggleCSSclasses(event.target , "btn-secondary" , "btn-danger");
})
$(".positive").on("click",(e) => {
  var btn = $(e.target).siblings()[1].children[0] ;

  if(btn.name == "room" && btn.value  ==  3 ){
    // do nothing :) ...
  }else{
    btn.value++;
    boardChange();
  }
})
$(".negative").on("click",(e) => {
  val = $(e.target).siblings()[0].children[0].value;
  val > 0 ? $(e.target).siblings()[0].children[0].value -=1 : "" ;
  boardChange();
})
$(window).on("keyup",(e) => {
  if(e.keyCode == 27){
    $(".boarding").removeClass("d-block");
    $(".bookk").removeClass("d-none");
  }
})
$(".boardaaa").on("click",(e) => {
    $(".boarding").removeClass("d-block");
    $(".bookk").removeClass("d-none");
})
$(".bo").on("click",() => {
  $(".boarding").toggleClass("d-block");
  $(".bookk").toggleClass("d-none");
})
$(".bo").on("keydown",(e) => {
  e.preventDefault();
})
function boardChange(){
  room= $("#room").val();
  adult= $("#adult").val();
  children= $("#children").val();
  $(".bo").attr("placeholder" , `${room} room , ${adult} adult ,${children} children  `)
}





function asd(){
  var xhr_1 = new XMLHttpRequest ;
  xhr_1.open('GET',`http://127.0.0.1:8000/api/room_cats` ,true)
  xhr_1.onreadystatechange = ()=>{
  if(xhr_1.readyState == 4 && xhr_1.status == 200){
      var data = JSON.parse(xhr_1.responseText)
      data.map((el)=>{
        $(".check-my-box").append(
          `<div class="form-check">
            <input class="form-check-input chchc" type="radio" name="room_type" id="${el.id}" >
            <label class="form-check-label" for="room_type1">
              ${el.name}
            </label>
          </div>`
        )
      })

      $("input[type=radio][id=1]").attr("checked",true) ; // to roll over about error 

      $("input[type=radio]").on("click",(x)=>{
        for (const x of $("input[type=radio]")) {
          x.removeAttribute("checked");
        }
        $(x.target).attr("checked", "true")
      })
    }
  }
  xhr_1.send()
}
asd()
