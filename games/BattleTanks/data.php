<?php
$fp = fopen('data.txt', 'w');
fwrite($fp, $_POST["tanks"]);
fclose($fp);

?>


old function : 
// function sync(){
	// $.ajax({
		// type: "GET",
		// cache: false,
		// url: 'data.txt', 
		// dataType: "text",
		// success: function(data) {
			// servtank = JSON.parse("[" + data + "]")
			// servtank = servtank[0]
			// if(servtank.length != 0){
				// for(i=0; i<servtank.length; i++){
					// if(servtank[i].name == $("#username").val()){
						// servtank.splice(i, 1);
					// }
				// }
				// for(j=0; j<tank.length; j++){
					// if(tank[j].name == $("#username").val()){
						// servtank.unshift(tank[j])
						// tank = servtank
					// }
				// }
			// }
			// $.post("data.php", {tanks: JSON.stringify(tank)});

		// },
	// });
			
// }