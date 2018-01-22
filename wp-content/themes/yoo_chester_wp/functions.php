<?php
/**
* @package   Avanti
* @author    YOOtheme http://www.yootheme.com
* @copyright Copyright (C) YOOtheme GmbH
* @license   http://www.gnu.org/licenses/gpl.html GNU/GPL
*/

// check compatibility
if (version_compare(PHP_VERSION, '5.3', '>=')) {

    // bootstrap warp
    require(__DIR__.'/warp.php');
}



add_filter( 'woocommerce_product_tabs', 'woo_remove_product_tabs', 98 );

function woo_remove_product_tabs( $tabs ) {

   
    unset( $tabs['reviews'] ); 	

    return $tabs;

}

add_filter( 'woocommerce_product_tabs', 'woo_rename_tabs', 98 );
function woo_rename_tabs( $tabs ) {


	$tabs['additional_information']['title'] = __( 'Specifications' );	// Rename the additional information tab
	
	$tabs['description']['priority'] = 5;			// Reviews first

	$tabs['additional_information']['priority'] = 10;
	$tabs['contact_form7']['priority'] = 20;


	return $tabs;

}

if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Check if WooCommerce is active
 **/
if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
    return;
}
// let's add a filter to woocommerce_product_tabs to add our additional tab..
add_filter('woocommerce_product_tabs','woocommerce_product_tabs_contact_form7',10,1);
function woocommerce_product_tabs_contact_form7($tabs){
	
	$tabs['contact_form7'] = array(
		'title'    => __( 'Enquire', 'woocommerce' ),
		'priority' => 20,
		'callback' => 'woocommerce_product_contact_form7_tab'
	);
	
	return $tabs;
}
// our tab's callback...
function woocommerce_product_contact_form7_tab(){
	// do the thing zhu li! Let's echo our shortcode for contact form 7
	echo do_shortcode('[contact-form-7 id="104" title="Contact us"]');
}

add_filter( 'loop_shop_per_page', create_function( '$cols', 'return 48;' ), 20 );


//customize the product categories at sidebar

add_filter('woocommerce_product_categories_widget_args','customize_product_categories',99,1);
function customize_product_categories($list_args)
{
    //hard code --- hide the category link show up at some category page except this category page
    $hide_category_id = '67';
    if($list_args['current_category'] != $hide_category_id || $list_args['current_category_ancestors'][0] != $hide_category_id)
    {
        $category_list = $list_args['include'] ;
        //remove the category from the list
        $list_args['include'] =  str_replace($hide_category_id,'',$category_list);
        
    }


    //echo print_r($list_args,true); die;
    return $list_args;
}
