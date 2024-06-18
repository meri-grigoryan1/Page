function search() {
    let type = document.getElementById("what").value;
    let location = document.getElementById("location").value;

    let objSearch = {
        type: type,
        location: location
    };

    console.log(objSearch);
}


function dataBase() {
    if (validation()) {
        let email = document.getElementById("email").value;
        let objDB = {
            email: email
        };
        console.log(objDB);
    }

}

function validation() {
    let email = document.getElementById("email").value;
    let errorMessage = document.getElementsByClassName("error")[0];
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (email.trim() === "" || !emailPattern.test(email)) {
        errorMessage.style.display = "block";
        return false;
    } else {
        errorMessage.style.display = "none";
        return true;
    }
}


document.getElementById("ccright").innerHTML = " &copy; Copyright" + new Date().getFullYear() + " - Designed and Developped By Thramesine";