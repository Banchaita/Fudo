import SanityClient  from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";

export const client = SanityClient({
    projectId: "5plxxzcf",
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
    token: "skpswdztBQWyvq5E6tTvfZR29puOCdtfk96nC5vB5Cbf7BkM9iHqCZ0j2yDHhECpG4YmkyQlscpOwfrNnb9AUyRRr1aAF46P23xQZftNxl1cvOMvg4yXULhBVEY7pi1gxoQM5q4sAWajYnpsfXROECo6yF4S6kSgIfmBADIkctMu1fui1lXx"
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)