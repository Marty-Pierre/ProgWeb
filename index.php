<!DOCTYPE html>
<html>

<head>
      <title>Boissons</title>
	  <meta charset="utf-8" />
        <link rel="stylesheet" href="feuillesDeStyle/FrontPageStyle.css">
      <script type="text/javascript" src="JSFiles/FrontPage.js"></script>

	  <script type="text/javascript">

	   var hierarchie = <?php require_once("Donnees.inc.php");
       echo json_encode($Hierarchie);
	   ?>;

	   var recettes = <?php require_once("Donnees.inc.php");
        echo json_encode($Recettes);
        ?>;
	   </script>

	<?php
		require_once("Donnees.inc.php");

		function afficherListeBoissons($tabl){

        			/*	foreach($tabl as $elem){
        					echo "<li>".$elem["titre"]."<ul>";
        					//echo "<img src='Photos/".$elem[titre].".jpg'>";
        					echo "<li>".$elem["ingredients"]."</li>";
        					echo "<li>".$elem["preparation"]."</li><br>";
        					echo "</ul></li>";
        				}
        			echo"</ol>";*/
        		}

	?>
</head>

<body>
<h1>BOISSONS</h1>

<div id="Selection_aliments">
<script type="text/javascript"> initListAliments();</script>
</div>
<br/><br/><br/><br/><br/><br/>

<div>
<table id="Tableau_recettes">
</table>
<script type="text/javascript"> updateTable("Aliment"); </script>
</div>

</body>
</html>
