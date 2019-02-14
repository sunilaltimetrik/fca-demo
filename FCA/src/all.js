
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

'use strict';

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

(function (global) {
    var Months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];

    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;

    Samples.utils = {
        // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        srand: function (seed) {
            this._seed = seed;
        },

        rand: function (min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function (config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function (config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function (config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = Months[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        color: function (index) {
            return COLORS[index % COLORS.length];
        },

        transparentize: function (color, opacity) {
            var alpha = opacity === undefined ? 0.5 : 1 - opacity;
            return Color(color).alpha(alpha).rgbString();
        }
    };

    // DEPRECATED
    window.randomScalingFactor = function () {
        return Math.round(Samples.utils.rand(-100, 100));
    };

    // INITIALIZATION

    Samples.utils.srand(Date.now());

    // Google Analytics
    /* eslint-disable */
    if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-28909194-3', 'auto');
        ga('send', 'pageview');
    }
    /* eslint-enable */

}(this));

var presets = window.chartColors;
var utils = Samples.utils;
var inputs = {
    min: 8,
    max: 16,
    count: 8,
    decimals: 2,
    continuity: 1
};

// eslint-disable-next-line no-unused-vars
function togglePropagate(btn) {
    var value = btn.classList.toggle('btn-on');
    chart.options.plugins.filler.propagate = value;
    chart.update();
}

// eslint-disable-next-line no-unused-vars
function toggleSmooth(btn) {
    var value = btn.classList.toggle('btn-on');
    chart.options.elements.line.tension = value ? 0.4 : 0.000001;
    chart.update();
}

// eslint-disable-next-line no-unused-vars
function randomize() {
    inputs.from = [];
    chart.data.datasets.forEach(function (dataset) {
        dataset.data = generateData();
    });
    chart.update();
}

function generateData() {
    // radar chart doesn't support stacked values, let's do it manually
    var values = utils.numbers(inputs);
    inputs.from = values;
    return values;
}

function generateLabels() {
    return utils.months({ count: inputs.count });
}

utils.srand(42);

function deleteQueryContainer(evt) {

    var gridStack = $('.grid-stack').data('gridstack');
    var item = $(evt.target).closest(".grid-stack-item");

    gridStack.removeWidget(item);
}

var container;

function dataSourceContainer(evt) {
    container = $(evt.target);

    $('.data-source-modal')
        .modal('show')
        ;

    listQuery()

}

function newQuery() {
    $("#your_queries").hide();
    $("#new_query_board").show();


    $("#queryName").val('query_' + uuidv4());
}

function createQueryClick() {
    var sql_raw = $('#builder').queryBuilder('getSQL', false, false);

    const q = JSON.parse(localStorage.getItem('queries')) || [];
    const allItem = q.push({
        name: $("#queryName").val(),
        val: sql_raw.sql
    });

    localStorage.setItem('queries', JSON.stringify(q));

    $("#your_queries").show();
    $("#new_query_board").hide();

    listQuery();
}

function listQuery() {
    const items = JSON.parse(localStorage.getItem('queries')) || [];

    if (items) {
        let html = `
        <li>
            <button class="ui primary button" onclick="showQueryList('default', event)">default bar chart</button>
        </li>
        `;

        _.forEach(items, g => {
            html += `
            <li>
              <button class="ui primary button" onclick="showQueryList('${g.name}', event)">${g.name}</button>
            </li>
            `
        });

        $("#your_queries > ul").html(html);
    }
}

function cancelCreateQueryClick() {
    $("#your_queries").show();
    $("#new_query_board").hide();

    listQuery();
}

function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function () {
        if (copy.length < 1) { copy = array.slice(0); }
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}



function showQueryList(queryName, evt) {

    localStorage.setItem('queryNameSelected', queryName);

    const q = JSON.parse(localStorage.getItem('queries')) || [];
    const f = _.find(q, g => g.name === queryName);

    let query = '';

    if (queryName === 'default') {

    }
    else {
        query = f.val;
    }

    $.ajax({
        type: "GET",
        url: 'https://appdev.altimetrik.com/api/offers?query=' + query,
        // data: {

        // },
        success: (data) => {


            const ele = container.closest('.grid-stack-item').find('canvas');
            const graph = ele.data('graph');

            container.closest('.grid-stack-item').find('.content-top').html(
                localStorage.getItem('queryNameSelected')
            );

            // graph.data.labels = ['NovRam', 'Q4Chrysler', 'Q4Jeep'];

            // [0].data = _.map(data, f => f.oct)
            // graph.data.datasets[1].data = _.map(data, f => f.nov)
            // graph.data.datasets[2].data = _.map(data, f => f.december)

            // graph.data.labels = _.map(data, f => f.offer_id);
            graph.data.labels = ['Oct', 'Nov', 'Dec '];

            //    // graph.data.datasets = 

            //     _.forEach(graph.data.datasets, (e, index) => {
            //         if (!data[index]) {
            //             graph.data.datasets.splice(index, 1)
            //         }
            //     });

            graph.data.datasets = [];

            const getColor = [chartColors.red, chartColors.orange, chartColors.blue, chartColors.green, chartColors.yellow]
            var chooser = randomNoRepeats(getColor);
            _.forEach(data, (dataEach, index) => {
                const color = chooser();
                // if (graph.data.datasets[index]) {
                //     graph.data.datasets[index].label = dataEach.offer_id
                //     graph.data.datasets[index].data = [
                //         dataEach.oct, dataEach.nov, dataEach.december
                //     ];
                // }

                graph.data.datasets[index] = {
                    fill: false,
                    backgroundColor: color,
                    borderColor: color,
                    label: dataEach.offer_id,
                    data: [
                        dataEach.oct, dataEach.nov, dataEach.december
                    ]
                }
            });

            // graph.data.datasets[0]

            // graph.data.datasets = [];

            // _.forEach(graph.data.labels, labelName => {
            //     const found = _.find(data, g => g.offer_id === labelName);
            //     if (found) {
            //         graph.data.datasets.push();
            //     }
            // });

            graph.update();

        },
        //dataType: dataType
    });

    $('.data-source-modal')
        .modal('hide')
        ;

}