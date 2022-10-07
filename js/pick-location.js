
function clear(){
    if ($("input[type='search']").val() == "" || $("input[type='search']").val() == " "){
        $(".search_res").css("display","none")}
    else{$(".search_res").css("display","block")}
  }
  
  
  
  
  arr= [] 
  
  function asd(){
    var xhr_1 = new XMLHttpRequest ;
    xhr_1.open('GET',`http://127.0.0.1:8000/api/hotel` ,true)
    xhr_1.onreadystatechange = ()=>{
    if(xhr_1.readyState == 4 && xhr_1.status == 200){
        var data = JSON.parse(xhr_1.responseText)
        this.arr =data 
      }
    }
    xhr_1.send()
  }
  asd()
  
  function search(se){
    $(".search_res").html('') ;
    clear() ;
  arr.map((el , index )=>{
    if ( el.location.toLocaleLowerCase().includes(se) && $("input[type='search']").val() != "" && $("input[type='search']").val() != " " ){
    string = `<div> ${el.location}</div>`
    x = `<span style="color:white ; background:grey" >${se}</span>`
    pp = string.toLocaleLowerCase().replace(se,x).split(' ').map((el)=>{
        return el[0].toUpperCase() + el.substring(1)
    }).join(' ');
    $(".search_res").append(`<div  class="d_block " id='${el.id}' <li style="cursor:pointer ; color:black" >${pp}</li></div>`)
  }
  })
  if($(".search_res").children().length == 0  && $("input[type='search']").val() != "" && $("input[type='search']").val() != " " ){
    $(".search_res").html('') ;
    $(".search_res").append(`<div class="d_block" <li style="cursor:pointer ; color:black"  > There is not such a result </li></div>`)
  }
  
  document.querySelectorAll(".d_block").forEach((el) => {
    el.onclick=(x)=>{
        kill_search()
        $("input[type='search']").val(`${arr.find( e => e.id == el.id ).location}`) 
        $("input[type='search']").attr("id", el.id); 
    }
  });
  
  }
  
  
  function kill_search(){
    $("body").css("overflow", "unset");
    $(".search_res").css("display","none")
    $("input[type='search']").val("")
    $("input[type='search']").blur();
  }
  
  
  document.addEventListener("keydown",(event)=>{
    if (event.keyCode == 27) {
        kill_search()
    }
  });
  
  var searchTimeout ;
  $("input[type='search']").on("keyup",(x)=>{
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() =>{
        search($(x.target).val())
    },300)
  })
  
  
  
  
  