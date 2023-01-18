$(document).ready(function() {
    const errorBox = document.getElementById("error");
    errorBox.style.display =   'none';
    errorBox.innerHTML = "";
  });

  function login() {
    const errorBox = document.getElementById("error");
    errorBox.style.display =   'none';
    errorBox.innerHTML = "";

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
        if(res.data.codigo == 1)
            window.location.href = "catalogo.php";
        else {
            errorBox.style.display =   'block';
            errorBox.innerHTML = res.data.mensaje;
        }
    })
    .catch( err => {
        errorBox.style.display =   'block';
            errorBox.innerHTML = err.response.data.mensaje;
    });
}

function logout()  {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/index.php';
}