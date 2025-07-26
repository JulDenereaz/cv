    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; <?php echo SITE_YEAR; ?> <?php echo SITE_AUTHOR; ?>. Tous droits réservés.</p>
        </div>
    </footer>
    
    <!-- Main JavaScript -->
    <script src="/assets/js/main.js"></script>
    
    <!-- Additional JavaScript if specified -->
    <?php if (isset($additionalJS)): ?>
        <?php foreach ($additionalJS as $js): ?>
            <script src="<?php echo htmlspecialchars($js); ?>"></script>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>
