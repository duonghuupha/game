<!DOCTYPE html>
<html>

<head>
    <title>Title of the document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <link href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css" rel="stylesheet">
    <link href="css/global.css" rel="stylesheet">
    <script>
        const TEAM_ID = new URLSearchParams(window.location.search).get("team") || 0;
    </script>
</head>

<body>
    <div class="container-fluid vh-100 d-flex align-items-center">
        <div class="w-100 question-box text-center" id="questionArea"></div>
    </div>
    <script src="js/app.js"></script>
</body>

</html>