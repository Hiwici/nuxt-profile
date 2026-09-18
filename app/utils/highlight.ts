import _escaped from 'lodash/escape'

/**
 * The Function to highlight code
 */
const highlightedCode = (code: string, type: HighlightCodeType) => {
  switch (type) {
    case 'vue':
      return highlightVue(code)
    case 'javascript':
      return highlightJavascript(code)
    case 'markdown':
      return highlightMarkdown(code)
    case 'env':
      return highlightEnv(code)
    case 'json':
      return highlightJson(code)
    default:
      return code
  }
}

/**
 * The function to highlight Vue code
 */
const highlightVue = (code: string) => {
  // First escape HTML characters to prevent conflicts
  let escapedCode = _escaped(code)
  let componentKeywords = [
    'NuxtLayout',
    'NuxtPage',
    'RadiantText',
    'IconCloud',
    'AnimatedBeam',
  ].join('|')

  // Highlight span tags first to prevent conflicts
  escapedCode = escapedCode.replace(
    /\bspan\b/g,
    '<span class="text-red-900 dark:text-sky-600">span</span>',
  )

  // Replace the vue class tag
  escapedCode = escapedCode.replace(
    /(\s*?)\b(class|src|alt|click|ref)\b=(&quot;)(.*?)&quot;/g,
    (_match, spaces, tag: string, g1: string, g2: string) => {
      if (tag == 'click') {
        g2 = g2
          .replace(/(?!A-Za-z)(\()(.*?)(\))/g, (match, p1, p2, p3) => {
            return `<span class="text-blue-700 dark:text-yellow-300">${p1}</span><span class="text-blue-900 dark:text-sky-300">${p2}</span><span class="text-blue-700 dark:text-yellow-300">${p3}</span>`
          })
          .replace(/=&gt;(\s?)(.*)/g, (match, spaces, pp1: string) => {
            pp1 = pp1.replace(/(.*)=(.*)/g, (match2, ppp1, ppp2) => {
              return `<span class="text-blue-900 dark:text-sky-300">${ppp1}</span>=<span class="text-blue-900 dark:text-sky-300">${ppp2}</span>`
            })

            return `<span class="text-blue-700 dark:text-sky-600">=>${spaces}</span>${pp1}`
          })

        return `${spaces}<span class="text-red-500 dark:text-sky-300">${tag}</span>=${g1}${g2}${g1}`
      }

      return `${spaces}<span class="text-red-500 dark:text-sky-300">${tag}</span>=<span class="text-blue-700 dark:text-amber-600">${g1}${g2}${g1}</span>`
    },
  )

  // Replace the vue system tag
  escapedCode = escapedCode.replace(
    /(\s*?)\b(v-if)\b=(&quot;)(.*?)&quot;/g,
    (_match, spaces, tag: string, g1: string, g2: string) => {
      return `${spaces}<span class="text-purple-500 dark:text-purple-400">${tag}</span>=<span class="text-blue-700 dark:text-sky-300">${g1}${g2}${g1}</span>`
    },
  )

  // Replace the vue variable tag
  escapedCode = escapedCode.replace(/{{ (.*?) }}/g, (match, p1) => {
    return `<span class="text-blue-700 dark:text-yellow-300">{{</span> <span class="text-blue-900 dark:text-sky-300">${p1}</span> <span class="text-blue-700 dark:text-yellow-300">}}</span>`
  })

  // Replace the vue props key
  escapedCode = escapedCode.replace(
    /(\s*?)\b(icons|ref-container|ref-from|ref-to)\b=(&quot;)(.*?)&quot;/g,
    (_match, spaces, tag, g1, g2) => {
      return `${spaces}<span class="text-red-500 dark:text-sky-300">${tag}</span>=<span class="text-blue-900 dark:text-sky-300">${g1}${g2}${g1}</span>`
    },
  )

  // Replace the opening and closing tags
  escapedCode = escapedCode.replace(/(\s*?)&lt;(\/?)/g, (match, spaces, slash) => {
    return `${spaces}<span class="text-red-900 dark:text-gray-500">&lt;${slash}</span>`
  })
  escapedCode = escapedCode.replace(/(\s*?)(\/?)&gt;/g, (match, spaces, slash) => {
    return `${spaces}<span class="text-red-900 dark:text-gray-500">${slash}&gt;</span>`
  })

  // Then apply highlighting
  escapedCode = escapedCode
    .replace(
      /\b(template|div|img|h1|h2|h3|h4|h5|h6)\b/g,
      (match) => `<span class="text-red-900 dark:text-sky-600">${match}</span>`,
    )
    .replace(
      new RegExp(`\\b(${componentKeywords})\\b`, 'g'),
      '<span class="text-cyan-700 dark:text-cyan-500">$1</span>',
    )

  return escapedCode
}

/**
 * The function to highlight Javascript code
 */
const highlightJavascript = (code: string) => {
  // First escape HTML characters to prevent conflicts
  let escapedCode = _escaped(code)

  // Highlight javascript tags
  escapedCode = escapedCode.replace(
    /\b(if|else|for|while|function|return|import|from|as|default|class|extends|super|this|new|try|catch|finally|throw|async|await|Promise)\b/g,
    (match) => {
      return `<span class="text-blue-700 dark:text-purple-400">${match}</span>`
    },
  )

  // Highlight variable declarations
  escapedCode = escapedCode.replace(
    /\b(const|let|var)\b (.*) = (.*)/g,
    (match, keywordTag, g1: string, g2: string) => {
      if (!g1.includes('{')) {
        g1 = `<span class="text-blue-900 dark:text-sky-400">${g1}</span>`
      }

      g2 = g2.replace(/\b(ref)\b\((.*)\)/g, (match, vueTag, g1) => {
        return `<span class="text-yellow-800 dark:text-yellow-200">${vueTag}</span><span class="text-blue-700 dark:text-yellow-300">(</span><span class="text-blue-700 dark:text-sky-600">${g1}</span><span class="text-blue-700 dark:text-yellow-300">)</span>`
      })

      return `<span class="text-blue-700 dark:text-sky-600">${keywordTag}</span> ${g1} = ${g2}`
    },
  )

  // Highlight Vue.js template syntax
  escapedCode = escapedCode.replace(/{ (.*) }/g, (match, g1) => {
    return `<span class="text-blue-700 dark:text-yellow-300">{</span> <span class="text-blue-900 dark:text-sky-300">${g1}</span> <span class="text-blue-700 dark:text-yellow-300">}</span>`
  })

  // Highlight array brackets
  escapedCode = escapedCode.replace(/\[/g, (match) => {
    return `<span class="text-blue-700 dark:text-yellow-300">[</span>`
  })
  escapedCode = escapedCode.replace(/\]/g, (match) => {
    return `<span class="text-blue-700 dark:text-yellow-300">]</span>`
  })

  // Replace the opening and closing tags
  escapedCode = escapedCode.replace(/(\s*?)&lt;(\/?)/g, (match, spaces, slash) => {
    return `${spaces}<span class="text-red-900 dark:text-gray-500">&lt;${slash}</span>`
  })
  escapedCode = escapedCode.replace(/(\s*?)(\/?)&gt;/g, (match, spaces, slash) => {
    return `${spaces}<span class="text-red-900 dark:text-gray-500">${slash}&gt;</span>`
  })

  // Highlight keywords
  escapedCode = escapedCode
    .replace(
      /\b(script)\b/g,
      (match) => `<span class="text-red-900 dark:text-sky-600">${match}</span>`,
    )
    .replace(
      /\b(setup)\b/g,
      (match) => `<span class="text-red-500 dark:text-sky-300">${match}</span>`,
    )
    .replace(/(\s*?)(&#39;)(.*?)&#39;/g, (match, p1, p2, p3) => {
      return `${p1}<span class="text-red-900 dark:text-amber-600">${p2}${p3}${p2}</span>`
    })

  return escapedCode
}

/**
 * The function to highlight Markdown code
 */
const highlightMarkdown = (code: string) => {
  let result = code

  if (result.includes('#')) {
    result = '<span class="text-green-700 dark:text-blue-400 font-bold">' + result + '</span>'
  }

  return result
}

/**
 * The function to highlight Env code
 */
const highlightEnv = (code: string) => {
  let result = code

  if (result.includes('#')) {
    result = '<span class="text-green-700">' + result + '</span>'
  } else if (result.includes('=')) {
    let splitString = result.split('=')
    result = '<span class="text-sky-600">' + splitString[0] + '</span>=' + splitString[1]
  }

  return result
}

/**
 * The function to highlight JSON code
 */
const highlightJson = (code: string) => {
  let result = code

  if (result.includes(': ')) {
    let splitString = result.split(': ')
    result =
      '<span class="text-sky-800 dark:text-sky-300">' +
      splitString[0] +
      '</span>: ' +
      highlightJson(splitString[1] as string)
  } else {
    if (result.includes('{') || result.includes('}')) {
      result = '<span class="text-sky-800 dark:text-yellow-300">' + result + '</span>'
    } else if (typeof result === 'boolean') {
      result = '<span class="text-blue-500">' + result + '</span>'
    } else {
      result = result.replace(/([A-Za-z0-9@\.\\:\/"])(,?)/g, (match, g1, g2) => {
        if (g2) {
          g2 = `<span class="text-text-gray-700 dark:text-yellow-300">${g2}</span>`
        }

        return `<span class="text-red-900 dark:text-amber-600">${g1}</span>${g2}`
      })
    }
  }

  return result
}

export { highlightedCode }
