


$(document).ready(function(){

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
    );
    

    $("#FormaID").validate({
        rules:{
            dostavaIme:{
                required:true
            },
            dostavaAdresa:{
                required:true
            },
            dostavaPostanskiBroj:{
                digits:true,
                required:true,
                minlength:5,
                maxlength:5

            },
            dostavaTelefon:
            {
                required:true,
                regex:/\+\d{3}\-\d{2}\-\d{3}\-\d{4}/
            }

        }
    });

    var slika=document.getElementsByClassName("VilaKolonaOkvir");
for(var i=0;i<slika.length;i++)
    {
        slika[i].onclick=okvir;
    }
  //  $(".VilaKolonaOkvir").click(okvir);

function okvir()
{
    if(this.style.border=="none")
    {
        this.style.border="4px solid yellow";
    }
    else{
        this.style.border="none";
     }
}


});


function load()
{
    var mojUrl="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll";
    zahtjev=new XMLHttpRequest();

    zahtjev.onload=downloadUspjesno;
    zahtjev.onerror=function()
    {
        alert("Greska u komunikaciji sa serverom");
    }

    zahtjev.open("GET",mojUrl,true);
    zahtjev.send(null);
}

function dodaj()
{
    if($("#FormaID").valid())
    {
        event.preventDefault();
        var obj=new Object();
        obj.dostavaIme=document.getElementById("dostavaIme").value;
        obj.dostavaAdresa=document.getElementById("dostavaAdresa").value;
        obj.dostavaPostanskiBroj=document.getElementById("dostavaPostanskiBroj").value;
        obj.dostavaTelefon=document.getElementById("dostavaTelefon").value;
        obj.napomena=document.getElementById("napomena").value;
        var json=JSON.stringify(obj);

        var mojUrl="http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj";
        zahtjev=new XMLHttpRequest();

        zahtjev.onload=function(){
            if(zahtjev.status===200)
            {
                alert("Uspjesno dodano");
                deleteRows();
            }
            else
            {
                alert("Server javlja gresku");
            }
        };
            zahtjev.onerror=function()
            {
                alert("Greska u komunikaciji sa serverom");
            };


            zahtjev.open("POST",mojUrl,true);
            zahtjev.setRequestHeader("Content-Type","application/json");
            zahtjev.send(json);

    }
    else{
        return false;
    }
}

function downloadUspjesno()
{
    if(zahtjev.status===200)
    {
        makeRow();
    }
    else
    {
        alert("Server javlja gresku");
    }
}

function makeRow()
{
    var z=zahtjev.responseText;
    var json=JSON.parse(z);

    for(var i=0;i<json.length;i++)
    {
        var r=json[i];
        
        var tr=document.createElement("tr");
        var t1=document.createElement("th");
        var t2=document.createElement("th");
        var t3=document.createElement("th");
        var t4=document.createElement("th");
        var t5=document.createElement("th");
        var t6=document.createElement("th");
        var t7=document.createElement("th");
        document.getElementById("body").appendChild(tr);
        tr.appendChild(t1);
        tr.appendChild(t2);
        tr.appendChild(t3);
        tr.appendChild(t4);
        tr.appendChild(t5);
        tr.appendChild(t6);
        tr.appendChild(t7);
        t1.innerText=r.narudzbaId;
        t2.innerText=r.datumNarudzbe;
        t3.innerText=r.dostavaIme;
        t4.innerText=r.dostavaAdresa;
        t5.innerText=r.dostavaPostanskiBroj;
        t6.innerText=r.dostavaTelefon;
        t7.innerText=r.napomena;
    }

}

function deleteRows()
{
    $("#body").html("");
    load();
}

