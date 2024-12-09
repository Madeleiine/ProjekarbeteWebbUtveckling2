//Array för att lagra recept 
const maträtter = [

];

//Slumpa maträtt
$("#genereraMaträtt").on("click", function(){
    const randomIndex = Math.floor(Math.random() * maträtter.length);
    const randomMaträtt = maträtter[randomIndex];
    //Kontrollerar om array inte är tom
    if (randomMaträtt){
       $("#slumpaMat").text(`Testa denna rätt: ${randomMaträtt.matNamn}`); 
    } else {
        $("#slumpaMat").text("Inga maträtter tillgängliga, testa lägg till några först.");
    }
    
});

//Lägga till ett nytt recept. genom att anropa preventDefault gör att sidan inte laddas om
$("#receptForm").on("submit", function (e) {
    e.preventDefault();

//.val väljer den ex nedan id 
    const matNamn = $("#matNamn").val();
    const ingredienser = $("#ingredienser").val();
    const instuktioner = $("#instuktioner").val();

    //Lägger till matträtt i array. ( typ objrct som lagrar data)
    maträtter.push({
        matNamn:matNamn,
        ingredienser: ingredienser,
        instuktioner:instuktioner,
    })
    console.log(maträtter);
    $("#receptLista").append(`<li><strong>${matNamn}:</strong> <br> <p>Ingredienser: </p>${ingredienser}: <br><p>Instruktioner:</p> ${instuktioner}</li> `);

    //resar förmulär
    this.reset();
});