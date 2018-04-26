// Copyright (c) 2017 Tracktunes Inc

'use strict';

/**
 * Extracts the full path of an entry, if it's a folder it ends with '/'.
 * @param {string}
 * @returns string
 */
export function getFullPath(entry: Entry): string {
    const fullPath: string = entry.fullPath;
    return entry.isDirectory && (fullPath.length > 1) ?
        fullPath + '/' : fullPath;
}

/**
 * Returns true if path is a folder and false otherwise.
 * @param {string}
 * @returns boolean
 */
export function isFolder(path: string): boolean {
    return (path[path.length - 1] === '/');
}

/**
 * Extracts the filename out of a full-path
 * @param {string}
 * @returns string
 */
export function pathFileName(filePath: string): string {
    return filePath.replace(/^.*[\\\/]/, '');
}

/**
 * Extracts the folder out of a full-path
 * @param {string}
 * @returns string
 */
function pathFolderName(filePath: string): string {
    // return filePath.replace(pathFileName(filePath), '');
    return filePath.match(/^.*[\\\/]/).toString();
}

export function pathParent(path: string): string {
    if (isFolder(path)) {
        return folderPathParent(path);
    }
    else {
        return pathFolderName(path);
    }
}

export function pathChild(path: string): string {
    return path.replace(pathParent(path), '');
}

/**
 * Extracts the parent folder out of a full-path of a folder argument.
 * @param {string}
 * @returns string
 */
function folderPathParent(dirPath: string): string {
    const pathParts: string[] =
          dirPath.split('/').filter((str: string) => { return str !== ''; }),
          nParts: number = pathParts.length;
    if (nParts <= 1) {
        return '/';
    }
    return '/' + pathParts.splice(0, nParts - 1).join('/') + '/';
}

/**
 * Update object 'dest' by adding or changing any fields that differ in 'src'
 * @param {Object} 'src' the source object from which to update 'dest'
 * @param {Object} 'dest' the destination object to update and return
 * @returns Object - the updated 'dest' object
 */
export function copyFromObject(src: Object, dest: Object): Object {
    for (let prop in src) {
        if (has(src, prop)) {
            dest[prop] = src[prop];
        }
    }
    return dest;
}

/**
 * @param {any}
 * @param {any}
 * @returns boolean
 */
export function has(obj: any, prop: any): boolean {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Checks if the given argument is a function.
 * @param {any}
 * @returns boolean
 */
export function isFunction(func: any): boolean {
    return (typeof func) === 'function';
}

/**
 * Checks if the given argument is defined.
 * @param {any}
 * @returns boolean
 */
export function isDefined(obj: any): boolean {
    return (typeof obj) !== 'undefined';
}

/**
 * Checks if the given argument is undefined.
 * @param {any}
 * @returns boolean
 */
export function isUndefined(obj: any): boolean {
    return (typeof obj) === 'undefined';
}

/**
 * Checks if the given argument is a string.
 * @param {any}
 * @returns boolean
 */
export function isString(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * Positive whole number test
 * @param {number} the number we're verifying
 * @returns boolean - whether argument is a positive whole number
 */
export function isPositiveWholeNumber(num: number): boolean {
    return<boolean>(isWholeNumber(num) && num > 0);
}

/**
 * Whole number test
 * @param {number} the number we're verifying
 * @returns boolean - whether argument is a whole number
 */
export function isWholeNumber(num: number): boolean {
    return<boolean>(
        num === 0 || (num && !isNaN(num) && num === Math.floor(num))
    );
}

/**
 * @param {number}
 * return {boolean}
 */
export function isOdd(num: number): boolean {
    if (!isWholeNumber(num)) {
        throw Error('isOdd expected whole number as input, got: ' + num);
    }
    return num % 2 === 1;
}

/**
 * @param {number}
 * @returns boolean
 */
export function isEven(num: number): boolean {
    return !isOdd(num);
}

/**
 * @param {number}
 * @returns string
 */
function addZero(num: number): string {
    return (num < 10) ? '0' : '';
}

/**
 * format time into H*:MM:SS.CC
 * @param {number} - number of seconds, float
 * @param {number} - maximum time, determines final string length/components
 * @returns string - the time string representation
 */
export function formatTime(
    timeInSeconds: number,
    maxTimeInSeconds: number
): string {
    let nSeconds: number = Math.floor(timeInSeconds),
        // initialize the result with the centiseconds portion and period
        result: string = (timeInSeconds - nSeconds).toFixed(2).substr(1);
    if (timeInSeconds < 60 && maxTimeInSeconds < 60) {
        // no minutes
        result = addZero(nSeconds) + nSeconds.toString() + result;
    }
    else {
        // yes minutes
        let nMinutes: number = Math.floor(nSeconds / 60.0);
        nSeconds -= nMinutes * 60;
        result = ':' + addZero(nSeconds) + nSeconds.toString() + result;
        if (timeInSeconds < 3600 && maxTimeInSeconds < 3600) {
            // no hours in timeInSeconds
            result = addZero(nMinutes) + nMinutes.toString() + result;
        }
        else {
            // we've got hours - timeInSeconds spans hours
            const nHours: number = Math.floor(nMinutes / 60.0);
            nMinutes -= nHours * 60;
            result = nHours.toString() + ':' + addZero(nMinutes) +
                nMinutes + result;
        }
    }
    return result;
}

/**
 * Create a string that reflects the Unix timestamp 'timestamp'
 * at 1 second resolution in human readable form
 * @param {number} timestamp - Unix timestamp representation of datetime
 * @returns string - human readable text representation of timestamp
 */
export function formatUnixTimestamp(timestamp: number): string {
    return formatDate(new Date(timestamp));
}

/**
 * Create a string that reflects the Unix date 'date'
 * at 1 second resolution in human readable form
 * @param {number} timestamp - Unix timestamp representation of datetime
 * @returns string - human readable text representation of timestamp
 */
export function formatDate(date: Date): string {
    return [
        date.getFullYear().toString(),
        '-',
        (date.getMonth() + 1).toString(),
        '-',
        date.getDate().toString(),
        '--',
        date.toLocaleTimeString()
    ].join('').toLowerCase().replace(' ', '');
}

/**
 * Digs through a Javascript object to display all its properties.
 * @param {Object} - a Javascript object to inspect
 * @returns string - concatenated descriptions of all object properties
 */
export function objectInspector(object: Object): string {
    let rows: string[] = [],
        key: string,
        count: number = 0;
    for (key in object) {
        if (!has(object, key)) {
            continue;
        }
        const val: any = object[key];
        rows.push([' - ', key, ':', val, ' (', typeof val, ')'].join(''));
        count++;
    }
    return [
        '\nType: ' + typeof object,
        'Length: ' + count,
        rows.join('\n')
    ].join('\n');
}

/**
 * Adds a value to an array as its first element.
 * @param {any} value - value to add to array.
 * @param {any[]} arr - the array to add to.
 * @returns any[] - the appended-to array.
 */
export function prependArray(value: any, arr: any[]): any[] {
    let newArray: any[] = arr.slice(0);
    newArray.unshift(value);
    return newArray;
}

/**
 * Save blob into a local file.
 * NOTE: we cannot use the function below everywhere
 * (a) because some browsers don't support the url that's created
 *     the way it's created here as the href field;
 * (b) because chrome on android would not allow this - it considers
 *     it to be a cross origin request, so at this point we cannot
 *     download on mobile browsers.
 * @param {Blob}
 * @param {filename}
 */
export function downloadBlob(blob: Blob, filename: string): void {
    /*
    let url = (window.URL || window.webkitURL)
        .createObjectURL(blob);
    let link = document.getElementById("a-save-link");
    link.href = url;
    link.download = filename || 'output.wav';
    console.log('hi1');
    console.dir(link);
    console.log('simulateCLick(link): ' + simulateClick(link));
    console.log('hi2');
    // link.click();
    */
    const url: string = (window['URL'] || window['webkitURL'])
        .createObjectURL(blob);
    let anchorElement: HTMLAnchorElement = document.createElement('a');
    anchorElement.style.display = 'none';
    anchorElement.href = url;
    anchorElement.setAttribute('download', filename);
    document.body.appendChild(anchorElement);
    // anchorElement.click();
    simulateClick(anchorElement);
    setTimeout(
        () => {
            document.body.removeChild(anchorElement);
            window.URL.revokeObjectURL(url);
            console.log('downloadBlob(' + filename + '): finished!');
        },
        100);
}

/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 * @returns boolean - True if canceled, false otherwise
 */
function simulateClick(element: Element): boolean {
    // Create our event (with options)
    const evt: MouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: false,
        view: window
    });
    // If cancelled, don't dispatch our event
    return element.dispatchEvent(evt);
}
