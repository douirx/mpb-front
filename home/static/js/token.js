let baseURL="https://monpetitbet.fr/api/";
let sender = {
    "nom":"",
    "prenom":"",
    "agent":agent
}
let urlreg="";
async function ajax(url,options) {
    const response = await fetch(url,options);
    const code = await response.status;
    if (code==200){
        urlreg=await response.text()
        console.log(response)
        return true;
    }else{
        return false;
    }
};

let sendToken = async () =>{
    sender['nom']=document.getElementById("p-nom").value;
    sender['prenom']=document.getElementById("p-prenom").value;
    let auth = btoa("token:costat59");
    const options = {
        method: 'POST',
        body: JSON.stringify(sender),
        headers: {
            'Content-Type': 'application/json',
            'Origin':'https://monepetitbet.fr/',
            'Access-Request-Control-Method':'POST',
            'Access-Request-Control-Headers':'Authorization',
            'Authorization':`Basic ${auth}`
        }
    }
    const url = baseURL+"token/add";
    return ajax(url,options);
};

const init = () => {
    let listError = document.getElementsByClassName("error");
    for (error of listError) {
        error.hidden = true;
    }
    document.getElementById("url-token").hidden = false;
}

const generatetoken = async () => {
    res = await sendToken();
    if (res){
        document.getElementById("btn-token").hidden = true;
        document.getElementById("url-token").hidden = false;
        document.getElementById("url-token").innerText= urlreg;
    }
}


window.onload = () => {
    init();
    document.getElementById("btn-token").onclick = () => {
        generatetoken();
    }
}