/**
 * Promisified FileReader
 *
 * @example
 * reader(evt.target.files[0]).then(evt => {
 *   // evt.target.result);
 * });
 *
 * @param File file
 * @return Promise
 */
function reader(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = resolve;
    reader.onerror = reject;

    if ( /^image/.test(file.type) ) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  });
}

export default reader;
