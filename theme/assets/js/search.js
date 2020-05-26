const search = instantsearch({
    // TODO: enter our own algolia credentials here
    appId: 'FVGR8SSYN8',
    apiKey: '8690dc426614ecd36011813a04d17402',
    indexName: 'dev_docs',
    routing: true,
    searchFunction: function (helper) {
        const container = document.querySelector('.search__hits');

        if (helper.state.query === '') {
            container.style.display = 'none';
        } else {
             container.style.display = '';
        }

        helper.search();
    }
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search docs'
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        searchParameters: {
            hitsPerPage: 4,
        },
        templates: {
            empty: `
                <div class="col-md-12">
                    <p class="search__not-found">No results found!</p>
                </div>
            `,
            item: `
                <div class="col-md-12">
                    <a href="{{ url }}">
                        <blockquote class="search__item">
                            <h4 class="search__title">{{{ _highlightResult.title.value }}}</h4>
                            <p>{{{ _highlightResult.content.value }}}</p>
                        </blockquote>
                    </a>
                </div>
            `
        }
    })
);

search.start();
