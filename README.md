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