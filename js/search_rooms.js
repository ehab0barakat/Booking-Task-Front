$("form").on("submit", function (e) {
    e.preventDefault();

    var location = $("input[name=location]")[0].id  ?? "" ;
    var room_category = $("input[type=radio][checked=checked]")[0].id ?? "" ;
    start_date ?? "";
    end_date ?? "";
    var rooms = $("input[name=room]")[0].value ?? 0  ;
    var adults = $("input[name=adult]")[0].value ?? 0 ;
    var children = $("input[name=children]")[0].value ?? 0 ;

    var data = {
                "location" : location ,
                "start_date" : start_date ,
                "end_date" : end_date ,
                "rooms" : rooms ,
                "adults" : adults ,
                "children" : children ,
                "room_category" : room_category ,
    }

// var data = {                            =================>>>>>>>>    this was for testing :)) 
//   location: 1,
//   start_date: "2022-10-04",
//   end_date: "2022-10-08",
//   rooms: 1,
//   adults: 1,
//   children: 1,
//   room_category: 1,
// };

fetch("https://6675-156-206-209-136.eu.ngrok.io/api/show", {
  method: "POST",
  mode: "cors",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": '"application/json; charset=UTF-8"',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
  },
})
  .then((res) => res.json())
  .then((data) => {
    $(".hotel_rooms").html("");
    for (let i = 0; i < data.count; i++) {
      $(".hotel_rooms").append(`
                                    <div class="col-12  col-md-4 col-lg-3">
                                        <div class="card-sl">
                                            <div class="card-image">
                                                <img
                                                    src="${data.image}" />
                                            </div>
                                            <a class="card-action" href="#"><i class="fa fa-heart"></i></a>
                                            <div class="card-heading">
                                                ${name} Hotel 
                                            </div>
                                            <div class="card-text">
                                                ${data.description}
                                            </div>
                                            <div class="card-text">
                                                ${data.price} $
                                            </div>
                                        <div class="card-button purchace" id="purchace"> Purchase</div>
                                    </div>  `);
    }
    localStorage.setItem("cost", data.price)
    user();
  })
  .catch((error) => console.error("Error:", error));
})

// ############################################################################
// ############################################################################
// ############################################################################
// #############################(    user    )#################################
// ############################################################################
// ############################################################################
// ############################################################################


$("input[type=text][id=user_name]")[0].value = localStorage.getItem("name");
$("input[type=number][id=phone]")[0].value = localStorage.getItem("phone");

function user() {
  $(".cancel").on("click", () => $(".dark").css("display", "none"));
  $(".purchace").on("click", () => $(".dark").css("display", "flex"));

  $(".next").on("click", () => {

    var user_name = $("input[type=text][id=user_name]")[0].value ?? "";
    var phone = $("input[type=number][id=phone]")[0].value ?? "";
    console.log( phone);
    var data = {
      name: user_name,
      phone: phone,
    };

    fetch("https://6675-156-206-209-136.eu.ngrok.io/api/guest", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": '"application/json; charset=UTF-8"',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data){
            console.log(data)
            goToStyle(data)
        }
    })
      .catch((error) => console.error("Error:", error));
  });
}

function goToStyle(data) {
    localStorage.setItem("id",data.id)
    localStorage.setItem("name",data.name)
    localStorage.setItem("phone",data.phone)
    localStorage.setItem("discount",data.discount)
    $(".user_form").css("display", "none");
    $(".next").css("display", "none");
    $(".book_form").toggleClass("d-none");;
    $(".pay").toggleClass("d-none");
    dis = localStorage.getItem("discount") == 1 ? .05 : 1 ; 
    $(".cost").html(`the Final cost is gonna be : ${localStorage.getItem("cost") * dis } $$ `)

    book() 
}

// ############################################################################
// ############################################################################
// ############################################################################
// #############################(    book    )#################################
// ############################################################################
// ############################################################################
// ############################################################################

function book() {
  $(".pay").on("click", function (e) {
    e.preventDefault();

    var location = $("input[name=location]")[0].id ?? "";
    var room_category = $("input[type=radio][checked=checked]")[0].id ?? "";
    start_date ?? "";
    end_date ?? "";
    var rooms = $("input[name=room]")[0].value ?? 0;
    var adults = $("input[name=adult]")[0].value ?? 0;
    var children = $("input[name=children]")[0].value ?? 0;

    var data = {
      location: location,
      start_date: start_date,
      end_date: end_date,
      rooms: rooms,
      adults: adults,
      children: children,
      room_category: room_category,
      user_id: localStorage.getItem("id"),
      phone: localStorage.getItem("phone"),
    };

    console.log(data);

    fetch("https://6675-156-206-209-136.eu.ngrok.io/api/book", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": '"application/json; charset=UTF-8"',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
      },
    })
      .then((res) => res.json())
      .then((data) => {
                        if(data.validation){
                            $(".book_form").toggleClass("d-none");
                            $(".user").append(`<h1> ${data.validation} </h1><img src="../images/true.jpg">`)
                        }else{
                            $(".book_form").toggleClass("d-none");
                            $(".user").append(`<h1> ${data.validation} </h1><img src="../images/false.jpg">`)
                        }
      })
      .catch((error) => console.error("Error:", error));
  });
}
