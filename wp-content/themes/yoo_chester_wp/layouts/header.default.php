<?php if ($this['widgets']->count('menu + offcanvas + logo-small')) : ?>
<div class="tm-navbar-container" <?php echo $args['sticky'] ? 'data-uk-sticky="{media: 768, clsactive:\'uk-active uk-navbar-attached\'}"' : ''; ?>>
    <div class="uk-position-relative uk-text-center uk-container uk-container-center">

        <?php if ($this['widgets']->count('logo-small + offcanvas')) : ?>
        <div class="tm-navbar-left uk-flex uk-flex-middle">
            <?php if ($this['widgets']->count('logo-small')) : ?>
            <a class="tm-logo-small uk-visible-large" href="<?php echo $this['config']->get('site_url'); ?>"><?php echo $this['widgets']->render('logo-small'); ?></a>
            <?php endif; ?>

            <?php if ($this['widgets']->count('offcanvas')) : ?>
            <a href="#offcanvas" class="uk-navbar-toggle uk-hidden-large" data-uk-offcanvas></a>
            <?php endif; ?>
        </div>
        <?php endif; ?>

        <nav class="tm-navbar uk-navbar">

            <?php if ($this['widgets']->count('menu')) : ?>
            <?php echo $this['widgets']->render('menu'); ?>
            <?php endif; ?>

            <?php if ($this['widgets']->count('logo-small')) : ?>
            <a class="tm-logo-small uk-hidden-large" href="<?php echo $this['config']->get('site_url'); ?>"><?php echo $this['widgets']->render('logo-small'); ?></a>
            <?php endif; ?>

        </nav>

        <?php if ($this['widgets']->count('search + headerbar')) : ?>
        <div class="tm-navbar-right uk-flex uk-flex-middle">
            <?php if ($this['widgets']->count('search')) : ?>
            <div class="uk-visible-large"><?php echo $this['widgets']->render('search'); ?></div>
            <?php endif; ?>

            <?php if ($this['widgets']->count('headerbar')) : ?>
            <?php echo $this['widgets']->render('headerbar'); ?>
            <?php endif; ?>
        </div>
        <?php endif; ?>

    </div>
</div>
<?php endif; ?>
