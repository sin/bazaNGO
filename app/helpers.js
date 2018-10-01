import upperFirst from 'lodash/upperFirst'

const normalizeText = text =>
  text.split('. ').map(sentence => upperFirst(sentence.toLowerCase())).join('. ')

export {
  normalizeText
}
