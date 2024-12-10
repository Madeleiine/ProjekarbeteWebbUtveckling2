// Deklarerar en variabel där vi sparar recepten,  typ dictionary
const maträtter = JSON.parse(localStorage.getItem("maträtter")) || [];

//En function som uppdaterar localStorage när recept lagts till
function uppdateraLocalStorage() {
    localStorage.setItem("maträtter", JSON.stringify(maträtter));
}

// Funktion för att rendera (visa) listan med recept i HTML
function renderaRecept() {
    // Rensa innehållet i listan innan vi lägger till nya element
    $("#receptLista").empty();

    // Gå igenom alla maträtter och skapa HTML för varje recept
    maträtter.forEach((recept, index) => {
        $("#receptLista").append(`
            <li>
                <strong>${recept.matNamn}:</strong><br>
                <p>Ingredienser: ${recept.ingredienser}</p>
                <p>Instruktioner: ${recept.instruktioner}</p>
                <button class="taBortRecept" data-index="${index}">Ta bort</button>
            </li>
        `);
    });
    // en klick-händelse för varje "Ta bort"-knapp
    $(".taBortRecept").on("click", function () {
        const index = $(this).data("index");
        maträtter.splice(index, 1);
        uppdateraLocalStorage();
        renderaRecept();
    });
}
// Visar receptlistan när sidan laddas
renderaRecept();

// Klick-händelse för att generera ett slumpmässigt recept
$("#genereraMaträtt").on("click", function () {
    const randomIndex = Math.floor(Math.random() * maträtter.length);
    const randomMaträtt = maträtter[randomIndex];
    
    // Visa antingen det slumpade receptet eller ett meddelande om att listan är tom
    if (randomMaträtt) {
        $("#slumpaMat").text(`Testa denna rätt: ${randomMaträtt.matNamn}`);
    } else {
        $("#slumpaMat").text("Inga maträtter tillgängliga, testa lägg till några först.");
    }
});
// Hantering av formulär för att lägga till ett nytt recept e är förkortning för event
$("#receptForm").on("submit", function (e) {
    e.preventDefault();

    // Hämta värdena från formulärets fält .val() väljer det i parentesen
    const matNamn = $("#matNamn").val();
    const ingredienser = $("#ingredienser").val();
    const instruktioner = $("#instruktioner").val();


    // Lägger till det nya receptet i listan
    maträtter.push({ matNamn, ingredienser, instruktioner });

    //Uppdaterar localStoreg å renderar om listan
    uppdateraLocalStorage();
    renderaRecept();

    //Återställer formuläret
    this.reset();
});