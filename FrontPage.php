<!DOCTYPE html>
<html>

<head>
      <title>Boissons</title>
	  <meta charset="utf-8" />

	  <script type="text/javascript">
        function test(){
        document.leForm.innerHTML += ("<select id=select1> <option value='oui'>oui<option value='non'>non</select>");
        document.body.style.background = "#156478";
}


      	function test2(){

         // document.leForm.append("bonjour");
         var select = document.createElement("select");
         select.name = "select";
         select.id = "selectID";
         select.select="test2()";
         var option1 = document.createElement("option");
        option1.value = "kek1";
        option1.text = "kark";
        var option2 = document.createElement("option");
        option2.value = "kek2";
        option2.text = "kark2";
        select.appendChild(option1);
        select.appendChild(option2);
        document.leForm.appendChild(select);
          }

      	</script>

	<?php
		require_once("Donnees.inc.php");

		function afficherListeBoissons($tabl){
        			echo "<ol>";
        				foreach($tabl as $elem){
        					echo "<li>".$elem["titre"]."<ul>";
        					//echo "<img src='Photos/".$elem[titre].".jpg'>";
        					echo "<li>".$elem["ingredients"]."</li>";
        					echo "<li>".$elem["preparation"]."</li><br>";
        					echo "</ul></li>";
        				}
        			echo"</ol>";
        		}
	?>
</head>

<body>
<h1>TEST</h1>

<form name="leForm">
<select id="select" onChange="test()">
    <option value="">
    <?php
        require_once("Donnees.inc.php");
        foreach($Hierarchie["Aliment"]["sous-categorie"] as $elem){
            echo"<option value=".$elem.">".$elem;
        }
        ?>
</select>
</form>
<?php afficherListeBoissons($Recettes);?>
</body>
</html>
