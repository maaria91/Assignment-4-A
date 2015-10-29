var margin = {t:50,r:125,b:50,l:125};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var canvas = d3.select('.plot')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scale for the size of the circles
var scaleX = d3.scale.log().domain([1,5]).range([0,width]),
    scaleR = d3.scale.sqrt().domain([5,100]).range([5,120]);



d3.csv('data/olympic_medal_count.csv', parse, dataLoaded);

function dataLoaded(err,rows){



    //TODO: fill out this function
    d3.selectAll('.btn-group .year').on('click',function(){

        var year = d3.select(this).attr('id');
        if (year == 'year-1900'){
            var year = 1900;

            rows.sort(function(a,b) {
                //Note: this is called a "comparator" function
                //which makes sure that the array is sorted from highest to lowest
                return b[year] - a[year];
            });

                var top5 = rows.slice(0,5);
                draw(top5, year);

        }else if(year == 'year-1960'){
            var year = 1960;

            rows.sort(function(a,b) {
                //Note: this is called a "comparator" function
                //which makes sure that the array is sorted from highest to lowest
                return b[year] - a[year];
            });

            var top5 = rows.slice(0,5);
            draw(top5, year);

        }else{

            var year = 2012;

            rows.sort(function(a,b) {
                return b[year] - a[year];
            });


        var top5 = rows.slice(0,5);
        draw(top5, year);
        }

        console.log("Show top 5 medal count for: " + year);
    });
}

function draw(rows, year) {
    //TODO: Complete drawing function, accounting for enter, exit, update
    //Note that this function requires two parameters
    //The second parameter, "year", determines which one of the three years (1900,1960,2012) to draw the medal counts based on
    var row = canvas.selectAll('.country')
        .data(rows, function (d) {
            return d.country
        })

    //enter

    var rowEnter = row.enter().append('g')
        .attr('class', 'country')
        .attr('transform', function(d,index){
            return 'translate('+ index * 110 + ',' + 1000 + ')';
})
        .on('click',function(d){
            d3.select(this)
                .select('circle')
                .style('stroke','cyan');
        })

    rowEnter.append('circle')
        .attr('r', function (d) {
            return scaleR(d[year]);
        })
        .style("fill", 'rgba(230,180,270,0.3)')
    rowEnter
        .append('text')
        .text(function(d){ return d.country; })
        .style('font-size','15px')
        .style('fill','purple')
        .attr('class','label')
        .attr('text-anchor','middle');


    rowEnter
        .append('text')
        .text(function(d){
            return d[year];
        })
        .style('font-size','11px')
        .style('fill','pink')
        .attr('class','label')
        .attr('text-anchor','bottom')
        .attr('y',20)
        .attr('class','gold');
    //Exit
    row.exit().remove();


    //Update = update + enter
    row

        .transition()
        .duration(500)
        .attr('transform', function(d,index){
            return 'translate('+ index * 210 + ',' + 100 + ')';
        })
        .select('circle')
        .attr('r', function (d) {
            return scaleR(d[year]);
        })
    d3.selectAll('.gold')
        .text(function(d){return d[year];})
}


 function parse(row) {
     //@param row is each unparsed row from the dataset
     return {
         country: row['Country'],
         1900: +row['1900'],
         1960: +row['1960'],
         2012: +row['2012']
     };
 }
