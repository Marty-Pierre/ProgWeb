<!DOCTYPE html>
<html>

<head>
      <title>Boissons</title>
	  <meta charset="utf-8" />
        <link rel="stylesheet" href="feuillesDeStyle/FrontPageStyle.css">
      <script type="text/javascript" src="JSFiles/FrontPage.js"></script>
	  <script type="text/javascript">

        <!-- Utilisation de json_encode pour pouvoir utiliser les variables php en javascript -->
	   var hierarchie = <?php require_once("Donnees.inc.php");
       echo json_encode($Hierarchie);
	   ?>;

	   var recettes = <?php require_once("Donnees.inc.php");
        echo json_encode($Recettes);
        ?>;
	   </script>

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
