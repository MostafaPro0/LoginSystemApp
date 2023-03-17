

var UsersDB = [];
var MO10Loggedin = "";
UsersDB = JSON.parse(localStorage.getItem('UsersDB'));
MO10Loggedin = JSON.parse(localStorage.getItem('MO10Loggedin'));

if (UsersDB == null)
    UsersDB = [];
var ourlocation = (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1));

var btnlogout = document.querySelector("#btnlogout");
function check() {
    if (btnlogout != null)
        btnlogout.style.display = "none";
    if (ourlocation == "" || ourlocation == "index.html") {
        if (MO10Loggedin != null) {
            document.querySelector("h2").innerHTML = "Welcome " + MO10Loggedin + "";
            btnlogout.style.display = "block";
        }
        else {
            alert("you are not logged , you should login first");
            window.location.href = "Login.html";
        }
    }
};
check();
var btnsignup = document.querySelector("#btnsignup");
var signupyourname = document.querySelector("#signupyourname");
var signupemail = document.querySelector("#signupemail");
var signuppassword = document.querySelector("#signuppassword");
var btnlogin = document.querySelector("#btnlogin");
var loginemail = document.querySelector("#loginemail");
var loginpassword = document.querySelector("#loginpassword");
function Signup() {

    if (signupchecks(signupyourname.value, signupemail.value, signuppassword.value) == true) {
        var user = {
            yourname: signupyourname.value,
            email: signupemail.value,
            password: signuppassword.value
        };
        UsersDB.push(user);

        localStorage.setItem("UsersDB", JSON.stringify(UsersDB));

        btnsignupcheck.innerHTML = "Successfully Signed up [" + signupyourname.value + "]";
        btnsignupcheck.style.display = "block";
        clearsignupform();
    }
}
function clearsignupform() {
    signupyourname.value = "";
    signupemail.value = "";
    signuppassword.value = "";
}
var signupyournamecheck = document.querySelector('#signupyournamecheck');
var signupemailcheck = document.querySelector('#signupemailcheck');
var signuppasswordcheck = document.querySelector('#signuppasswordcheck');

function signupchecks(yourname, email, password) {
    signupyournamecheck.style.display = "none";
    if (yourname == "" || yourname.length == 0) {
        signupyournamecheck.innerHTML = "Your Name is empty";
        signupyournamecheck.style.display = "block";
        return false;
    }
    signupemailcheck.style.display = "none";
    if (email == "" || email.length == 0) {
        signupemailcheck.innerHTML = "E-mail is empty";
        signupemailcheck.style.display = "block";
        return false;
    }
    signuppasswordcheck.style.display = "none";
    if (password == "" || password.length == 0) {
        signuppasswordcheck.innerHTML = "Password is empty";
        signuppasswordcheck.style.display = "block";
        return false;
    }
    if (UsersDB != null) {
        var mailformat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!mailformat.test(email)) {
            signupemailcheck.innerHTML = "invalid E-mail";
            signupemailcheck.style.display = "block";
            return false;
        }
        for (var i = 0; i < UsersDB.length; i++) {
            if (UsersDB[i].email == email) {
                signupemailcheck.innerHTML = "this E-mail already Exist";
                signupemailcheck.style.display = "block";
                return false;
            }
        }
    }
    return true;
}

function login() {

    if (logincheck(loginemail.value, loginpassword.value) == true) {
        for (var i = 0; i < UsersDB.length; i++) {
            if (UsersDB[i].email == loginemail.value) {
                MO10Loggedin = UsersDB[i].yourname;
                localStorage.setItem("MO10Loggedin", JSON.stringify(MO10Loggedin));
                window.location.href = "index.html";
                break
            }
        }
    }
}
var loginemailcheck = document.querySelector('#loginemailcheck');
var loginpasswordcheck = document.querySelector('#loginpasswordcheck');
function logincheck(email, password) {
    loginemailcheck.style.display = "none";
    if (email == "" || email.length == 0) {
        loginemailcheck.innerHTML = "E-mail is empty";
        loginemailcheck.style.display = "block";
        return false;
    }
    loginpasswordcheck.style.display = "none";
    if (password == "" || password.length == 0) {
        loginpasswordcheck.innerHTML = "Password is empty";
        loginpasswordcheck.style.display = "block";
        return false;
    }
    if (UsersDB != null) {
        var mailformat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!mailformat.test(email)) {
            loginemailcheck.innerHTML = "invalid E-mail";
            loginemailcheck.style.display = "block";
            return false;
        }
        for (var i = 0; i < UsersDB.length; i++) {
            if (UsersDB[i].email != email) {
                loginemailcheck.innerHTML = "this E-mail not Exist";
                loginemailcheck.style.display = "block";
                return false;
            }
            else {
                if (UsersDB[i].password != password) {
                    loginpasswordcheck.innerHTML = "Password is incorrect";
                    loginpasswordcheck.style.display = "block";
                    return false;
                }
            }
        }
    }
    return true;
}
function logout() {
    localStorage.removeItem("MO10Loggedin");
    window.location.href = "index.html";
}
if (btnsignup != null) {
    btnsignup.addEventListener('click', function () {
        Signup()
    })
}
if (btnlogin != null) {
    btnlogin.addEventListener('click', function () {
        login()
    })
}
if (btnlogout != null) {
    btnlogout.addEventListener('click', function () {
        logout()
    })
}
if (signupyourname != null) {
    signupyourname.addEventListener('keypress', function () {
        btnsignupcheck.style.display = "none";
        signupyournamecheck.style.display = "none";
    })
}
if (signupemail != null) {
    signupemail.addEventListener('keypress', function () {
        btnsignupcheck.style.display = "none";
        signupemailcheck.style.display = "none";
    })
}
if (signuppassword != null) {
    signuppassword.addEventListener('keypress', function () {
        btnsignupcheck.style.display = "none";
        signuppasswordcheck.style.display = "none";
    })
}
if (loginemail != null) {
    loginemail.addEventListener('keypress', function () {
        loginemailcheck.style.display = "none";
    })
}
if (loginpassword != null) {
    loginpassword.addEventListener('keypress', function () {
        loginpasswordcheck.style.display = "none";
    })
} 