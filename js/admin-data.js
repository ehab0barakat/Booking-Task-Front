fetch("http://127.0.0.1:8000/api/admin-data", {
  method: "get",
  mode: "cors",
  headers: {
    "Content-Type": '"application/json; charset=UTF-8"',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    var x ;
    
    for (let i = 0; i < data.length; i++) {
        x +=
            `<tr>    
                <td>${data[i].hotel.location} Hotel</td>
                <td>${data[i].room_cat.name}</td>
                <td><img src='${data[i].room_cat.image}' width=150 alt="error"> </td>
                <td>${data[i].rooms_number}</td>
                <td>${data[i].adults_number}</td>
                <td>${data[i].price}</td>
                <td>${data[i].guest.name}</td>
                <td>${data[i].guest.phone}</td>
                <td>${data[i].start_date}</td>
                <td>${data[i].end_date}</td>
            </tr>`                
    }

    $(".table").append(`
                            <thead>
                                <tr>
                                    <th scope="col">Hotel Name</th>
                                    <th scope="col">Room Type</th>
                                    <th scope="col">Room Image</th>
                                    <th scope="col">Room Quantity</th>
                                    <th scope="col">Adult Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Guest Name</th>
                                    <th scope="col">Guest Phone</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${x}
                            </tbody>
                    
                        `);
  })
  .catch((error) => console.error("Error:", error));
