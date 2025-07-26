<?php
// Simple test file
require_once 'src/config.php';

$pageTitle = 'Test';
$pageDescription = 'Simple test page';

$games = getAvailableGames();
$services = getServices();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Test - Pluton</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 2rem; }
        .card { border: 1px solid #ccc; padding: 1rem; margin: 1rem 0; }
    </style>
</head>
<body>
    <h1>Test Page</h1>
    <p>This is a simple test to verify PHP is working.</p>
    
    <h2>Services (<?php echo count($services); ?>):</h2>
    <?php foreach ($services as $key => $service): ?>
        <div class="card">
            <h3><?php echo htmlspecialchars($service['name']); ?></h3>
            <p><?php echo htmlspecialchars($service['description']); ?></p>
        </div>
    <?php endforeach; ?>
    
    <h2>Games (<?php echo count($games); ?>):</h2>
    <?php foreach ($games as $folder => $game): ?>
        <div class="card">
            <h3><?php echo htmlspecialchars($game['name']); ?></h3>
            <p><?php echo htmlspecialchars($game['description']); ?></p>
            <small>Category: <?php echo htmlspecialchars($game['category']); ?></small>
        </div>
    <?php endforeach; ?>
</body>
</html>
