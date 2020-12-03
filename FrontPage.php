<!DOCTYPE html>
<html>

<head>
      <title>Boissons</title>
	  <meta charset="utf-8" />
	<?php
		require_once("Donnees.inc.php");
		function afficherListeBoissons($tabl){
			echo "<ol>";
				foreach($tabl as $elem){
					echo "<li>".$elem[titre]."<ul>";
					//echo "<img src='Photos/".$elem[titre].".jpg'>";
					echo "<li>".$elem[ingredients]."</li>";
					echo "<li>".$elem[preparation]."</li><br>";
					echo "</ul></li>";
					echo "lol";
				}
			echo"</ol>";
		}
	?>
		
</head>
<body>
<h1>TEST</h1>
<?php afficherListeBoissons($Recettes); ?>
</body>
</html>
