export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  _type,
  text,
  author,
  initials
}`;

export const quoteQuery = `*[_type == "quote"][0] {
  _id,
  _type,
  lines,
  buttonText,
  buttonHref
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  _type,
  slug,
  title,
  description,
  features,
  "imageUrl": image.asset->url
}`;

export const transformationsQuery = `*[_type == "transformation"] | order(order asc) {
  _id,
  _type,
  title,
  "transformationImage": transformationImage.asset->url,
  stats,
  quote,
  description,
  resultsList,
  order
}`;
