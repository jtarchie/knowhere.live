class SearchQuery {
  static colorPalette = [
    "#E69F00", // Orange
    "#56B4E9", // Sky Blue
    "#009E73", // Bluish Green
    "#F0E442", // Yellow
    "#0072B2", // Blue
    "#D55E00", // Vermillion
    "#CC79A7", // Reddish Purple
    "#8DD3C7", // Light Blue-Green
    "#FDB462", // Soft Orange
    "#B3DE69", // Light Green
    "#FFED6F", // Light Yellow
    "#6A3D9A", // Deep Purple
    "#B15928", // Brownish-Orange
  ];
  static counter = 0;

  query: string;
  color: string;

  constructor(query: string) {
    this.query = query;

    this.color = SearchQuery
      .colorPalette[SearchQuery.counter % SearchQuery.colorPalette.length];
    SearchQuery.counter++;
  }

  layerName(name: string) {
    return `${this.query}-${name}`;
  }

  sourceName(name: string = "") {
    return `${this.query}-${name}`;
  }

  apiQuery(params: Record<string, string> = {}) {
    const additionalTags = Object.entries(params).map(([key, value]) =>
      `[${key}="${value}"]`
    );
    return `nw[*="${this.query}"]${additionalTags}`;
  }
}

export { SearchQuery };
