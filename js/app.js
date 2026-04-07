let CURRENT_QUESTION = 0;

// load câu hỏi
function loadQuestion() {

    $.get("get-question.php", function (res) {

        if (!res) return;

        // chỉ render khi câu hỏi đổi
        if (res.id != CURRENT_QUESTION) {

            CURRENT_QUESTION = res.id;

            renderQuestion(res);

        }

    }, "json")

}


// render theo type
function renderQuestion(q) {

    if (q.type == "truefalse") {
        renderTrueFalse(q)
    }

    if (q.type == "choice") {
        renderChoice(q)
    }

    if (q.type == "drag") {
        renderDrag(q)
    }

}


// TRUE FALSE
function renderTrueFalse(q) {

    let html = `
<img src="images/${q.image}" class="img-fluid mb-4">

<div class="row">

<div class="col-6">
<button class="btn btn-success w-100 big-btn answer-btn"
data-answer="true">
ĐÚNG
</button>
</div>

<div class="col-6">
<button class="btn btn-danger w-100 big-btn answer-btn"
data-answer="false">
SAI
</button>
</div>

</div>
`;

    $("#questionArea").html(html)

}



// CHOICE
function renderChoice(q) {

    let data = JSON.parse(q.data_json)

    let html = `
<img src="images/${q.image}" class="img-fluid mb-4">
<div class="row">
`

    data.options.forEach(function (o) {

        html += `
<div class="col-4">
<img src="images/${o.img}" 
class="img-fluid option answer-choice"
data-answer="${o.id}">
</div>
`

    })

    html += `</div>`

    $("#questionArea").html(html)

}



// DRAG
function renderDrag(q){

    let data = JSON.parse(q.data_json)

    let html = `
    <img src="images/${data.question}" class="img-fluid mb-4">
    `

    // items
    html += `<div class="row mb-4 source">`

    data.items.forEach(function(i){

    html += `
    <div class="col-3">
    <img src="images/${i.img}" 
    class="img-fluid drag" 
    data-id="${i.id}">
    </div>
    `

    })

    html += `</div>`

    // slots
    html += `<div class="row target">`

    for(let i=0;i<data.slots;i++){

    html += `<div class="col-3 drop"></div>`

    }

    html += `</div>`

    html += `
    <button class="btn btn-primary big-btn mt-4" id="btnSubmit">
    XÁC NHẬN
    </button>
    `

    $("#questionArea").html(html)

    initDrag()

}



// init kéo thả
function initDrag(){

    $(".drag").draggable({
    helper:"clone",
    revert:"invalid"
    })

    $(".drop").droppable({

    drop:function(e,ui){

    $(this).html(
    ui.helper.clone()
    )

    }

    })

}



// TRUE FALSE click
$(document).on("click", ".answer-btn", function () {

    let answer = $(this).data("answer")

    submitAnswer(answer)

})



// CHOICE click
$(document).on("click", ".answer-choice", function () {

    let answer = $(this).data("answer")

    submitAnswer(answer)

})



// DRAG submit
$(document).on("click","#btnSubmit",function(){

    let arr = []

    $(".drop").each(function(){

    let id = $(this).find("img").data("id")

    arr.push(id)

    })

    submitAnswer(arr)

})



// submit answer
function submitAnswer(answer) {

    // khóa không cho bấm lại
    $(".answer-btn").prop("disabled", true)

    $.post("submit.php", {

        team_id: TEAM_ID,
        answer: JSON.stringify(answer)

    })

}



// load lần đầu
loadQuestion();


// realtime polling
setInterval(function () {

    loadQuestion()

}, 1000)