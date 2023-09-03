<?php
/**
 * Plugin Name:       Image Overlay
 * Description:       This block enables you to present an image with an overlay of text on hover or focus.
 * Version:           1.0.0
 * Requires at least: 6.3
 * Requires PHP:      7.0
 * Author:            Troy Vassalotti
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       image-overlay
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_image_overlay_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_image_overlay_block_init' );
