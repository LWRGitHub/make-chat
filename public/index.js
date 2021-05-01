$(document).ready( () => {
  // Connect to the socket.io server
  const socket = io.connect();

  $('#create-user-btn').click((e)=>{
    e.preventDefault();
    let username = $('#username-input').val();
    if(username.length > 0){
      //Emit to the server the new user
      socket.emit('new user', $(username).val());
      $('.username-form').remove();
      //Have the main page vidible
      $('.main-container').css('display', 'flex');
    }
  });

  $('#send-chat-btn').click((e) => {
    e.preventDefault();
    // Get the message text value
    let message = $('#chat-input').val();
    // Make sure it's not empty
    if(message.length > 0){
      // Emit the message with the current user to the server
      socket.emit('new message', {
        sender : currentUser,
        message : message,
      });
      $('#chat-input').val("");
    }
  });

  // socket listeners
  socket.on('new user', (username) => {
    console.log(`✋ ${username} has joined the chat! ✋`);
    // Add the new user to the online users div
    $('.users-online').append(`<div class="user-online">${username}</div>`)
  })

  //Output the new message
  socket.on('new message', (data) => {
    $('.message-container').append(`
      <div class="message">
        <p class="message-user">${data.sender}: </p>
        <p class="message-text">${data.message}</p>
      </div>
    `);
  })

})