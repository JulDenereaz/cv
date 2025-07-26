<?php
require_once 'src/config.php';

$pageTitle = 'Jeux';
$pageDescription = 'Collection complète de jeux développés par ' . SITE_AUTHOR;

// Get available games
$games = getAvailableGames();

// Sort games by category
$gamesByCategory = [];
foreach ($games as $folder => $game) {
    $gamesByCategory[$game['category']][$folder] = $game;
}

// Include header
require_once 'src/includes/header.php';
?>

<section class="section-header">
    <h2 class="section-title">Collection de Jeux</h2>
    <p class="section-subtitle">Découvrez tous mes jeux organisés par catégorie</p>
</section>

<?php foreach ($gamesByCategory as $category => $categoryGames): ?>
<section style="margin-bottom: 3rem;">
    <h3 style="font-size: 1.5rem; color: var(--text-primary); margin-bottom: 1.5rem; text-transform: capitalize;">
        <?php echo htmlspecialchars($category); ?> 
        <span style="color: var(--text-muted); font-size: 1rem; font-weight: normal;">
            (<?php echo count($categoryGames); ?> jeu<?php echo count($categoryGames) > 1 ? 's' : ''; ?>)
        </span>
    </h3>
    
    <div class="grid">
        <?php foreach ($categoryGames as $folder => $game): ?>
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
            <h4 class="card-title"><?php echo htmlspecialchars($game['name']); ?></h4>
            <p class="card-description"><?php echo htmlspecialchars($game['description']); ?></p>
            <span class="card-category"><?php echo htmlspecialchars($game['category']); ?></span>
        </a>
        <?php endforeach; ?>
    </div>
</section>
<?php endforeach; ?>

<!-- Back to home -->
<div style="text-align: center; margin: 3rem 0;">
    <a href="/" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: var(--primary-color); color: white; border-radius: var(--radius-lg); text-decoration: none; font-weight: 600; transition: all var(--transition-normal);">
        <i class="fas fa-home"></i>
        Retour à l'accueil
    </a>
</div>

<?php
// Include footer
require_once 'src/includes/footer.php';
?>
