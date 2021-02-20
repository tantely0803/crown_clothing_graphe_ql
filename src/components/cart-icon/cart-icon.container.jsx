import React from 'react';
import {  graphql } from 'react-apollo';

import * as compose from 'lodash.flowright';

import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOOGLE_CART_HIDDEN = gql `
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const GET_ITEM_COUNT = gql `
{
    itemCount @client
}
`;

const CartIconContainer = ({data : {itemCount}, toggleCartHidden }) => {
  return(<CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} > </CartIcon>)
};

export default compose( 
    graphql(GET_ITEM_COUNT),
    graphql(TOOGLE_CART_HIDDEN, {name : 'toggleCartHidden' }) 
) (CartIconContainer);