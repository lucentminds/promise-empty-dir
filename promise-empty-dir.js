/**
 * 01-05-2017
 * NodeJs module that empties a directory of a list of directories..
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* global JSON:false */

var fse = require( 'fs-extra' );
var resolvePath = require( 'promise-resolve-path' );

function empty( aPaths, lCreate ){ // jshint ignore:line
    var i, l, deferred = deferred();
    var cPathType = typeof aPaths;
    var aPromises = [];

    // Determines if the path should be created if it doesn't exist yet.
    lCreate = lCreate || false;

    switch( true ) {
    case ( cPathType === 'string' ):
        aPaths = [aPaths];
        break;

    case Array.isArray( aPaths ):
        break;

    default:
        deferred.reject( 'Invalid path argument: '.concat( aPaths ) );
        return deferred.promise;

    }// /switch()

    // Determines the list of promises received from resolveOnePath.
    aPromises = [];
    
    resolvePath( aPaths, !lCreate )
    .then(function( aResolved ){
        for( i = 0, l = aResolved.length; i < l; i++ ) {
            aPromises.push( emptyOneDir( aResolved[ i ] ) );
        }// /for()

        // Either wait for all paths to be emptied or reject one.
       return Q.all( aPromises );

    })
    .then(function( aEmptied ){
        if( cPathType === 'string' )  {
            deferred.resolve( aEmptied[0] );
        }
        else {
            deferred.resolve( aEmptied );
        }
    })
    .catch(function( err ){
       deferred.reject( err );
    });
    
   return deferred.promise;
};// /empty();

function emptyOneDir( cPathDir ){
    var deferred = deferred();

    fse.emptyDir( cPathDir, function( err ) {
        if ( err ){
            return deferred.reject( err );
        }

        deferred.resolve( cPathDir );
    });

   return deferred.promise;
};// /emptyOneDir()

function deferred(){
    let resolve, reject;
    const o_promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    const o_deferred = {
        promise: o_promise,
        resolve: resolve,
        reject: reject
    };

    return o_deferred;
}// /deferred()

module.exports = empty;
