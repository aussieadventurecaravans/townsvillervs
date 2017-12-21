<?php
/**
 * Description tab
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/tabs/description.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $post;

$heading = esc_html( apply_filters( 'woocommerce_product_description_heading', __( 'Product Description', 'woocommerce' ) ) );

?>

<?php if ( $heading ): ?>
  <h2><?php echo $heading; ?></h2>
<?php endif; ?>
<?php the_content(); ?>

<?php //display the specifications custom field at product description tab ?>
<?php global $post; ?>
<?php if(get_field('specifications',$post->ID)): ?>
<?php $specifications = get_field('specifications',$post->ID);  ?>
<div class="uk-accordion uk-text-left " data-uk-accordion="{showfirst: false}">
    <?php  foreach($specifications as $index => $spec): ?>
        <?php $index = $index + 1; ?>

        <h3 class="uk-accordion-title"><?php echo $spec['group_heading']; ?></h3>

        <div class="uk-accordion-content">

            <?php //if this specification includes the image ?>
            <?php if($specification_image = $spec['specification_image']): ?>
            <div class="uk-margin uk-text-center">
                <img src="<?php echo $specification_image; ?>" class="uk-overlay-scale">
            </div>
            <?php endif; ?>

            <?php //display specification elements ?>
            <div class="uk-margin">
                <?php foreach($spec['specification_item'] as $spec_item): ?>
                <p><?php echo $spec_item['spec_heading']; ?></p>
                <?php endforeach; ?>
            </div>

        </div>
    <?php endforeach; ?>
</div>
<?php endif; ?>
