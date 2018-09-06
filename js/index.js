window.onload = function () {

    function takeName() {
        return inputValue = $(".form-control").val();
    }
    level = 80;
    playerName = "";
    $(".btn-restart").attr('disabled', true);
    $(".btn-easy").attr('disabled', true);
    $(".btn-hard").attr('disabled', true);
    $(".btn-start").attr('disabled', true);
    $(".btn-add").click(function () {
        playerName = takeName();
        $(".btn-easy").attr('disabled', false);
        $(".btn-hard").attr('disabled', false);
    });
    $(".btn-easy").click(function () {
        level = 80
        $(".btn-start").attr('disabled', false);
    });
    $(".btn-hard").click(function () {
        level = 60
        $(".btn-start").attr('disabled', false);
    });
    $(".btn-start").click(function () {
        $(this).attr('disabled', true);
        $(".btn-restart").attr('disabled', false);
        $("#start-bg").hide()
        var game = new Game("canvas", level);
        game.storeScore(playerName);
        game.start();
    });
    $(".btn-restart").click(function () {
        location.reload()
    });
    var results = localStorage
    var tableHeadContent = ["Player", "Result"]
    var table = $('<table>').attr('class', 'table table-striped table-dark');
    var trow = $('<tr>')
    var thead = $('<thead>').attr('class', 'thead-dark')
    var tbody = $('<tbody>')

    for (var i = 0; i < 2; i++) {
        var thRow = $('<th>').attr('scope', 'col').text(tableHeadContent[i]);
        trow.append(thRow);
    }
    keysSorted = Object.keys(results).sort(function (a, b) {
        return results[b] - results[a]
    })
    for (var i = 0; i < 10; i++) {
        key = keysSorted[i];
        console.log(keysSorted[i], "array")
        console.log(typeof results[key], "localStorage")
        if (keysSorted[i] == undefined) {
            key = "-";
            result = "-";
        } else {
            key = keysSorted[i];
            result = results[key];
        }
        var row = $('<tr>').addClass('score')
        var playerRow = $('<td>').addClass('player_name').text(key);
        var scoreRow = $('<td>').addClass('player_score').text(result);
        row.append(playerRow, scoreRow)
        tbody.append(row);
    };
    thead.append(trow);
    table.append(thead);
    table.append(tbody);
    $('#results_table').append(table);
    // keysSorted = Object.keys(results).sort(function(a,b){return results[b]-results[a]})	
    // console.log(keysSorted);	
    // Object.keys(results).forEach(function(key) {	
    //   console.log(key + ': ' + results[key]);	
    // });	
};