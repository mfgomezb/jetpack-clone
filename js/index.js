window.onload = function() {
    var game = new Game("canvas");

    function takeName() {
      return inputValue = $(".form-control").val();
    }
    $(".btn-restart").attr('disabled', true);

    $(".btn-add").click(function() {
      playerName = takeName();
      // console.log(playerName);
      game.storeScore(playerName);
    });

    $(".btn-start").click(function() {
      $(this).attr('disabled', true);
      $(".btn-restart").attr('disabled', false);
      $("#start-bg" ).hide()
      game.start();
    });

    $(".btn-restart").click(function() {
      location.reload()
    });


    var tableHeadContent = ["Player","Result"]
    var results = localStorage
    var table = $('<table>').attr('class', 'table table-striped table-dark');
    var trow = $('<tr>')
    var thead = $('<thead>').attr('class','thead-dark')
    var tbody = $('<tbody>')
   

    for (var i = 0; i < 2; i++){
      var thRow = $('<th>').attr('scope', 'col').text(tableHeadContent[i]);
      trow.append(thRow);
    }

    keysSorted = Object.keys(results).sort(function(a,b){return results[b]-results[a]})

    keysSorted.forEach(function(key){
        var row = $('<tr>').addClass('score')
        var playerRow = $('<td>').addClass('player_name').text(key);
        var scoreRow = $('<td>').addClass('player_score').text(results[key]);
        row.append(playerRow, scoreRow)
        tbody.append(row);
    });
    
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