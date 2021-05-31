;(function(global) {
    
    // 'new' an object
    var Basket = function(item, quantity, desc) {
        return new Basket.init(item, quantity, desc);   
    }
    
  
    
    
    // Array to store items
    var basket = [];




    
    // prototype holds methods (to save memory space)
    Basket.prototype = {
        
        // Function to add items
        Add : function() {
            this.no_bask += basket.length;
            basket.push({no_bask: this.no_bask, item: this.item, quantity: this.quantity, desc: this.desc});
        },

        // Function to get item from array
        show : function(){
            return basket;
        },

        // Function to remove item from array
        Rem : function(id){
            basket.splice(id, 1);
        }
        
     
        
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Basket.init = function(item, quantity, desc) {
        
        var self = this;
        this.no_bask = 0;
        self.item = item || '';
        self.quantity = quantity || '';
        self.desc = desc || '';
        
        //self.validate();
        
    }
    
    Basket.init.prototype = Basket.prototype;
    
    // attach our Basket to the global object, and provide a shorthand '$G' 
    global.Basket = global.G$ = Basket;
    
}(window));





// Outside function to add item to UI
var add = function (e) {
    // Prevent the button from submission
    e.preventDefault(); 

    // Get all the values from the form
    var item = document.getElementById('item').value;
    var quantity = document.getElementById('quantity').value;
    var desc = document.getElementById('desc').value;

    // Initialize the Basket object
    var g = G$(item, quantity, desc);

    // Add the items to the array
    g.Add();

    // Function to create a list element to list the items
    function createMenuItem(name) {
        let li = document.createElement('li');
        li.innerHTML = name;
        return li;
    }
    // get the ul#menu
    const menu = document.querySelector('#menu');
    // Fetch the items
    var basket = g.show();
    // Empty the innerHTML of the List (ul)
    menu.innerHTML = '';

    // Populate the data to the list (ul li)
    for (i = 0; i < basket.length; i++){
        menu.append(createMenuItem(
            '<button class="btn-item" onclick="remItem('+i+')" id="rem'+i+'">remove</button><button class="btn-item" onclick="Completed('+i+')">done</button><h2 class="item">'+basket[i].item+'</h2><p>'+basket[i].desc+'</p><p>Quatity: x'+basket[i].quantity+'</p>'
        ));
    }

    // For testing in the console
    console.log(g.show());

}


//  function to remove item from the array
function remItem (id) {
    // Initialize the Basket object
    var g = G$();

    // Remove the item with the id on the list
    g.Rem(id);

    // Fetch the items from the array
    var basket = g.show();

    // Refresh the UI for Listing the items
    function createMenuItem(name) {
        let li = document.createElement('li');
        li.innerHTML = name;
        return li;
    }
    // get the ul#menu
    const menu = document.querySelector('#menu');
    menu.innerHTML = '';
    for (i = 0; i < basket.length; i++){
        menu.append(createMenuItem(
            '<button class="btn-item" onclick="remItem('+i+')" id="rem'+i+'">remove</button><button class="btn-item" onclick="Completed('+i+')">done</button><h2 class="item">'+basket[i].item+'</h2><p>'+basket[i].desc+'</p><p>Quatity: x'+basket[i].quantity+'</p>'
        ));
    }

    console.log(id);
    
}

function Completed(id){
    var g = G$();
    var basket = g.show();
    alert(basket[id].item+ " Completed");
}
document.getElementById('sub-bas').addEventListener('click', add);








