export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  text,
  author,
  initials
}`;

export const quoteQuery = `*[_type == "quote"][0] {
  lines,
  buttonText,
  buttonHref
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  slug,
  title,
  description,
  features,
  "imageUrl": image.asset->url
}`;
