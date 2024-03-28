export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   *  Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // change all white spaces for a empty string
      .replace(/[^\w-]+/g, '') // We will remove everything that is not a word (like symbols)
      .replace(/_/g, '-') // changing all underline for "-"
      .replace(/--+/g, '-') // if we have two "-" replace for only one "-"
      .replace(/-$/g, '') // if in the end we have a "-" we will remove it

    return new Slug(slugText)
  }
}
