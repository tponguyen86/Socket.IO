/**
* Created by TPOGroup
* Date: 6/1/2014 DD/MM/YYYY
* Time: 8:00 PM
*/

var Chat = {
    socket  : null,
    send    : function(){
        var data = {
            user    :document.getElementById("username").value,
            message :document.getElementById("message").value
        }
       document.getElementById("message").value="";
        Chat.socket.emit('send', data)
    },

    show    : function(data){
        var content = data.user + ':' + data.message;
        document.getElementById('Result').insertAdjacentHTML( 'beforeend', "<p>"+ content+"</p>");
    },

    greeting: function(data){
        alert(data);
    },

    start   : function(url){
        this.socket = io.connect(url);
        this.socket.on('new_message', this.show);
        this.socket.on('greeting', this.greeting);
    }

}
    Chat.start('/');

