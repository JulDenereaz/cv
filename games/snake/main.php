<?php

echo htmlspecialchars($_POST["line"]);
$towrite = htmlspecialchars($_POST["line"]);
$file = 'hs.txt';
$current = file_get_contents($file);
$current .= $towrite;
file_put_contents($file, $current);

?>
