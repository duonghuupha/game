let CURRENT_QUESTION = 0;
let CURRENT_STATUS = "";
let GAME_STATE = {
status:"",
question:0
}

function loadGame(){

$.get("api/get-game.php",function(res){

// ===== OPEN =====
if(res.status == "open"){

if(
GAME_STATE.status != "open" ||
GAME_STATE.question != res.current_question
){

GAME_STATE.status = "open"
GAME_STATE.question = res.current_question

loadQuestion()

}

return
}

// ===== SHOWING =====
if(res.status == "showing"){

if(GAME_STATE.status != "showing"){

GAME_STATE.status = "showing"
clearQuestion()

}

return
}

// ===== WAITING =====
if(res.status == "waiting"){

clearQuestion()
GAME_STATE.status = "waiting"
return
}

// ===== CHECKED =====
if(res.status == "checked"){

GAME_STATE.status = "checked"
return

}

},"json")

}

setInterval(loadGame,500)

function clearQuestion(){
    $("#questionArea").empty()
}

// load câu hỏi
function loadQuestion() {
    $.get("api/get-question.php", function (res) {
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
    enableQuestion()
}

// TRUE FALSE
function renderTrueFalse(q){
    let html = `
        <div class="text-center">
            <img src="images/${q.image}" class="img-fluid mb-4">
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-success w-100 big-btn answer-btn" data-answer="true">
                        ĐÚNG
                    </button>
                </div>
                <div class="col-6">
                    <button class="btn btn-danger w-100 big-btn answer-btn" data-answer="false">
                        SAI
                    </button>
                </div>
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
            <div class="col-6">
                <img src="images/${o.img}" class="img-fluid option answer-choice" data-answer="${o.id}">
            </div>
        `
    })
    html += `</div>`
    $("#questionArea").html(html)
}

// DRAG
function renderDrag(q){
    let data = JSON.parse(q.data_json)
    let html = `<div class="pattern-row">`
    data.pattern.forEach(function(p){
        if(p.img){
            html += `
                <div class="pattern-box">
                    <img src="images/${p.img}">
                </div>
            `
        }
        if(p.drop){
            html += `<div class="pattern-box drop"></div>`
        }
    })
    html += `</div>`
    // items
    html += `<div class="items-row">`
    data.items.forEach(function(i){
        html += `
        <div class="item-box">
            <img src="images/${i.img}" class="drag" data-id="${i.id}">
        </div>
        `
    })
    html += `</div>`
    // buttons
    html += `
    <div class="mt-3">
        <button class="btn btn-warning" id="btnReset">
            Làm lại
        </button>
        <button class="btn btn-primary" id="btnSubmit">
            Trả lời
        </button>
    </div>
    `
    $("#questionArea").html(html)
    initDrag()
}

// init kéo thả
function initDrag(){
    $(".drag").draggable({
        helper:"clone",
        appendTo:"body",
        zIndex:9999,
        revert:"invalid",
        start:function(e,ui){
            ui.helper.css({
                width:$(this).outerWidth(),
                height:$(this).outerHeight()
            })
        },
        cursorAt:{
            top:50,
            left:50
        }
    })
    $(".drop").droppable({
        tolerance:"pointer",
        drop:function(e,ui){
            if($(this).find("img").length) return;
            let clone = ui.helper.clone()
            clone.removeAttr("style")
            $(this).html(clone)
        }
    })
}

function disableQuestion(){
    // disable nút
    $("#btnSubmit").prop("disabled",true)
    $("#btnReset").prop("disabled",true)
    // disable drag
    $(".drag").draggable("disable")
    // disable drop
    $(".drop").droppable("disable")
}

function enableQuestion(){
    $("#btnSubmit").prop("disabled",false)
    $("#btnReset").prop("disabled",false)
}

// TRUE FALSE click
$(document).on("click", ".answer-btn", function () {
    let val = $(this).data("value")
    // highlight
    $(".answer-btn").removeClass("selected")
    $(this).addClass("selected")
    // disable
    $(".answer-btn").prop("disabled",true)

    let answer = $(this).data("answer")
    submitAnswer(answer)
})

// CHOICE click
$(document).on("click", ".answer-choice", function () {
    let val = $(this).data("id")
    $(".answer-choice").removeClass("selected")
    $(this).addClass("selected")
    $(".answer-choice").css("pointer-events","none")

    let answer = $(this).data("answer")
    submitAnswer(answer)
})

$(document).on("click","#btnReset",function(){
    $(".drop").html("")
})

// DRAG submit
$(document).on("click","#btnSubmit",function(){
    let arr = []
    $(".drop").each(function(){
        let id = $(this).find("img").data("id")
        arr.push(id)
    })
    submitAnswer(arr)
    disableQuestion()
})

// submit answer
function submitAnswer(answer) {
    // khóa không cho bấm lại
    $(".answer-btn").prop("disabled", true)
    $.post("api/submit.php", {
        team_id: TEAM_ID,
        answer: JSON.stringify(answer)
    })
}

// load lần đầu
loadQuestion();

// realtime polling
setInterval(function () {
    loadGame()
}, 500)