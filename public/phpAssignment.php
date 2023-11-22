<!DOCTYPE html>
<html>
<body>

<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  <label for="fname">Enter a word:</label><br>
  <input type="text" id="word" name="word"><br>
  <input type="submit">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field
  $word = $_POST['word'];
  if (empty($word)) {
    echo "Please enter a word.";
  } else {
    if($word == "fred"){
        echo "Cool!";
    }else{
        echo "Try the magic word.";
    }
  }
}
?>

</body>
</html>