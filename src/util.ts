export function getRelevantLinks(keywords: string[], currentLocation: string, $: JQueryStatic) {
    let baseUrl = getBaseUrl(currentLocation);

    let links = keywords
        .flatMap(keyword => getLinksWithKeyword(keyword, $))
        .map(link => baseUrl + link.element.prop('href'));

    return links;
}

export function getLinksWithKeyword(keyword: string, $: JQueryStatic) {
    return $(`a:contains("${keyword}")`).toArray().map(element => ({ keyword, element: $(element) }));
}

export function getBaseUrl(url: string) {
    let pathArray = url.split('/');
    let protocol = pathArray[0];
    let host = pathArray[2];

    let baseUrl = protocol + '//' + host + '/';

    return baseUrl;
}