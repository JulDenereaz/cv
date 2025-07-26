<?php
require_once 'src/config.php';

$pageTitle = 'Accueil';
$pageDescription = 'Portfolio personnel de ' . SITE_AUTHOR . ' - Découvrez mes jeux, projets et services';

// Get available games and services
$games = getAvailableGames();
$services = getServices();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?php echo $pageDescription; ?>">
    <meta name="author" content="<?php echo SITE_AUTHOR; ?>">
    
    <title><?php echo $pageTitle . ' | ' . SITE_NAME; ?></title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Inline CSS - This will definitely work */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #f8fafc;
            background: #0f172a;
            overflow-x: hidden;
        }
        
        body::before {
            content: '';
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: 
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 119, 255, 0.1) 0%, transparent 50%);
            pointer-events: none;
            z-index: -1;
        }
        
        .header {
            padding: 2rem 1.5rem;
            text-align: center;
            position: relative;
            z-index: 10;
        }
        
        .header h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
            letter-spacing: -0.025em;
        }
        
        .header p {
            font-size: 1.125rem;
            color: #cbd5e1;
            font-style: italic;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }
        
        .section-header {
            text-align: center;
            margin: 4rem 0 3rem;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #f8fafc;
            margin-bottom: 1rem;
        }
        
        .section-subtitle {
            font-size: 1.125rem;
            color: #cbd5e1;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }
        
        .service-card {
            background: linear-gradient(135deg, #334155, #1e293b);
            border-radius: 1rem;
            padding: 3rem;
            text-align: center;
            position: relative;
            overflow: hidden;
            border: 1px solid #475569;
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .service-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
            border-color: #6366f1;
        }
        
        .service-icon {
            width: 80px;
            height: 80px;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 1.5rem;
            color: white;
        }
        
        .service-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #f8fafc;
        }
        
        .service-description {
            color: #cbd5e1;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            padding: 3rem 0;
        }
        
        .card {
            background: #334155;
            border-radius: 1rem;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border: 1px solid #475569;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 4px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            transform: scaleX(0);
            transition: transform 0.3s ease;
            transform-origin: left;
        }
        
        .card:hover::before { transform: scaleX(1); }
        
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
            border-color: #6366f1;
        }
        
        .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
            color: white;
        }
        
        .card:hover .card-icon { transform: scale(1.1); }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #f8fafc;
        }
        
        .card-description {
            color: #cbd5e1;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
        }
        
        .card-category {
            display: inline-block;
            background: #1e293b;
            color: #94a3b8;
            padding: 0.25rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.05em;
        }
        
        .footer {
            text-align: center;
            padding: 4rem 1.5rem;
            color: #94a3b8;
            border-top: 1px solid #475569;
            margin-top: 4rem;
        }
        
        @media (max-width: 768px) {
            .header { padding: 1.5rem; }
            .header h1 { font-size: 2.5rem; }
            .grid { grid-template-columns: 1fr; gap: 1.5rem; padding: 2rem 0; }
            .services-grid { grid-template-columns: 1fr; gap: 1.5rem; }
            .section-title { font-size: 2rem; }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .card { animation: fadeInUp 0.5s ease-out; }
        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }
        .card:nth-child(6) { animation-delay: 0.6s; }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1><?php echo SITE_NAME; ?></h1>
            <p><?php echo SITE_TAGLINE; ?></p>
        </div>
    </header>
    
    <main class="container">
        <!-- Services Section -->
        <?php if (!empty($services)): ?>
        <section class="section-header">
            <h2 class="section-title">Services</h2>
            <p class="section-subtitle">Accédez à mes services personnels et serveurs</p>
        </section>

        <div class="services-grid">
            <?php foreach ($services as $key => $service): ?>
            <a href="<?php echo htmlspecialchars($service['url']); ?>" class="service-card" target="_blank" rel="noopener noreferrer">
                <div class="service-icon" style="background: linear-gradient(135deg, <?php echo $service['color']; ?>, <?php echo $service['color']; ?>dd);">
                    <i class="fas fa-<?php echo $service['icon']; ?>"></i>
                </div>
                <h3 class="service-title"><?php echo htmlspecialchars($service['name']); ?></h3>
                <p class="service-description"><?php echo htmlspecialchars($service['description']); ?></p>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <!-- Games Section -->
        <?php if (!empty($games)): ?>
        <section class="section-header">
            <h2 class="section-title">Jeux</h2>
            <p class="section-subtitle">Collection de jeux développés avec passion</p>
        </section>

        <div class="grid">
            <?php foreach ($games as $folder => $game): ?>
            <a href="/games/<?php echo htmlspecialchars($folder); ?>/" class="card" tabindex="0">
                <div class="card-icon" style="background: linear-gradient(135deg, <?php echo $game['color']; ?>, <?php echo $game['color']; ?>dd);">
                    <?php
                    $icons = [
                        'puzzle' => 'fas fa-puzzle-piece',
                        'arcade' => 'fas fa-gamepad',
                        'card' => 'fas fa-heart',
                        'strategy' => 'fas fa-chess',
                        'adventure' => 'fas fa-map',
                        'skill' => 'fas fa-keyboard',
                        'utility' => 'fas fa-clock',
                        'creative' => 'fas fa-palette'
                    ];
                    $iconClass = $icons[$game['category']] ?? 'fas fa-play';
                    ?>
                    <i class="<?php echo $iconClass; ?>"></i>
                </div>
                <h3 class="card-title"><?php echo htmlspecialchars($game['name']); ?></h3>
                <p class="card-description"><?php echo htmlspecialchars($game['description']); ?></p>
                <span class="card-category"><?php echo htmlspecialchars($game['category']); ?></span>
            </a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; <?php echo SITE_YEAR; ?> <?php echo SITE_AUTHOR; ?>. Tous droits réservés.</p>
        </div>
    </footer>
</body>
</html>
