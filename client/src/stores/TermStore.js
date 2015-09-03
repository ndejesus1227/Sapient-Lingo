
import Immutable from 'immutable';
import {createStore} from 'redux';
import Term from './Term';

//Set up store.
var State = Immutable.Map();

function TermStore( state = State, action ) {


            console.log( action );
    switch ( action.type ) {

        case 'term/load-complete':

            return loadTerms( state, action.rawTerms );

        case 'term/create-complete':

            return createTerm( state, action.name, action.definition, action.related );

        case 'term/remove-complete':

            return state.removeIn([action.id]);

        case 'term/update-name':

            return state.setIn([action.id, 'name'], action.name.trim());

        case 'term/update-definition-complete':
        
            return state.setIn([action.id, 'definition'], action.definition.trim());

        case 'term/add-related':
            return state.setIn([action.id, 'related'], state.getIn( [action.id, 'related'] ).push( action.related ));

        case 'term/remove-related':

            return removeRelated( state, action.id, action.related );

        default:

            return state;

    }

}

function loadTerms( state, rawTerms ) {

    for( let i = 0, len = rawTerms.length; i < len; ++i ) {

        state = createTerm( state, rawTerms[ i ].name, rawTerms[ i ].definition, rawTerms[ i ].related );

    }
    return state;
}

function createTerm( state, name, definition, related ){

    if( !name || !definition ) {
        return state;
    }

    var newTerm = new Term( name, definition, related );

    return state.set( newTerm.id, newTerm );
};

function removeRelated( state, id, relatedTerm ) {

    var relatedTerms = state.getIn([action.id, 'related']),
        relatedRemoveIndex = relatedTerms.indexOf( relatedTerm );

    if( relatedRemoveIndex > -1 ) {

        relatedTerms.splice( relatedRemoveIndex, 1 );

        return state.setIn( [action.id, 'related'], relatedTerms );
    }
    return state;

}

export default createStore(TermStore);