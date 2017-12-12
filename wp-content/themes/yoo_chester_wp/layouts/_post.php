<?php if ($this['config']->get('article_style')=='tm-article-blog') : ?>

<article id="item-<?php the_ID(); ?>" class="uk-article tm-article <?php if (isset($is_column_item) && $is_column_item) echo 'tm-article-column-item'; ?>" data-permalink="<?php the_permalink(); ?>">

    <div class="tm-article-date uk-text-center uk-align-left uk-hidden-small">
        <?php printf('<span class="tm-article-date-day">'.get_the_date('d').'</span>'.'<span class="tm-article-date-month">'.get_the_date('m').'</span>'); ?>
    </div>

    <?php if (has_post_thumbnail()) : ?>
    <div class="uk-grid uk-grid-width-medium-1-2" data-uk-grid-match data-uk-grid-margin>
        <?php
        $post_image = wp_get_attachment_image_src( get_post_thumbnail_id() );
        ?>

        <div class="uk-cover-background tm-featured-image" style="background-image:url(<?php echo $post_image[0]; ?>);">
        </div>
    <?php endif; ?>

    <div class="tm-article-container <?php if (!has_post_thumbnail()) echo 'uk-flex uk-flex-column'; ?>">

        <div class="tm-article-header">

            <h1 class="uk-article-title"><a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>

            <p class="uk-article-meta uk-margin-bottom-remove">
                <?php
                    $date = '<time datetime="'.get_the_date('Y-m-d').'">'.get_the_date().'</time>';
                    printf(__('<span class="uk-hidden-small">Written by %s. Posted in %s</span>', 'warp'), '<a href="'.get_author_posts_url(get_the_author_meta('ID')).'" title="'.get_the_author().'">'.get_the_author().'</a>', get_the_category_list(', '));
                    printf(__('<span class="uk-visible-small">Written by %s on %s. Posted in %s</span>', 'warp'), '<a href="'.get_author_posts_url(get_the_author_meta('ID')).'" title="'.get_the_author().'">'.get_the_author().'</a>', $date, get_the_category_list(', '));
                ?>
            </p>

        </div>

        <?php the_content(''); ?>

        <ul class="uk-subnav uk-subnav-line">
            <li><a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php _e('Continue Reading', 'warp'); ?></a></li>
            <?php if(comments_open() || get_comments_number()) : ?>
                <li><?php comments_popup_link(__('No Comments', 'warp'), __('1 Comment', 'warp'), __('% Comments', 'warp'), "", ""); ?></li>
            <?php endif; ?>
        </ul>

    </div>

    <?php if (has_post_thumbnail()) : ?>
    </div>
    <?php endif; ?>

    <?php edit_post_link(__('Edit this post.', 'warp'), '<p><i class="uk-icon-pencil"></i> ','</p>'); ?>

</article>

<?php else: ?>

	<?php include(__DIR__.'/../warp/systems/wordpress/layouts/_post.php'); ?>

<?php endif; ?>
