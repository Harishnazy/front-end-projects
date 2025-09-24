js = "JavaScript"

js.length         // 10
js[0]             // "J"
js.charAt(1)      // "J"
js.charCodeAt(2)  // 118
js.indexOf("S")   // 4
js.tolowerCase()  // "javascript"
js.toUpperCase()  // "JAVASCRIPT"
js.slice(0, 4)   // "Java"
js.substring(4) // "Script"
js.concat(" is fun") // "JavaScript is fun"
js.trim()         // "JavaScript"
js.split("a")     // ["J", "v", "Script"]
js.replace("S", "s") // "Javascript"
js.includes("Script") // true
js.startsWith("Java") // true
js.endsWith("Script") // true
js.repeat(2)      // "JavaScriptJavaScript"
js.padStart(15, "*") // "*****JavaScript"
js.padEnd(15, "*")   // "JavaScript*****"
js.match(/a/g)    // ["a", "a"]
js.search("S")    // 4
js.localeCompare("Java") // 1
js.valueOf()     // "JavaScript"
js.toString()    // "JavaScript"
js.normalize()   // "JavaScript"
js.anchor("top") // '<a name="top">JavaScript</a>'
js.big()         // "<big>JavaScript</big>"
js.blink()      // '<blink>JavaScript</blink>'
js.bold()        // "<b>JavaScript</b>"
js.fixed()       // "<tt>JavaScript</tt>"
js.fontcolor("red") // '<font color="red">JavaScript</font>'
js.fontsize(20)  // '<font size="20">JavaScript</font>'
js.italics()     // "<i>JavaScript</i>"
js.link("https://www.javascript.com") // '<a href="https://www.javascript.com">JavaScript</a>'
js.small()       // "<small>JavaScript</small>"
js.strike()      // "<strike>JavaScript</strike>"
js.sub()         // "<sub>JavaScript</sub>"
js.sup()         // "<sup>JavaScript</sup>"
js.toLocaleLowerCase() // "javascript"
js.toLocaleUpperCase() // "JAVASCRIPT"
js.localeCompare("JavaScript") // 0
js.match(/script/i) // ["Script"]
js.matchAll(/a/g)  // Iterator with "a", "a"
js.normalize("NFC") // "JavaScript"
js.normalize("NFD") // "JavaScript"
js.normalize("NFKC") // "JavaScript"
js.normalize("NFKD") // "JavaScript"
js.repeat(3)      // "JavaScriptJavaScriptJavaScript"
js.padStart(20, "-") // "----------JavaScript"
js.padEnd(20, "-")   // "JavaScript----------"
js.split("")      // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]
js.split("S")    // ["Java", "cript"]
js.replace(/a/g, "A") // "JAvAScript"
js.replace("S", "s") // "Javascript"
js.replaceAll("a", "A") // "JAvAScript"
js.includes("script") // false
js.startsWith("java") // false
js.endsWith("script") // false
js.search(/S/)    // 4
js.search(/s/i)   // 4
js.charAt(10)     // ""
js.charCodeAt(10) // NaN
js.indexOf("x")   // -1
js.lastIndexOf("a") // 3
js.lastIndexOf("x") // -1
js.lastIndexOf("a", 2) // 1
js.substring(4, 10) // "Script"