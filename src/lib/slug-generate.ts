import slugifyLib from 'slugify';
import moment from 'moment';
/**
 * Generates a slug for a blog post.
 * @param {string} title - The title of the blog post.
 * @returns {string} - The generated slug.
 */
function gSlug(title: string): string {
  const slug = slugifyLib(title, {
    lower: true,
    strict: true, // remove special characters
    locale: 'vi',
  });

  return `${slug}-i.${moment().format('YYYYMMDDHHmmss')}`;
}

export {
  gSlug, // Export the slug generation function
};
