$(document).ready(function() {
    // $(".ui-loader").hide();
    // $("input[type='text']").attr('value','');
  });

  function login() {
    axios({
        url: "./api/login.php",
        method: "post",
        responseType: "json",
        data: {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }
    }
    ).then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    });
}