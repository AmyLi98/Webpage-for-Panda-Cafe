(function(){
    var hintText={user_email:{hint:"⚠️Please fill in carefully",right:"√correct email format",wrong:"×wrong format, please reenter"},
            user_name:{hint:"⚠️Please enter a username of 3-12 characters (including alphanumeric/underscore)",right:"√correct username format",wrong:"×wrong format, please reenter"},
            login_user_name:{hint:"⚠️Please enter a username of 3-12 characters (including alphanumeric/underscore)",right:"√correct username format",wrong:"×wrong format, please reenter"},
            name:{hint:"⚠️Please enter name of 3-12 characters (including alphanumeric/underscore)",right:"√correct format",wrong:"×wrong format, please reenter"},
            age:{hint:"⚠️Please input correct age",right:"√correct age",wrong:"×wrong age, please reenter"},


            phone:{hint:"⚠️Please input phone number of 11 bits",right:"√correct phone number",wrong:"×wrong phone number, please reenter"},

            password:{hint:"⚠️Please enter a password of 6 or more",right:"√correct password format",wrong:"×please input password in format"},
            repassword:{hint:"⚠️Please reenter password",right:"√correct re-enter password",wrong:"×Enter the password twice inconsistent or incorrect format, please re-enter your password or in correctly formatted",
                login_password:{hint:"⚠️Please enter a password of 6 or more",right:"√correct password format",wrong:"×please input password in format"}}};
    var regEvent=function(node, event, func){
        if (node.addEventListener)
            node.addEventListener(event, func);
        else if (node.attachEvent)
            node.attachEvent("on" + event, func);
        else
            node["on" + event] = func;
    };
    function regValue(id,i){
        var flag=false,
        input=document.getElementById(id),
        value=input.value;
        switch (id){
            case "user_name":
            case "login_user_name":
            case "info_user_name":
                flag=/^[a-zA-Z0-9_]{4,16}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));
                id="user_name";
                break;
            case "name":
            case "send_to_name":
            case "send_from_name":
                flag=/^[a-zA-Z ]{1,20}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));
                id="name";
                break;
           /* case "send_from_address":
            case "send_to_address":
                flag=/^\S{6,16}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));
                id="address";
                break;*/
            case "password":
            case "login_password":
            case "info_password":
                flag=/^\S{6,16}$/.test(value);
                id="password";
                break;
            case "repassword":
                flag=document.getElementById("password").value==value && value !="" && value !=null && (/^\S{6,16}$/.test(value));
                break;
            case "info_repassword":
                flag=document.getElementById("info_password").value==value && value !="" && value !=null && (/^\S{6,16}$/.test(value));
                id="repassword";
                break;
            case "user_email":
            case "forget_user_email":
            case "info_user_email":
                flag=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value);
                id="user_email";
                break;
            case "age":
                flag=/^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(value);
                id="age";
                break;
            case "phone":
            case "info_phone":
            case "send_to_phone":
            case "send_from_phone":
                flag=/^((\(\d{2,3}\))|(\d{3}\-))?1[3,8,5]{1}\d{9}$/.test(value);
                id="phone";
                break;
            /*case "id_card":
                flag=/^\S{18}$/.test(value);
                break;
            case "weight":
                flag=/^\d{1,4}$/.test(value);
                break;*/
            default:
                break;
        }
        if(flag) {
            index=0;
            input.className="right input";
            hint[i].className="hint hint_right";
            hint[i].innerHTML=hintText[id].right;
        }else{
            input.className="wrong input";
            hint[i].className="hint hint_wrong";
            hint[i].innerHTML=hintText[id].wrong;
            index=1;
        }
    };
    var inputs=document.getElementsByClassName("input"),
    id,
    hint=document.getElementsByClassName("hint"),
    index=0;
    for(var j=0;j<inputs.length;j++){
        (function(i){
            regEvent(inputs[i],"focus",function(){
                hint[i].style.visibility="visible";
                id=inputs[i].id;
            });
            regEvent(inputs[i],"blur",function(){
               regValue(id,i);
            });
        })(j)
    }
    regEvent(document.getElementById("submit"),"click",function(e){
        if(index!==0){
            alert(index);
            e.preventDefault();
            alert("Your input is incorrect, please check and re-enter!");
            return false;
        }  
    });  
    regEvent(document.getElementById("button"),"click",function(e){
        if(index!==0){
            e.preventDefault();
            alert("Your input is incorrect, please check and re-enter!");
            return false;
        }  
    });  
})();
