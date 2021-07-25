// copied from https://github.com/jsepia/markdown-it-wikilinks/blob/master/index.js

const Plugin = require('markdown-it-regexp')
const extend = require('extend')
const sanitize = require('sanitize-filename')

module.exports = (options) => {

  const defaults = {
    baseURL: '/',
    relativeBaseURL: './',
    makeAllLinksAbsolute: false,
    uriSuffix: '.html',
    htmlAttributes: {
    },
    generatePageNameFromLabel: (label) => {
      return label
    },
    postProcessPageName: (pageName) => {
      pageName = pageName.trim()
      pageName = pageName.split('/').map(sanitize).join('/')
      pageName = pageName.replace(/\s+/, '_')
      return pageName
    },
    postProcessLabel: (label) => {
      label = label.trim()
      return label
    }
  }

  options = extend(true, defaults, options)

  function isAbsolute(pageName) {
    return options.makeAllLinksAbsolute || pageName.charCodeAt(0) === 0x2F/* / */
  }

  function removeInitialSlashes(str) {
    return str.replace(/^\/+/g, '')
  }

  return Plugin(
    /\[\[(.*)\]\]/,
    (match, utils) => {
      let label = ''
      let pageName = ''
      let href = ''
      let htmlAttrs = []
      let htmlAttrsString = ''
      
      const wikilink = match[1].split('|')
      if (wikilink.length > 1) {
        label = wikilink[1]
        pageName = wikilink[0]
      } else {
        label = wikilink[0]
        pageName = options.generatePageNameFromLabel(wikilink[0])
      }

      label = options.postProcessLabel(label)
      pageName = options.postProcessPageName(pageName)

      // make sure none of the values are empty
      if (!label || !pageName) {
        return match.input
      }

      if (isAbsolute(pageName)) {
        pageName = removeInitialSlashes(pageName)
        href = options.baseURL + pageName + options.uriSuffix
      }
      else {
        href = options.relativeBaseURL + pageName + options.uriSuffix
      }
      href = utils.escape(href)

      htmlAttrs.push(`href="${href}"`)
      for (let attrName in options.htmlAttributes) {
        const attrValue = options.htmlAttributes[attrName]
        htmlAttrs.push(`${attrName}="${attrValue}"`)
      }
      htmlAttrsString = htmlAttrs.join(' ')
      
      return `<a ${htmlAttrsString}>${label}</a>`
    }
  )
}
