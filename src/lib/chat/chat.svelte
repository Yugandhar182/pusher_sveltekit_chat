<script>
    import { onMount } from 'svelte';
    import Pusher from 'pusher-js';
    import { Input, Label, Helper, Button,Card } from 'flowbite-svelte';
    

    let username = '';
    let message = '';
    let messages = [];
    let joined = false; // Add a variable to track if the user has joined the chat
    let onlineUsers = [];

    onMount(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('0448764325c710daa90f', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', (data) => {
            messages = [...messages, data];
        });
    });

    
    const joinChat = () => {
        if (username.trim() !== '') {
            joined = true;
        }
    }

    const submit = async () => {
        // Check if the user has joined before allowing them to send a message
        if (joined) {
            await fetch('http://localhost:8000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    message
                })
            });

            message = '';
        } else {
            alert('Please join the chat first by entering a username.');
        }
    }

  
</script>

<main>
    <div class="main-container">
      {#if !joined}
      
        <h1 style="color: blue;">Enter your name to join the Chat</h1>
        <div>
          <input type="text" id="username" bind:value={username} placeholder="Enter your name" />
          <Button on:click={joinChat} type="submit" style="margin-right:420px;margin-top:10px" >Join</Button>
        </div>
      {:else}

     

        <div class="chat-container" >
          <div class="message-container" >
            {#each messages as messageData}
              <div class="chat-message {messageData.username === username ? 'sender' : 'receiver'}">
                <span class="chat-sender">{messageData.username}:</span>
                <span style="color: green;" class="chat-content">{messageData.message}</span>
               
              </div>
            {/each}
          </div>
          <div class="input-container">
            <input type="text" bind:value={message} />
            <div class="button-container">
            <button style="background-color: blue;" on:click={submit}>Send</button>
          </div>
          </div>
        </div>


    
       
      {/if}
   
    </div>
  </main>
  

<style>

.main-container{
  margin-left: 470px;
  margin-top: 10px;


}
.top-left-container {
        position: absolute;
        top: 10px;
        left: 10px;
    }
.online-users-container {
  border: 1px solid #8428e7;
  padding: 20px;
  width: 300px;
  height: 580px;
  margin-top:-600px ;
  margin-left: -300px;
  overflow: auto; 
  margin-right: 100px;
    

}



.input-container {
  position: absolute;
  bottom: 15px; 
  left: 10px;
  display: flex;
  align-items: center;
  width: 890px;
  margin-left:500px;
  }

.input-container input {
  margin-right: 5px;
  width: 750px;
  height: 30px;
  margin-bottom:25px;

}
.button-container{

  margin-bottom:1px;

}
.message-container {
  background-color: white;
   border-radius: 5px;
   margin-top: -200px;
    margin-right:100px;
    height: 590px;
    border: 1px solid #ccc;
  width:850px;
  margin: 10px;
  justify-content: center;
  padding: 20px;
  overflow: auto;
  }
.chat-message {
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 700px;
  margin-left:80px;
  height:30px;
 
}

.chat-sender {
  font-weight: bold;
  margin-right: 10px;
  font-size: 14px;

}



.chat-message.sender {
 
  color: black; 
}

.chat-message.receiver {
 
  color: blue;
}
.chat-content{
  font-size:17px;

}



button {
 
  background-color: red; 
  color: white; 
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 25px; 
}


</style>