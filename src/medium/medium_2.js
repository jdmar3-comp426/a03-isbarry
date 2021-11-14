import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";


/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

let city_array = mpg_data.map(car => {
    return car.city_mpg;
});

let highway_array = mpg_data.map(car => {
    return car.highway_mpg;
});

let year_array = mpg_data.map(car => {
    return car.year;
});

let hybrid_array = mpg_data.filter(car => car.hybrid === true);



export const allCarStats = {
    avgMpg: {city: (city_array.reduce((a, b) => a + b, 0))/city_array.length, highway: (highway_array.reduce((a, b) => a + b, 0))/highway_array.length},
    allYearStats: getStatistics([...new Set(year_array)]),
    ratioHybrids: hybrid_array.length/mpg_data.length,
};

console.log(allCarStats.allYearStats)

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
var helper = {};
var result = mpg_data.reduce(function(r, o) {
  var key = o.make;
  
  if(o.hybrid===true){
    if(!helper[key]) {  
      helper[key] = {make: o.make, hybrids: []}; 
      helper[key].hybrids.push((o.id))
      r.push(helper[key]);
    } else {
      helper[key].hybrids.push((o.id))
    }
  }
  return r;
}, []);

function compare( a, b ) {
  if ( a.hybrids.length < b.hybrids.length ){
    return 1;
  }
  if ( a.hybrids.length> b.hybrids.length ){
    return -1;
  }
  return 0;
}

result.sort(compare);



export function getMpgByYearAndHybrid(cars){
  
  
  let year_array = mpg_data.map(function (car) 
  { return car.year; });
  let years = [...new Set(year_array)]
  let list = {};
  
  years.forEach(function(year) {
      
      let hybrid = cars.filter(c => c.year===year && c.hybrid);
      let city_hybrid_array = hybrid.map(car => {
        return car.city_mpg;
     });

     let highway_hybrid_array = hybrid.map(car => {
        return car.highway_mpg;
     });
      let nonhybrid = cars.filter(c => c.year===year && !c.hybrid);
      
      let city_nonhybrid_array = nonhybrid.map(car => {
        return car.city_mpg;
     });

     let highway_nonhybrid_array = nonhybrid.map(car => {
        return car.highway_mpg;
     });
      
      
      

      list[year] = {
          hybrid: {city: (city_hybrid_array.reduce((a, b) => a + b, 0))/city_hybrid_array.length, highway:  (highway_hybrid_array.reduce((a, b) => a + b, 0))/highway_hybrid_array.length},
          notHybrid: {city: (city_nonhybrid_array.reduce((a, b) => a + b, 0))/city_nonhybrid_array.length, highway:  (highway_nonhybrid_array.reduce((a, b) => a + b, 0))/highway_nonhybrid_array.length}
      }
  
  });
  return list;
}
 console.log(getMpgByYearAndHybrid(mpg_data));