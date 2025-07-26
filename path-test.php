<?php
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "Current Script: " . $_SERVER['SCRIPT_FILENAME'] . "<br>";
echo "Request URI: " . $_SERVER['REQUEST_URI'] . "<br>";
echo "Current Working Directory: " . getcwd() . "<br>";

$cssFile = $_SERVER['DOCUMENT_ROOT'] . '/assets/css/main.css';
echo "Looking for CSS at: " . $cssFile . "<br>";
echo "CSS file exists: " . (file_exists($cssFile) ? 'YES' : 'NO') . "<br>";

$relativeCssFile = './assets/css/main.css';
echo "Relative CSS file exists: " . (file_exists($relativeCssFile) ? 'YES' : 'NO') . "<br>";
?>
