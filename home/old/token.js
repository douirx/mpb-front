//let baseURL="https://monpetitbet.fr/api/";
let baseURL="http://127.0.0.1:5001/";
let perso = {
    male:true,
    nom:"",
    nom2:"",
    prenom:"",
    prenoms:"",
    email:"",
    mobile:"",
    animal:""
};
let home = {
    adresse1:"",
    adresse2:"",
    codeP:0,
    city:"",
    country:""
};
let birth ={
    bdate:"",
    bcity:"",
    bcodeP:0,
    bcountry:""
};
let pay ={
    iban:"",
    bic:"",
    payment:""
};
let xnom2=0;
let xadresse2=0;
let xprenoms=0;
let country="FRANCE";
const init = () => {
    let listError=document.getElementsByClassName("error");
    for(error of listError){
        error.hidden=true;
    }
    document.getElementById("token-p1").hidden=false;
    document.getElementById("token-p2").hidden=true;
    document.getElementById("token-p3").hidden=true;
    document.getElementById("token-p4").hidden=true;
    document.getElementById("token-p5").hidden=true;
    document.getElementById("token-p6").hidden=true;
    document.getElementById("p-nom2").hidden=true;
    document.getElementById("p-nom2L").hidden=true;
    document.getElementById("h-adresse2").hidden=true;
    document.getElementById("h-adresse2L").hidden=true;
    document.getElementById("p-prenom2").hidden=true;
    document.getElementById("p-prenom2L").hidden=true;
    document.getElementById("manuel").hidden=true;
    document.getElementById("send-manuel").hidden=true;
};
const afficherNom2 = () => {
    if (xnom2==0){
        xnom2=1;
        document.getElementById("p-nom2").hidden=false;
        document.getElementById("p-nom2L").hidden=false;
    }else {
        xnom2=0;
        document.getElementById("p-nom2").hidden=true;
        document.getElementById("p-nom2L").hidden=true;
        document.getElementById("e-nom2").hidden = true;
    }
};
const afficherAdresse2 = () => {
    if (xadresse2==0){
        xadresse2=1;
        document.getElementById("h-adresse2").hidden=false;
        document.getElementById("h-adresse2L").hidden=false;
    }else {
        xadresse2=0;
        document.getElementById("h-adresse2").hidden=true;
        document.getElementById("h-adresse2L").hidden=true;
        document.getElementById("e-adresse2").hidden = true;
    }
};
const afficherPrenoms = () => {
    if (xprenoms==0){
        xprenoms=1;
        document.getElementById("p-prenom2").hidden=false;
        document.getElementById("p-prenom2L").hidden=false;
    }else{
        xprenoms=0;
        document.getElementById("p-prenom2").hidden=true;
        document.getElementById("p-prenom2L").hidden=true;
        document.getElementById("e-prenom2").hidden = true;
    }
}

async function ajax(url,options) {
    const response = await fetch(url,options);
    const code = await response.status;
    if (code==200){
        return true;
    }else{
        return false;
    }
};
let validateToken = async () =>{
    let nom=document.getElementById("p-nom").value;
    let prenom=document.getElementById("p-prenom").value;
    let url_string = window.location.href;
    let urlX = new URL(url_string);
    let value=urlX.searchParams.get("token");
    const token = {
        value: value,
        nom:nom,
        prenom:prenom
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(token),
        headers: {
            'Content-Type': 'application/json',
            'Origin':'https://monepetitbet.fr/',
            'Access-Request-Control-Method':'POST',
            'Access-Request-Control-Headers':'Authorization'
        }
    }
    const url = baseURL+"token/validate";
    return ajax(url,options);
};
let sendInfos = async () =>{
    let url_string = window.location.href;
    let urlX = new URL(url_string);
    let value=urlX.searchParams.get("token");
    const client = {
        "perso":perso,
        "home":home,
        "birth":birth,
        "pay":pay,
        token:value
    };
    console.log(client)
    const options = {
        method: 'POST',
        body: JSON.stringify(client),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const url = baseURL + "users/add";
    return await ajax(url,options);
};
const checkP1 = async () => {
    let resX = true;
    if (checkNom()==false){
        resX=false;
    }
    if(checkNom2()==false){
        resX=false;
    }
    if (checkPrenom()==false){
        resX=false;
    }
    if (checkPrenoms()==false){
        resX=false;
    }
    if (checkEmail()==false){
        resX=false;
    }
    if(checkMobile()==false){
        resX=false;
    }
    if(checkAnimal()==false){
        resX=false;
    }
    if (resX==true){
        let resY=true;
        const res1=await validateToken();
        if (!res1){
            document.getElementById("e-nom").hidden=false;
             document.getElementById("e-prenom").hidden=false;
             resY=false;
         }else {
             document.getElementById("e-nom").hidden = true;
             document.getElementById("e-prenom").hidden = true;
        if(resY==true){
            let madame = document.getElementById("madame");
            if(madame.checked==true){
                perso.male=false;
            }
            document.getElementById("token-p1").hidden=true;
            document.getElementById("token-p2").hidden=false;
        }
    }
}};
const checkNom= () => {
    let nom=document.getElementById("p-nom").value;
    let regex=new RegExp('^[a-zA-Zàâéèëêïîôùüç -]{1,60}$','g');
    if (!nom || nom.length==0){
        document.getElementById("e-nom").hidden=false;
        return false;
    }else if (!regex.test(nom)) {
        document.getElementById("e-nom").hidden=false;
        return false;
    }else{
        document.getElementById("e-nom").hidden=true;
        perso.nom=nom;
        return true;
    }
};
const checkNom2= () => {
    if(xnom2==1){
        let nom2=document.getElementById("p-nom2").value;
        let regex=new RegExp('^[a-zA-Zàâéèëêïîôùüç -]{1,60}$','g');
        if (!nom2 || nom2.length==0){
            document.getElementById("e-nom2").hidden=false;
            return false;
        }else if (!regex.test(nom2)) {
            document.getElementById("e-nom2").hidden=false;
            return false;
        }else{
            document.getElementById("e-nom2").hidden=true;
            perso.nom2=nom2;
            return true;
        }
    }else {
        return true;
    }
};
const checkPrenom = () => {
    let prenom=document.getElementById("p-prenom").value;
    let regex=new RegExp('^[a-zA-Zàâéèëêïîôùüç -]{1,60}$','g');
    if (!prenom || prenom.length==0){
        document.getElementById("e-prenom").hidden=false;
        return false;
    }else if (!regex.test(prenom)) {
        document.getElementById("e-prenom").hidden=false;
        return false;
    }else{
        document.getElementById("e-prenom").hidden=true;
        perso.prenom=prenom;
        return true;
    }
};
const checkPrenoms = () => {
    let prenom2=document.getElementById("p-prenom2").value;
    let regex=new RegExp('^[a-zA-Zàâéèëêïîôùüç -]{1,60}$','g');
    if (!prenom2 || prenom2.length==0){
        perso.prenoms=perso.prenom;
        return true;
    }
    if (!regex.test(prenom2)) {
        document.getElementById("e-prenom2").hidden=false;
        return false;
    }else{
        perso.prenoms=perso.prenom+" "+prenom2;
        document.getElementById("e-prenom2").hidden=true;
        return true;
    }
};
const checkEmail = () => {
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
        perso.email=email;
        return true;
    }
};
const checkMobile = () => {
    let mobile=document.getElementById("p-mobile").value;
    let regex=new RegExp('^[0][6-7]\\d{8}$','g');
    if (!mobile || mobile.length==0){
        document.getElementById("e-mobile").hidden=false;
        return false;
    }else if (!regex.test(mobile)) {
        document.getElementById("e-mobile").hidden=false;
        return false;
    }else{
        document.getElementById("e-mobile").hidden=true;
        perso.mobile=mobile;
        return true;
    }
};
const checkP2 = () => {
    res = true;
    if(checkAdresse1()==false){
        res=false;
    }
    if(checkAdresse2()==false){
        res=false;
    }
    if(checkCity()==false){
        res=false;
    }
    if(checkCodeP()==false){
        res=false;
    }
    if(checkCountry()==false){
        res=false;
    }
    if(res==true){
        if (country=='AUTRES'){
            document.getElementById("e-country").hidden=false;
        }else{
            document.getElementById("e-country").hidden=true;
            document.getElementById("token-p2").hidden=true;
            document.getElementById("token-p3").hidden=false;
        }

    }

};
const checkAdresse1 = () => {
    let adresse1=document.getElementById("h-adresse1").value;
    if (!adresse1 || adresse1.length<=5){
        document.getElementById("e-adresse1").hidden=false;
        return false;
    }else{
        document.getElementById("e-adresse1").hidden=true;
        home.adresse1=adresse1;
        return true;
    }
};
const checkAdresse2 = () => {
    if(xadresse2==1){
        let adresse2=document.getElementById("h-adresse2").value;
        if (!adresse2 || adresse2.length==0){
            document.getElementById("e-adresse2").hidden=false;
            return false;
        }else{
            document.getElementById("e-adresse2").hidden=true;
            home.adresse2=adresse2;
            return true;
        }
        }else {
        return true;
    }
};
const checkCity = () => {
    let city=document.getElementById("h-city").value;
    if (!city || city.length==0){
        document.getElementById("e-city").hidden=false;
        return false;
    }else{
        document.getElementById("e-city").hidden=true;
        home.city=city;
        return true;
    }
};
const checkCodeP = () => {
    let codeP=document.getElementById("h-codeP").value;
    let regex=new RegExp('[0-9]{5}','g');
    if (!codeP || codeP.length==0){
        document.getElementById("e-codeP").hidden=false;
        return false;
    }else if (!regex.test(codeP)) {
        document.getElementById("e-codeP").hidden=false;
        return false;
    }else{
        document.getElementById("e-codeP").hidden=true;
        home.codeP=codeP;
        return true;
    }
};
const checkCountry = () =>{
    let country=document.getElementById("h-country");
    let selected=country.options.selectedIndex;
    if (selected==1){
        document.getElementById("e-country").hidden=false;
        return false;
    }else{
        let value=country.options[selected].value;
        document.getElementById("e-country").hidden=true;
        home.country=value;
        return true;
    }
};
const checkP3 = () => {
    let res = true;
    if (checkBdate()==false){
        res=false;
    }
    if (checkBcity()==false){
        res=false;
    }
    if (checkBcodeP()==false){
        res=false;
    }

    if(res==true){
        let bcountry = document.getElementById("b-bcountry");
        let selected = bcountry.options.selectedIndex;
        birth.bcountry=bcountry.options[selected].value;
        document.getElementById("token-p3").hidden=true;
        document.getElementById("token-p4").hidden=false;
    }

};
const checkBdate = () => {
    let bdate=document.getElementById("b-bdate").value;
    let regex=new RegExp('^\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d$','g');
    if (!bdate || bdate.length==0){
        document.getElementById("e-bdate").hidden=false;
        return false;
    }else if (!regex.test(bdate)) {
        document.getElementById("e-bdate").hidden=false;
        return false;
    }else{
        document.getElementById("e-bdate").hidden=true;
        birth.bdate=bdate;
        return true;
    }
};
const checkBcity = () => {
    let bcity=document.getElementById("b-bcity").value;
    if (!bcity || bcity.length==0){
        document.getElementById("e-bcity").hidden=false;
        return false;
    }else{
        document.getElementById("e-bcity").hidden=true;
        birth.bcity=bcity;
        return true;
    }
};
const checkBcodeP = () => {
    let bcodeP=document.getElementById("b-bcodeP").value;
    let regex=new RegExp('[0-9]{5}','g');
    if (!bcodeP || bcodeP.length==0){
        document.getElementById("e-bcodeP").hidden=false;
        return false;
    }else if (!regex.test(bcodeP)) {
        document.getElementById("e-bcodeP").hidden=false;
        return false;
    }else{
        document.getElementById("e-bcodeP").hidden=true;
        birth.bcodeP=bcodeP;
        return true;
    }
};
const checkP4 = async () => {
    let res1=true;
    if(checkIban()==false){
        res1=false;
    }
    if(checkBic()==false){
        res1=false;
    }
    if(res1==true){
        let payment=document.getElementById("p-payment");
        let selected=payment.options.selectedIndex;
        pay.payment=payment.options[selected].value;
        let res2=await sendInfos();
        if (res2){
            document.getElementById("token-p4").hidden=true;
            document.getElementById("token-p5").hidden=false;
        }else {
            document.getElementById("token-p4").hidden=true;
            document.getElementById("token-p6").hidden=false;
        }
    }
};
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
        pay.iban=iban;
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
        pay.bic=bic;
        return true;
    }
};
const retry = async () => {
    let res=await sendInfos();
    if (res){
     document.getElementById("token-p6").hidden=true;
     document.getElementById("token-p5").hidden=false;
    }
};
const manuelle = () => {
    txt= document.getElementById("manuel");
    let url_string = window.location.href;
    let urlX = new URL(url_string);
    let value=urlX.searchParams.get("value");
    const client = {
        perso:perso,
        home:home,
        birth:birth,
        pay:pay,
        token:value
    };
    const jsow = JSON.stringify(client,null,4);
    txt.innerText=jsow;
    txt.hidden=false
    document.getElementById("send-manuel").hidden=false;
    document.getElementById("btn-manuel").hidden=true;
}
window.onload = () => {
    init();
    document.getElementById("btn-nom2").onclick = () => {
        afficherNom2();
    }
    document.getElementById("btn-prenoms").onclick = () => {
        afficherPrenoms();
    }
    document.getElementById("btn-adresse2").onclick = () => {
        afficherAdresse2();
    }
    document.getElementById("btn-p1").onclick = () => {
        checkP1();
    }
    document.getElementById("btn-p2").onclick = () => {
        checkP2();
    }
    document.getElementById("btn-p3").onclick = () => {
        checkP3();
    }
    document.getElementById("btn-p4").onclick = () => {
        checkP4();
    }
    document.getElementById("btn-retry").onclick = () => {
        retry();
    }
    document.getElementById("btn-manuel").onclick = () => {
        manuelle();
    }
    document.getElementById("btn-bp1").onclick = () => {
        document.getElementById("token-p2").hidden=true;
        document.getElementById("token-p1").hidden=false;
    }
    document.getElementById("btn-bp2").onclick = () => {
        document.getElementById("token-p3").hidden=true;
        document.getElementById("token-p2").hidden=false;
    }
    document.getElementById("btn-bp3").onclick = () => {
        document.getElementById("token-p4").hidden=true;
        document.getElementById("token-p3").hidden=false;
    }
    var newInput = document.getElementById("b-bdate");
    newInput.addEventListener('keydown', function( e ){
        if(e.which !== 8) {
            var numChars = e.target.value.length;
            if(numChars === 2 || numChars === 5){
                var thisVal = e.target.value;
                thisVal += '/';
                e.target.value = thisVal;
            }
        }
    });
};
