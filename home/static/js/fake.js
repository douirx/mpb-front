let baseURL="https://monpetitbet.fr/api/";
//let baseURL="http://127.0.0.1:5001/";
let fake = {
    "pseudo":"",
    "email":"",
    "indicatif":"",
    "pwd":"",
    "iban":"",
    "bic":"",
    "animal":"",
    "idpmu":""
};
let fakeRes={};
let rescount=0;

const init = () => {
    let listError=document.getElementsByClassName("error");
    for(error of listError){
        error.hidden=true;
    }
    document.getElementById("res").hidden=true;
    document.getElementById("end").hidden=true;
    document.getElementById("data").hidden=true;
}

async function ajax1(url,options) {
    const response = await fetch(url,options);
    code = await response.status
    if (code==200){
        return true;
    }else{
        return false;
    }
};
async function ajax2(url,options) {
    const response = await fetch(url,options);
    const code = await response.status;
    if (code==200){
        fakeRes=await response.json()
        console.log(fakeRes)
        return true;
    }else{
        return false;
    }
};


let checkpseudo = async () =>{
    let pseudo=document.getElementById("p-pseudo").value;
    let auth = btoa("token:costat59");
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Origin':'https://monpetitbet.fr/',
            'Access-Request-Control-Method':'POST',
            'Access-Request-Control-Headers':'Authorization',
            'Authorization':`Basic ${auth}`
        }
    }
    const url = baseURL+"users/checkpseudo?pseudo="+pseudo;
    return ajax1(url,options);
};

let getinfos = async () =>{
    let pseudo=document.getElementById("p-pseudo").value;
    let auth = btoa("token:costat59");
    const options = {
        method: 'GET',
        headers: {
            'Origin':'https://monpetitbet.fr/',
            'Access-Request-Control-Method':'GET',
            'Access-Request-Control-Headers':'Authorization',
            'Authorization':`Basic ${auth}`
        }
    }
    const url = baseURL+"fake/get?pseudo="+pseudo;
    return ajax2(url,options);
};
let sendinfos = async () =>{
    let pseudo=document.getElementById("p-pseudo").value;
    let auth = btoa("token:costat59");
    const options = {
        method: 'POST',
        body: JSON.stringify(fake),
        headers: {
            'Content-Type': 'application/json',
            'Origin':'https://monpetitbet.fr/',
            'Access-Request-Control-Method':'POST',
            'Access-Request-Control-Headers':'Authorization',
            'Authorization':`Basic ${auth}`
        }
    }
    const url = baseURL+"fake/add";
    return ajax1(url,options);
};



let managePseudo = async () => {
    res1 = await checkpseudo();
    document.getElementById("data").hidden=false;
    console.log(res1)
    if (res1){
         document.getElementById("req").hidden=true;
         document.getElementById("res").hidden=false;
         res2=await getinfos();
        if (res2){
            document.getElementById("d3").hidden=true;
            document.getElementById("d2").hidden=true;
            document.getElementById("p-email").value=fakeRes.email
            document.getElementById("p-indicatif").value=fakeRes.indicatif
            document.getElementById("p-mobile").value=fakeRes.mobile
            document.getElementById("p-pwd").value=fakeRes.pwd
            document.getElementById("p-iban").value=fakeRes.iban
            document.getElementById("p-bic").value=fakeRes.bic
            document.getElementById("p-animal").value=fakeRes.animal
            document.getElementById("p-idpmu").value=fakeRes.idpmu
        }else{
            document.getElementById("d1").hidden=true;
            document.getElementById("d3").hidden=true;
        }
    }else{
        document.getElementById("d2").hidden=true;
        document.getElementById("d1").hidden=true;
    }

}
let checkEmail = () => {
    let email=document.getElementById("p-email").value;
    let regex=new RegExp("(^$|(^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])))$",'g');
    if (!email || email.length==0){
        document.getElementById("e-email").hidden=false;
        return false;
    }else if (!regex.test(email)) {
        document.getElementById("e-email").hidden=false;
        return false;
    }else{
        document.getElementById("e-email").hidden=true;
        fake.email=email;
        return true;
    }
}

let checkMobile = () => {
    let mobile=document.getElementById("p-mobile").value;
    let regex=new RegExp('^[0][6-7]\\d{8}$','g');
    console.log(mobile)
    if (!mobile || mobile.length==0){
        document.getElementById("e-mobile").hidden=false;
        return false;
        }
     else if (!regex.test(mobile)) {
         document.getElementById("e-mobile").hidden=false;
         return false;}
else{
        fake.mobile=mobile
        return true;
    }
}

let checkIndicatif = () => {
    let indicatif=document.getElementById("p-indicatif").value;
    let regex=new RegExp('^[0-9]{1,3}$','g');
    console.log(indicatif)
    if (!indicatif || indicatif.length==0){
        document.getElementById("e-indicatif").hidden=false;
        console.log('cc')
        return false;
        }

    else if (!regex.test(indicatif)) {
        document.getElementById("e-indicatif").hidden=false;
        console.log('cddddc')
        return false; }
else{
        fake.indicatif=indicatif
        return true;
    }
}

let checkPwd = () => {
    let pwd=document.getElementById("p-pwd").value;
    let regex=new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,35}$','g');
    if (!pwd || pwd.length==0){
        document.getElementById("e-pwd").hidden=false;
        return false;
    }else if (!regex.test(pwd)) {
        document.getElementById("e-pwd").hidden=false;
        return false;}
    else{
        document.getElementById("e-pwd").hidden=true;
        fake.pwd=pwd;
        return true;
};

}

const checkIban= () => {
    let iban=document.getElementById("p-iban").value;
    let regex=new RegExp('^[A-Z0-9]+$','g');
    if (!iban || iban.length==0){
        document.getElementById("e-iban").hidden=false;
        return false;
    }else if (!regex.test(iban)) {
        document.getElementById("e-iban").hidden=false;
        return false;
    }else{
        document.getElementById("e-iban").hidden=true;
        fake.iban=iban;
        return true;
    }
};
const checkBic = () => {
    let bic=document.getElementById("p-bic").value;
    let regex=new RegExp('^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)$','g');
    if (!bic || bic.length==0){
        document.getElementById("e-bic").hidden=false;
        return false;
    }else if (!regex.test(bic)) {
        document.getElementById("e-bic").hidden=false;
        return false;
    }else{
        document.getElementById("e-bic").hidden=true;
        fake.bic=bic;
        return true;
    }
};

let checkAnimal = () => {
    let animal=document.getElementById("p-animal").value;
    let regex=new RegExp('^[A-Za-z]{4,35}$','g');
    console.log(animal)
    if (!animal || animal.length==0){
        document.getElementById("e-animal").hidden=false;
        console.log('cc')
        return false;
        }

    else if (!regex.test(animal)) {
        document.getElementById("e-animal").hidden=false;
        return false; }
else{
        fake.animal=animal
        return true;
    }
}

let checkIdpmu = () => {
    let idpmu=document.getElementById("p-idpmu").value;
    let regex=new RegExp('^[0-9]{6}$','g');
    if (!idpmu || idpmu.length==0){
        document.getElementById("e-idpmu").hidden=false;
        console.log('cc')
        return false;
        }

    else if (!regex.test(idpmu)) {
        document.getElementById("e-idpmu").hidden=false;
        return false; }
else{
        fake.idpmu=idpmu
        return true;
    }
}


let validateInfos = async () => {
    //On envoie les nouvelles infos au serveur
    let resX = true;
    if (checkIndicatif()==false){
        resX=false;
    }
    if (checkEmail()==false){
        resX=false;
    }
    if (checkPwd()==false){
        resX=false;
    }
    if (checkMobile()==false){
        resX=false;
    }
    if (checkIban()==false){
        resX=false;
    }
    if (checkBic()==false){
        resX=false;
    }
    if (checkAnimal()==false){
        resX=false;
    }
    if (checkIdpmu()==false){
        resX=false;
    }
    if (resX){
        fake.pseudo=document.getElementById("p-pseudo").value
        const resY=await sendinfos();
        if (resY){
            document.getElementById("end").hidden=false;
            document.getElementById("btn-validate").hidden=true;
        }
    }

}

window.onload = () => {
    init();
    document.getElementById("btn-pseudo").onclick = () => {
        managePseudo();
    }
    document.getElementById("btn-validate").onclick = () => {
        validateInfos();
    }

}
