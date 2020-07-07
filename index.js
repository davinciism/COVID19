//**The api part is a fork from https://github.com/NovelCOVID/API + some fixes (due to CORS and outdated code was not working)


// GLOBAL
const confirmed = document.getElementById('confirmed');
const recovered = document.getElementById('recovered');
const deceased = document.getElementById('deceased');
var c, r, d;
fetch("https://coronavirus-19-api.herokuapp.com/all")
.then(response => response.json())
.then(json => {

    console.log(json)

    c = json.cases;
    r = json.recovered;
    d = json.deaths;

})
.then(() => {
    confirmed.innerHTML = shorten(c);
    recovered.innerHTML = shorten(r);
    deceased.innerHTML = shorten(d);
})




function shorten(num){
    var l = numOfDigits(num);
    if(l>6){
        var n = num/1000000;//11.531634
        //Shorten it further till 1 decimal place
        n = n+'';
        var i = n.indexOf('.');
        var r = n.slice(0, (i+2))//11.5
        return (r+'m');//11.5m
    }
    else{
        var n = num/1000;//536.159
        //Shorten it further till 0 decimal place
        n = n+'';
        var i = n.indexOf('.');
        var r = n.slice(0, (i))//536
        return (r+'k');//536k
    }
}

function numOfDigits(num){
  var len = (''+num).length;
  return len;
}


//COUNTRY
//https://coronavirus-19-api.herokuapp.com/countries/{countryName}
var countryName = "world";
var request = "https://coronavirus-19-api.herokuapp.com/countries/"+countryName;
const name = document.getElementById('name');
const total = document.getElementById('total');
const casesToday = document.getElementById('cases-today');
const rec = document.getElementById('rec');
const dec = document.getElementById('dec');
const tests = document.getElementById('tests');
const testsPer = document.getElementById('tests-per')

fetch(request)
.then(response => response.json())
.then(json => {
    console.log(json)
    name.innerHTML = json.country;
    total.innerHTML = json.cases;
    casesToday.innerHTML = json.todayCases;
    rec.innerHTML = json.recovered;
    dec.innerHTML = json.deaths;
    if(json.totalTests == 0 || json.testsPerOneMillion == 0)
    {
        tests.innerHTML = 'Not Recorded'
        testsPer.innerHTML = 'Not Recorded';
    }
    else{
        tests.innerHTML = json.totalTests;
        testsPer.innerHTML = json.testsPerOneMillion;
    }
})

function getCountryStats(){
    countryName = document.getElementById('country').value;
    const request = "https://coronavirus-19-api.herokuapp.com/countries/"+countryName;
    fetch(request)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        name.innerHTML = json.country;
        total.innerHTML = json.cases;
        casesToday.innerHTML = json.todayCases;
        rec.innerHTML = json.recovered;
        dec.innerHTML = json.deaths;
        if(json.totalTests == 0 || json.testsPerOneMillion == 0)
        {
            tests.innerHTML = 'Not Recorded'
            testsPer.innerHTML = 'Not Recorded';
        }
        else{
            tests.innerHTML = json.totalTests;
            testsPer.innerHTML = json.testsPerOneMillion;
        }
    })
    .catch(err => alert("Country Details Not Found"))
}