$("form").on("submit", (x)=>{
    x.preventDefault();
    var email = $("input[type=email]")[0].value ;
    var password = $("input[type=password]")[0].value ;
    console.log(email, password) ;
    data={
        "email":email,
        "password":password
    }

  fetch("http://127.0.0.1:8000/api/login", {
  method: "post",
  body: JSON.stringify(data),
  mode: "cors",
  headers: {
    "Content-Type": '"application/json; charset=UTF-8"',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
  },
})
  .then((res) => res.json())
  .then((data) => { 
                    $(".error").html("")
                    if(data.token){
                        localStorage.setItem("token", data.token);
                        window.location.href = "../admin.html";
                    }else{
                      $(".error").html("* Email or Password is wrong *")
                    }
  })
  .catch((error) => console.error("Error:", error));

})