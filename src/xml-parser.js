const FastSax = require("fast-sax");

const XML_SCHEME_TAG_NAME = new RegExp("\\?\\s*xml");

class XmlParser {
    static parse(text) {
        const parser = new FastSax();

        let rootElements = [];
        let current = null;
        parser.onElementStart = (name, getAttrs) => {
            if (name.match(XML_SCHEME_TAG_NAME)) {
                return;
            }

            current = new XmlElement(name, current, getAttrs());
            if (current.parent == null)
            {
                rootElements.push(current);
            }
        };
        parser.onText = getText => {
            if (current != null) {
                current.text = getText();
            }
        }
        parser.onComment = getText => {
            if (current != null) {
                current.addComment(getText());
            }
        }
        parser.onCData = getText => {
            if (current != null) {
                current.addCData(getText());
            }
        }
        parser.onElementEnd = () => {
            if (current != null) {
                current = current.parent;
            }
        }

        parser.parse(text);

        return rootElements;
    }
}

class XmlElement {
    constructor(name, parent, attrs) {
        this.name = name;
        this.parent = parent;
        this.attributes = attrs;
        this.text = "";
        this.comments = [];
        this.cData = [];
        this.children = [];

        if (parent != null) {
            parent.children.push(this);
        }
    }

    addComment(text) {
        this.comments.push(text);
    }

    addCData(data) {
        this.cData.push(data);
    }

    findElement(name) {
        return this.children.find(e => e.name == name);
    }

    findAllElements(name) {
        return this.children.filter(e => e.name == name);
    }

    getInt() {
        return parseInt(this.text);
    }
}

module.exports = {
    XmlParser: XmlParser,

    XmlElement: XmlElement
}