<?php
require_once 'src/config.php';

$pageTitle = 'Simple Test';
$games = getAvailableGames();
$services = getServices();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Simple Test - Pluton</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 2rem;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .header h1 {
            font-size: 3rem;
            color: #6366f1;
            margin-bottom: 1rem;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }
        
        .card {
            background: #334155;
            border-radius: 1rem;
            padding: 2rem;
            text-decoration: none;
            color: inherit;
            border: 1px solid #475569;
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-8px);
        }
        
        .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .card-description {
            color: #cbd5e1;
            margin-bottom: 1rem;
        }
        
        .card-category {
            background: #1e293b;
            color: #94a3b8;
            padding: 0.25rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <header class="header">
        <h1><?php echo SITE_NAME; ?></h1>
        <p><?php echo SITE_TAGLINE; ?></p>
    </header>
    
    <main>
        <h2 style="text-align: center; margin-bottom: 2rem;">Services</h2>
        <div class="grid" style="margin-bottom: 3rem;">
            <?php foreach ($services as $key => $service): ?>
            <a href="<?php echo htmlspecialchars($service['url']); ?>" class="card">
                <div class="card-icon" style="background: <?php echo $service['color']; ?>;">
                    <i class="fas fa-<?php echo $service['icon']; ?>"></i>
                </div>
                <h3 class="card-title"><?php echo htmlspecialchars($service['name']); ?></h3>
                <p class="card-description"><?php echo htmlspecialchars($service['description']); ?></p>
            </a>
            <?php endforeach; ?>
        </div>
        
        <h2 style="text-align: center; margin-bottom: 2rem;">Jeux</h2>
        <div class="grid">
            <?php foreach (array_slice($games, 0, 6) as $folder => $game): ?>
            <a href="/games/<?php echo htmlspecialchars($folder); ?>/" class="card">
                <div class="card-icon" style="background: <?php echo $game['color']; ?>;">
                    <i class="fas fa-gamepad"></i>
                </div>
                <h3 class="card-title"><?php echo htmlspecialchars($game['name']); ?></h3>
                <p class="card-description"><?php echo htmlspecialchars($game['description']); ?></p>
                <span class="card-category"><?php echo htmlspecialchars($game['category']); ?></span>
            </a>
            <?php endforeach; ?>
        </div>
    </main>
    
    <footer style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #475569;">
        <p>&copy; <?php echo SITE_YEAR; ?> <?php echo SITE_AUTHOR; ?>. Tous droits réservés.</p>
    </footer>
</body>
</html>
