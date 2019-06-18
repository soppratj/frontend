export function handleClickFunction(i){
    return {
        type: 'handleClick',
        squareIndex: i,
    }    
}

export function jumpToFunction(step) {
    return {
        type: 'jumpTo',
        stepNumber : step,
    }
}

export function toggleClickFunction() {
    return {
        type: 'toggleClick',
    }
}