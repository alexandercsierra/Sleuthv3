var numOfGuestNames = 7;
var originalGuestList = [];
var murderedGuest = "";
var murderer = "";
var murderWeapon = "";
var murderRoom = "";
var guestList = [];
var roomGuest = "";
var roomGuestPair = "";
var roomsList = ["Lounge", "Dining Room", "Kitchen", "Ballroom", "Conservatory", "Billiard Room", "Library", "Study", "Hall"];
var weaponsList = ["candlestick", "rope", "lead pipe", "wrench", "revolver", "knife"];
var randomWeaponsList = [];
var roomWeaponsList = [];
var currentRoom = "";
var currentWeapon = "";
var guestPairs = [];
var clickCount = 0;
var floorStatus = "";
var userFinalAnswer = [];



var startButton = document.querySelector("#startButton");
var resetButton = document.querySelector("#resetButton");
var enterGuestNames = document.querySelector("#enterGuestNames");
var guestNameBtn = document.querySelector("#guestNameBtn");
var addGuest = document.querySelector("#addGuest");
var printList = document.querySelector("#printList");
var cont1Btn = document.querySelector("#continue1");
var murderDiv = document.querySelector("#murderDiv");
var declarationOfMurder = document.querySelector("#declarationOfMurder");
var guestCounter = document.querySelector("#guestCounter");
var guestH1 = document.querySelector("#guestH1");
var testBtn = document.querySelector("#test");
var loungeBtn = document.querySelector("#loungeBtn");
var diningRoomBtn = document.querySelector("#diningRoomBtn");
var kitchenBtn = document.querySelector("#kitchenBtn");
var room = document.querySelector("#room");
var roomDescription = document.querySelector("#roomDescription");
var goBack = document.querySelector("#goBack");
var question = document.querySelector("#question");
var examineWeapon = document.querySelector("#examineWeapon");
var examineFloor = document.querySelector("#examineFloor");
var stalker = document.querySelector("#stalker");
var suspicious = document.querySelector("#suspicious");
var accuseBtn = document.querySelector("#accuseBtn");
var accuse = document.querySelector("#accuse");
var finalAccusation = document.querySelector("#finalAccusation");
var finalAccusationSection = document.querySelector("#finalAccusationSection");
var whoIsMurderer = document.querySelector("#whoIsMurderer");
var whoIsMurdererBtn = document.querySelector("#whoIsMurdererBtn");



//when start button clicked, replace with reset button
startButton.addEventListener("click", function(){
	this.classList.add("hide");
	resetButton.classList.remove("hide");
	toggleHide(enterGuestNames);
	weaponAssignments();
	murderRoom = roomsList[5];
});

resetButton.addEventListener("click", function(){
	window.location.reload();
})

//adds input to guests array on click of button
guestNameBtn.addEventListener("click", function(){
	addAGuest();



});

//adds input to guests array on enter
addGuest.addEventListener('keypress', function(e){
	if (e.key === 'Enter') {
        addAGuest();
	}
});


//adds functionality to first continue button chooses murderer victim and weapon
cont1Btn.addEventListener("click", function(){
    toggleHide(cont1Btn);
    toggleHide(enterGuestNames);
    toggleHide(murderDiv);
    chooseMurder();
    murderWeapon = randomizeWeapon();
    assignInitGuestPairings();
    declarationOfMurder.textContent = "You stand in front of the estate of the late " + murderedGuest + ". Where would you like to go?";
});


//click button to input final accusation
accuseBtn.addEventListener("click", function(){
	toggleHide(accuse);
	toggleHide(finalAccusation);
});

whoIsMurderer.addEventListener('keypress', function(e){
	if (e.key === 'Enter'){
		if (userFinalAnswer[0] = undefined){
			userFinalAnswer.push(whoIsMurderer.value);
		}
	}
});


//goes to lounge
loungeBtn.addEventListener("click", function(){
	currentRoom = "Lounge";
	enterRoom();
	roomDescription.textContent = "You have entered the Lounge. You see " + roomGuest + " lurking in the corner. The " + currentWeapon + " lies on the table.";
});

//goes to diningRoom
diningRoomBtn.addEventListener("click", function(){
	currentRoom = "Dining Room";
	enterRoom();
	roomDescription.textContent = "You have entered the Dining Room. You see " + roomGuest + " snacking on some leftovers. The " + currentWeapon + " lies on the table.";
});

//goes to Kitchen
kitchenBtn.addEventListener("click", function(){
	currentRoom = "Kitchen";
	enterRoom();
	roomDescription.textContent = "You have entered the kitchen. You see " + roomGuest + " in the pale light of the open refrigerator rummaging. The " + currentWeapon + " lies on the counter.";
});

//back button to room select
goBack.addEventListener("click", function(){
	clickCount++;
	toggleHide(roomChoice);
	toggleHide(room);
	toggleHide(murderDiv);
	declarationOfMurder.textContent = "You stand at the estate of " + murderedGuest + ". Where would you like to go now?";
	if (clickCount > 15) {
		finalAccusationSection.classList.remove("hide");
	}
})

//question suspect button
question.addEventListener("click", function(){
	clickCount++;
	if (roomGuest !== "no one"){
		getPair();
		roomDescription.textContent = roomGuest + " turns to you and says: \"I was with " + roomGuestPair + " the entire night. Not that it's any of your business.\"";
	} else {
		roomDescription.textContent = "There is no one to question.";
	}
});

examineWeapon.addEventListener("click", function(){
	clickCount++;
	if (currentWeapon !== murderWeapon && currentWeapon !== "q-w34095-340958-sdf0983f"){
		roomDescription.textContent = "You have examined the " + currentWeapon + ". Nothing suspicious about it."; 
	} else if (currentWeapon === murderWeapon){
		roomDescription.textContent = "There's blood on it! This must be the murder weapon!";
	} else if (currentWeapon === "q-w34095-340958-sdf0983f"){
		roomDescription.textContent = "There's no weapon to examine";
	}
});

examineFloor.addEventListener("click", function(){
	clickCount++;
	roomDescription.textContent = floorStatus;
})

// testBtn.addEventListener("click", function(e){
// 	e.preventDefault();
// 	console.log(document.querySelector("#roomChoice").value);
// })

// document.querySelector("#roomChoice").onsubmit = function(){

// }



//chooses someone to be murdered and a murderer
function chooseMurder () {
    murderedGuest = originalGuestList[Math.floor(Math.random() * originalGuestList.length)];
    guestList = originalGuestList.filter(f => f !== murderedGuest);
    murderer = guestList[Math.floor(Math.random() * guestList.length)];
}


//randomly assigns guest to a room
function randomizeRoomGuest (){
	roomGuest = guestList[Math.floor(Math.random() * 10)];
	if (roomGuest === undefined){
		roomGuest = "no one";
	}
}

//randomize weapon
function randomizeWeapon(){
	return weaponsList[Math.floor(Math.random() * weaponsList.length)];
}

//randomize remaining weapons after filtering out for each room
function randomizeRemainingWeapons(){
	return roomWeaponsList[Math.floor(Math.random() * (roomWeaponsList.length))];
}

//randomizes the entire weapons list to then be assigned to a room
function randomizeWeaponList(){
	for (let i = weaponsList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [weaponsList[i], weaponsList[j]] = [weaponsList[j], weaponsList[i]];
  }
}

//randomizes the entire rooms list to then be assigned to a weapon
function randomizeRoomsList(){
	for (let i = roomsList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [roomsList[i], roomsList[j]] = [roomsList[j], roomsList[i]];
  }
}


//assigning weapons to rooms
function weaponAssignments() {
	randomizeRoomsList();
	roomsList.forEach(function(e){
		roomWeaponsList.push([e, "q-w34095-340958-sdf0983f"]);
	});
	randomizeWeaponList();
	for (let i=0; i<weaponsList.length; i++){
		roomWeaponsList[i][1] = weaponsList[i];
	}

}


//pairs up guests
function assignInitGuestPairings(){
	//creates an array without the murderer
	var notMurderer = guestList.filter(f => f !== murderer);

	//pick random guest to be alone and remove them from array
	var lonelyGuest = notMurderer[Math.floor(Math.random() * notMurderer.length)];
	var onlyPairs = notMurderer.filter(f => f !== lonelyGuest);

	//creates nested arrays inside of guestPairs that contain each innocent guest and a nonesense value
	guestPairs.push([onlyPairs[0], "230492358208sa0df83020fj8302"]);
	guestPairs.push([onlyPairs[1], "230492358208sa0df83020fj8302"]);

	//gets rid of first two values in the array so they can be appropriately matched
	onlyPairs.splice(0, 2);

	//randomly chooses a remaining guest and matches them up
	var randoGuest = onlyPairs[Math.floor(Math.random() * onlyPairs.length)];
	guestPairs[0][1] = randoGuest;
	var lastValue = onlyPairs.filter(f => f !== guestPairs[0][1]);
	guestPairs[1][1] = lastValue[0];


	//assigns lonely guest to the value of "alone"
	guestPairs.push([lonelyGuest, "alone"]);

	//assigns the murderer a random partner
	guestPairs.push([murderer, notMurderer[Math.floor(Math.random() * notMurderer.length)]]);

}

//retrieves appropriate pair from the guestPairs array
function getPair(){
	for (var i=0; i<3; i++){
		if (roomGuest === guestPairs[i][0]){
			if (guestPairs[i][1] != "alone"){
				roomGuestPair = guestPairs[i][1];
			} else {
				roomGuestPair = "only myself";
			}
		} else if (roomGuest === guestPairs[i][1]){
			roomGuestPair = guestPairs[i][0];
		} else if (roomGuest === murderer){
			roomGuestPair = guestPairs[3][1];
		}
	}
}

//settings change when clicking a room button, also changes status based on number of clicks
function enterRoom(){
	toggleHide(room);
	toggleHide(roomChoice);
	// toggleHide(declarationOfMurder);
	toggleHide(murderDiv);
	randomizeRoomGuest();
	//keeps track of how far along in the game you are and changes murderer behavior
	clickCount++;
	if (clickCount > 20 && clickCount < 30){
		suspicious.classList.remove("hide");
	} else if (clickCount >= 30){
		suspicious.classList.add("hide");
		stalker.classList.remove("hide");
	}

	//determines which weapon goes into a room based on the roomsList and weaponsList arrays
	for (i=0; i<roomsList.length; i++){
		if (roomsList[i] === currentRoom){
			currentWeapon = weaponsList[i];
		}
	}
	//if there is no weapon assigned to that room it assigns it to be nothing
	if (currentWeapon === "q-w34095-340958-sdf0983f" || currentWeapon === undefined){
		currentWeapon = "nothing";
	}

	for (i=0; i<roomsList.length; i++){
		if (roomsList[i] === currentRoom && currentRoom === murderRoom){
			floorStatus = "There's blood on the floor! This must be where the murder happened!";
		} else if (roomsList[i] === currentRoom && currentRoom !== murderRoom){
			floorStatus = "There is nothing on the floor.";
		}
	}

}


//toggles the hide class
function toggleHide(el){
	el.classList.toggle("hide");
}


// adds guest to guestlist
function addAGuest (){
	if (originalGuestList.length < 6) {
		originalGuestList.push(addGuest.value);
		printList.textContent = "You have added: " + originalGuestList;
        addGuest.value = "";
        numOfGuestNames -= 1;
		guestCounter.textContent = numOfGuestNames;
	} else if (originalGuestList.length = 6){
		if (addGuest.value != ""){
			originalGuestList.push(addGuest.value);
			printList.textContent = "The final guest list is: " + originalGuestList;
			addGuest.value="";
			addGuest.disabled=true;
			guestNameBtn.disabled=true;
			toggleHide(guestH1);
			toggleHide(addGuest);
			toggleHide(guestNameBtn);
			cont1Btn.classList.remove("hide");	
		}
	} 
}
