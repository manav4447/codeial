import { urlencoded } from "express";

function toggleFriend(toggleFriendBtn){
    console.log(toggleFriendBtn);
    $(toggleFriendBtn).click(function(e){
        e.preventDefault();
        $.ajax({
       type: 'GET',
       url: $(toggleFriendBtn).attr("href"),
       success : function(data){
           if(data.deleted){
               $(toggleFriendBtn).html("Remove Friend");
           }else{
               $(toggleFriendBtn).html("Add Friend");
           }
       },
       error: function(err){
        console.log(err.responseText);
    }

        })

        
    })
}

toggleFriend($(" .toggleFriendBtn"));