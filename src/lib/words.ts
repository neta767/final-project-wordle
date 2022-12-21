import {default as GraphemeSplitter} from 'grapheme-splitter'

export const isWinningWord = (word: string) => {
    return solution === word
}

export const unicodeSplit = (word: string) => {
    return new GraphemeSplitter().splitGraphemes(word)
}

export const localeAwareUpperCase = (text: string) => {
    return process.env.REACT_APP_LOCALE_STRING
        ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
        : text.toUpperCase()
}

export const solution = localeAwareUpperCase('which')
