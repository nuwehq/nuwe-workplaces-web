$(function(){

  $.get('/teams', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var teamData = form.serialize();

    $('.alert').hide();

    $.ajax({
      type: 'POST', url: '/teams', data: teamData
    })
    .error(function() {
      $('.alert').show();
    })
    .success(function(teamName){
      appendToList([teamName]);
      form.trigger('reset');
    });
  });

  function appendToList(teams) {
    var list = [];
    var content, team;
    for(var i in teams){
      team = teams[i];
      content = '<a href="/teams/'+team+'">'+team+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-team="'+team+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.team-list').append(list)
  }


  $('.team-list').on('click', 'a[data-team]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/teams/' + target.data('team')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});