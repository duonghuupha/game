<!DOCTYPE html>
<html>

<head>
    <title>Title of the document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <link href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" rel="stylesheet">
    <link href="css/global.css" rel="stylesheet">
</head>

<body>
    <div class="container-fluid">
        <div class="row vh-100">
            <!-- LEFT -->
            <div class="col-2 p-2">
                <div class="team-box team1" id="team1">
                    <img src="icon1.png" width="40">
                    Đội 1
                </div>
                <div class="team-box team2" id="team2">
                    <img src="icon2.png" width="40">
                    Đội 2
                </div>
                <div class="team-box team3" id="team3">
                    <img src="icon3.png" width="40">
                    Đội 3
                </div>
                <div class="team-box team4" id="team4">
                    <img src="icon4.png" width="40">
                    Đội 4
                </div>
                <hr>
                <button id="btnStart" class="btn btn-primary w-100 big-btn mb-2">
                    MỞ
                </button>
                <button id="btnCheck" class="btn btn-success w-100 big-btn mb-2 d-none">
                    KIỂM TRA
                </button>
                <button id="btnNext" class="btn btn-warning w-100 big-btn d-none">
                    TIẾP
                </button>

            </div>
            <!-- RIGHT -->
            <div class="col-10 p-3">
                <div class="question-box h-100" id="questionArea">
                </div>
            </div>
        </div>
    </div>
</body>

</html>