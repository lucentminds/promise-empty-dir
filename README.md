# promise-empty-dir
NodeJs module that empties a directory of a list of directories.

### Useage:

```js
empty([
    './build',
    './dist',
    './temp'
])
.then(function( aEmptied ){

   console.log( 'Success!' );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```

Or for a single file.

```js
empty( './build' )
.then(function( cEmptied ){

   console.log( 'Emptied directory:', cEmptied );

})
.fail(function( err ){

    console.log( 'Oops!' );

});
```

Add boolean `true` if you want to create the directory paths if they don't exist.

```js
empty( [
    './build',
    './dist',
    './temp'
], true );
```