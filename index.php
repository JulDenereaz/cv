<?php
require_once 'src/config.php';

$pageTitle = 'Accueil';
$pageDescription = 'Portfolio personnel de ' . SITE_AUTHOR . ' - Découvrez mes jeux, projets et services';

// Get available games and services
$games = getAvailableGames();
$services = getServices();

// Include header
require_once 'src/includes/header.php';
?>

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
            // Generate appropriate icon based on game category
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

<?php
// Include footer
require_once 'src/includes/footer.php';
?>
