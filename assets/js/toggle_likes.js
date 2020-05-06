// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({//curly braces is for the object cration
                type: 'POST',
                url: $(self).attr('href'),
          
            success: function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }
            }})
//here these two lines; why have we taken them

                //  out here were are setting the attribute data-likes to the current number of likes.
                $(self).attr('data-likes', likesCount);

                //now this will change the html text in the browser to that current likes.
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
