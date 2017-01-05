/**
 * 01-05-2017
 * NodeJs module that empties a directory of a list of directories..
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* global JSON:false */

var Q = require( 'q' );
var fse = require( 'fs-extra' );
var resolvePath = require( 'promise-resolve-path' );
var empty = module.exports = function( aPaths ){
    var i, l, deferred = Q.defer();
    var cPathType = typeof aPaths;
    var aPromises = [];

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
    
    resolvePath( aPaths, true )
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
    .fail(function( err ){
       deferred.reject( err );
    });
    
   return deferred.promise;
};// /empty();

var emptyOneDir = function( cPathDir ){
    var deferred = Q.defer();

    fse.emptyDir( cPathDir, function( err ) {
        if ( err ){
            return deferred.reject( err );
        }

        deferred.resolve( cPathDir );
    });

   return deferred.promise;
};// /emptyOneDir()