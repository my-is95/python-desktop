function addBilling() {
    let profile_name = document.getElementsByName("profile_name")[0].value;
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    
    // Pythonに入力された情報を渡す
    eel.addBilling(profile_name, name, email)

    
}