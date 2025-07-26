<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Debug Test</h1>";

// Test 1: Basic PHP
echo "<p>✓ PHP is working</p>";

// Test 2: Config file
echo "<p>Testing config file...</p>";
try {
    require_once 'src/config.php';
    echo "<p>✓ Config loaded successfully</p>";
    echo "<p>Site name: " . SITE_NAME . "</p>";
} catch (Exception $e) {
    echo "<p>✗ Config error: " . $e->getMessage() . "</p>";
}

// Test 3: Functions
echo "<p>Testing functions...</p>";
try {
    $games = getAvailableGames();
    echo "<p>✓ Games function works. Found " . count($games) . " games</p>";
    
    $services = getServices();
    echo "<p>✓ Services function works. Found " . count($services) . " services</p>";
} catch (Exception $e) {
    echo "<p>✗ Function error: " . $e->getMessage() . "</p>";
}

// Test 4: Include files
echo "<p>Testing include files...</p>";
if (file_exists('src/includes/header.php')) {
    echo "<p>✓ Header file exists</p>";
} else {
    echo "<p>✗ Header file missing</p>";
}

if (file_exists('src/includes/footer.php')) {
    echo "<p>✓ Footer file exists</p>";
} else {
    echo "<p>✗ Footer file missing</p>";
}

// Test 5: Games directory
echo "<p>Testing games directory...</p>";
if (is_dir('games')) {
    $gamesDirs = glob('games/*', GLOB_ONLYDIR);
    echo "<p>✓ Games directory exists with " . count($gamesDirs) . " subdirectories</p>";
    foreach ($gamesDirs as $dir) {
        $gameName = basename($dir);
        $indexFile = $dir . '/index.html';
        if (file_exists($indexFile)) {
            echo "<p>&nbsp;&nbsp;✓ " . $gameName . " (has index.html)</p>";
        } else {
            echo "<p>&nbsp;&nbsp;✗ " . $gameName . " (no index.html)</p>";
        }
    }
} else {
    echo "<p>✗ Games directory missing</p>";
}

echo "<h2>End of Debug Test</h2>";
?>
