
const helpers = {

  /**
   * takes given miles that get converted to kilometers and returned
   * @param {float} miles: miles to be converted
   * @returns {float}: value in kilometer
   */
   convertMilesToKM(miles) {
    if (typeof miles == "number") {
      return Number((Math.abs(miles) * 1.61).toFixed(2))
    } else return undefined
  },

  /**
   * checks if string length is smaller than or equal to 10
   * @param {string} str the user given string 
   * @returns false if not a string or too long, otherwise true
   */
  checkStringLength(str) {
    return str && typeof str == "string" && str.length <= 10 ? true : false;
  },

  /**
   * check if body send by endpoint is in order
   * @param {object} body 
   * @returns {object} body if all is capitalised and shortened, or false if something missing
   */
   bodyCheck(body) {
    if(body && body.title && body.imageURL && body.excerpt) {
      const { title, imageURL, excerpt} = body;
      if(title.length < 10 && this.checkIfURL(imageURL)) {
        return {
          ...body,
          title: this.capitalise(title),
          excerpt: this.shortenText(excerpt, 20)
        }
      }
    }
    return false;
  },
  
  /**
   * shorten text to a certain length, add ... at the end
   * @param {*} text input text
   * @param {*} length desired length (account for the "...")
   * @returns string shortened with "..." at end
   */
  shortenText(text, length) {
    if(text && typeof text == "string" && typeof length == "number") {
      return text.length > length ? text.substring(0, length)+"..." : text;
    }
    return false;
  },

  /**
   * capitalise the first letter of a given string
   * @param {string} string input string
   * @returns the capitalised string
   */
  capitalise(string) {
    if(typeof string == "string") {
      return string ? string.charAt(0).toUpperCase() + string.slice(1) : false;
    } else return false
  },

  /**
   * check if a given string is a url
   * @param {string} url 
   * @returns true if url, false if not
   */
  checkIfURL(url) {
    if(url) {
      const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
      return regex.test(url);
    }
    return false;
  }

}


module.exports = helpers