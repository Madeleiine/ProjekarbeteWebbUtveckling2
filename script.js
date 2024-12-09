const maträtter = JSON.parse(localStorage.getItem("maträtter")) || [];

function uppdateraLocalStorage() {
    localStorage.setItem("maträtter", JSON.stringify(maträtter));
}

function renderaRecept() {
    $("#receptLista").empty();

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

    $(".taBortRecept").on("click", function () {
        const index = $(this).data("index");
        maträtter.splice(index, 1);
        uppdateraLocalStorage();
        renderaRecept();
    });
}

renderaRecept();

$("#genereraMaträtt").on("click", function () {
    const randomIndex = Math.floor(Math.random() * maträtter.length);
    const randomMaträtt = maträtter[randomIndex];

    if (randomMaträtt) {
        $("#slumpaMat").text(`Testa denna rätt: ${randomMaträtt.matNamn}`);
    } else {
        $("#slumpaMat").text("Inga maträtter tillgängliga, testa lägg till några först.");
    }
});

$("#receptForm").on("submit", function (e) {
    e.preventDefault();

    const matNamn = $("#matNamn").val();
    const ingredienser = $("#ingredienser").val();
    const instruktioner = $("#instruktioner").val();

    maträtter.push({ matNamn, ingredienser, instruktioner });
    uppdateraLocalStorage();
    renderaRecept();
    this.reset();
});