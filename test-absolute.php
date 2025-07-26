<?php
require_once 'src/config.php';

$pageTitle = 'Accueil (Absolute Paths)';
$games = getAvailableGames();
$services = getServices();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test - Pluton</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Try absolute path -->
    <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1><?php echo SITE_NAME; ?></h1>
            <p><?php echo SITE_TAGLINE; ?></p>
        </div>
    </header>
    
    <main class="container">
        <section class="section-header">
            <h2 class="section-title">Services</h2>
        </section>
        
        <div class="services-grid">
            <?php foreach ($services as $key => $service): ?>
            <a href="<?php echo htmlspecialchars($service['url']); ?>" class="service-card">
                <div class="service-icon" style="background: linear-gradient(135deg, <?php echo $service['color']; ?>, <?php echo $service['color']; ?>dd);">
                    <i class="fas fa-<?php echo $service['icon']; ?>"></i>
                </div>
                <h3 class="service-title"><?php echo htmlspecialchars($service['name']); ?></h3>
                <p class="service-description"><?php echo htmlspecialchars($service['description']); ?></p>
            </a>
            <?php endforeach; ?>
        </div>
        
        <section class="section-header">
            <h2 class="section-title">Jeux</h2>
        </section>
        
        <div class="grid">
            <?php foreach (array_slice($games, 0, 6) as $folder => $game): ?>
            <a href="/games/<?php echo htmlspecialchars($folder); ?>/" class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, <?php echo $game['color']; ?>, <?php echo $game['color']; ?>dd);">
                    <i class="fas fa-gamepad"></i>
                </div>
                <h3 class="card-title"><?php echo htmlspecialchars($game['name']); ?></h3>
                <p class="card-description"><?php echo htmlspecialchars($game['description']); ?></p>
                <span class="card-category"><?php echo htmlspecialchars($game['category']); ?></span>
            </a>
            <?php endforeach; ?>
        </div>
    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; <?php echo SITE_YEAR; ?> <?php echo SITE_AUTHOR; ?>. Test version.</p>
        </div>
    </footer>
</body>
</html>
