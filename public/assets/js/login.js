const loginForm = document.querySelector("form.login");
const emailInput = document.querySelector("input#email-input");
const passwordInput = document.querySelector("input#password-input");

if (loginForm) {

  // When the form is submitted, we validate there's an email and password entered
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };
  
    if (!userData.email || !userData.password) {
      return;
    }
  
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
}

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(email, password) {
  $.post("/api/login", {
    email: email,
    password: password
  })
    .then(() => {
      window.location.replace("/members");
      // If there's an error, log the error
    })
    .catch(err => {
      console.log(err);
    });
}
