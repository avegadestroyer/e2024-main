import  { Dimensions } from 'react-native'
const { width, height} = Dimensions.get('window')

export const COLORS = {
    // base colors 
    primary : '#9D2449',
    secondary : '#245C4E',
    third : '#B79763',
    // colors 
    black : '#000',
    white : '#fff',
    yellow : '#C0911C',

    gray : '#666',
    darkGray : '#3c3c3b',
    lightgray :"#d3d3d3",
    green : '#009966',
    red : '#eb0c46',
    blue : '#BA5C74',
    trasparent : 'transparent',
    backColor : '#F7F7F7'
}

export const SIZES = {
    base : 8,
    font : 14,
    radius : 30,
    padding : 10,
    padding2: 12,

    // large titles
    largeTitle : 50,
    h1 : 25,
    h2 : 18,
    h3 : 16,
    h4 : 14,
    h5 : 13,
    h6 : 11,

    body : 30,
    subtitle : 13,
    // app dimensions
    width,
    height
}

const appTheme = { COLORS, SIZES}

export default appTheme;