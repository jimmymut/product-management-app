function validatePassword(){
    const passwor = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if (passwor !== confirmPassword){
      document.getElementById('small-password').style = "display: block; color: red;";
    setTimeout(() =>{
      document.getElementById('small-password').style = "display: none;";
    }, 7000);
    return false;
    }
    else{
      return true;
    }
  }