import { __ } from "@wordpress/i18n";

import { addFilter } from "@wordpress/hooks";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaUploadCheck, MediaUpload, useInnerBlocksProps } from "@wordpress/block-editor";

import { __experimentalVStack as VStack, Button, __experimentalText as Text } from "@wordpress/components";

// Allow media uploads in our block
const replaceMediaUpload = () => MediaUpload;
addFilter("editor.MediaUpload", "core/edit-post/components/media-upload/replace-media-upload", replaceMediaUpload);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps();

  // Store selected media in the block's attributes
  const handleMediaUpload = (media) => {
    setAttributes({
      mediaItems: media.map((item) => {
        return {
          mediaID: parseInt(item.id, 10),
          mediaType: item.type,
          mediaURL: item.url,
          mediaAlt: item.alt,
          mediaWidth: item.width,
          mediaHeight: item.height,
        };
      }),
    });
  };

  return (
    <VStack>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={handleMediaUpload}
          multiple
          value={attributes.mediaId}
          allowedTypes={["image"]}
          render={({ open }) => (
            <Button variant="primary" onClick={open}>
              Choose Your Image
            </Button>
          )}
        />
      </MediaUploadCheck>
      {attributes.mediaItems[0] ? (
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
        </image-overlay>
      ) : (
        ""
      )}
      <Text>You can use any set of blocks to write the content for this image.</Text>
      <div {...innerBlocksProps} />
    </VStack>
  );
}
