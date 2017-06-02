var socket = io();

 var user = "<%= user %>";

  socket.on('connect',function(){
    socket.emit('session',user);
  });


  $(document).ready(function () {
  	$('#run').click(function(){
  		socket.emit('runCode', $("#code").val());
  	});

  	$('#clear').click(function(){
  		$('#code').val('');
  		$('#result').html('');
  	});

    $('#login').click(function(){
  var url = "/" + $('#sessionName').val()+ "/" + $('#userName').val();
  window.location.href = url;
  return false;
});

$('#roomName').on({
  keydown: function(e){
    if(e.which === 32)
      return false;
  }
});

$('#userName').on({
  keydown: function(e){
    if(e.which === 32)
      return false;
  }
});
  });

socket.on('result',function(msg){
  $('#result').append(msg,"<br>");
})
