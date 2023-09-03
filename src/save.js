import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const innerBlocksProps = useInnerBlocksProps.save();

  return attributes.mediaItems[0] ? (
    <image-overlay {...blockProps}>
      <img
        className="image-with-overlay"
        slot="image"
        data-id={attributes.mediaItems[0].mediaId}
        data-type={attributes.mediaItems[0].mediaType}
        src={attributes.mediaItems[0].mediaURL}
        width={attributes.mediaItems[0].mediaWidth}
        height={attributes.mediaItems[0].mediaHeight}
        alt={attributes.mediaItems[0].mediaAlt}
      />
      <div {...innerBlocksProps} className="image-overlay__content is-layout-flow" />
    </image-overlay>
  ) : (
    ""
  );
}
